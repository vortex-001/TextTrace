import io
import zipfile
import xml.etree.ElementTree as ET


def extract_text_from_file(file_storage):
    """
    Extracts plain text from uploaded file stream (.txt, .docx, .pdf).
    """
    filename = file_storage.filename.lower() if hasattr(file_storage, "filename") else ""
    content_bytes = file_storage.read()

    # Reset stream pointer
    if hasattr(file_storage, "seek"):
        file_storage.seek(0)

    # 1. Plain text file
    if filename.endswith(".txt") or not filename:
        try:
            return content_bytes.decode("utf-8")
        except UnicodeDecodeError:
            return content_bytes.decode("latin-1", errors="replace")

    # 2. Word document (.docx) using built-in standard library
    if filename.endswith(".docx"):
        try:
            bio = io.BytesIO(content_bytes)
            with zipfile.ZipFile(bio) as z:
                xml_content = z.read("word/document.xml")
                tree = ET.fromstring(xml_content)
                paragraphs = []
                for p in tree.iter("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p"):
                    texts = [
                        node.text
                        for node in p.iter("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t")
                        if node.text
                    ]
                    if texts:
                        paragraphs.append("".join(texts))
                return "\n".join(paragraphs)
        except Exception as e:
            raise ValueError(f"Failed to read Word document: {str(e)}")

    # 3. PDF document (.pdf) using pypdf
    if filename.endswith(".pdf"):
        try:
            from pypdf import PdfReader

            bio = io.BytesIO(content_bytes)
            reader = PdfReader(bio)
            pages_text = []
            for page in reader.pages:
                text = page.extract_text()
                if text:
                    pages_text.append(text)
            return "\n\n".join(pages_text)
        except Exception as e:
            raise ValueError(f"Failed to read PDF document: {str(e)}")

    raise ValueError("Unsupported format. Please upload a .txt, .docx, or .pdf file.")
