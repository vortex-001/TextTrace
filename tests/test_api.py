import json
from app import app


def test_api_compare_success():
    client = app.test_client()
    payload = {
        "text_a": (
            "Data structures help programmers organise information. A hash map stores "
            "key value pairs so that a value can be found quickly. Students often use "
            "it in their projects."
        ),
        "text_b": (
            "Many students prefer this approach. A hash map stores key value pairs "
            "so that a value can be found quickly, which makes searching faster."
        ),
        "k": 5,
    }
    res = client.post("/api/compare", json=payload)
    assert res.status_code == 200
    data = res.get_json()

    assert "scores" in data
    assert "stats" in data
    assert "passages_a" in data
    assert "passages_b" in data
    assert data["scores"]["overall"] == 49.61
    assert data["scores"]["word_overlap"] == 41.18
    assert data["scores"]["coverage_a"] == 53.57
    assert data["scores"]["coverage_b"] == 62.5


def test_api_compare_validation_error():
    client = app.test_client()
    payload = {"text_a": "short", "text_b": "valid document with enough words here", "k": 5}
    res = client.post("/api/compare", json=payload)
    assert res.status_code == 400
    data = res.get_json()
    assert "error" in data


def test_api_invalid_json():
    client = app.test_client()
    res = client.post("/api/compare", data="not json", content_type="application/json")
    assert res.status_code == 400


def test_api_extract_txt():
    client = app.test_client()
    import io
    data = {
        "file": (io.BytesIO(b"Hello world from uploaded text file"), "test.txt")
    }
    res = client.post("/api/extract", data=data, content_type="multipart/form-data")
    assert res.status_code == 200
    assert "Hello world from uploaded text file" in res.get_json()["text"]


def test_api_extract_docx():
    import io
    import zipfile
    client = app.test_client()
    bio = io.BytesIO()
    with zipfile.ZipFile(bio, "w") as z:
        z.writestr("word/document.xml", """<?xml version="1.0" encoding="UTF-8"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p><w:r><w:t>Extracted from Word docx</w:t></w:r></w:p>
  </w:body>
</w:document>""")
    bio.seek(0)
    data = {"file": (bio, "document.docx")}
    res = client.post("/api/extract", data=data, content_type="multipart/form-data")
    assert res.status_code == 200
    assert "Extracted from Word docx" in res.get_json()["text"]


def test_api_extract_missing_file():
    client = app.test_client()
    res = client.post("/api/extract", data={})
    assert res.status_code == 400

