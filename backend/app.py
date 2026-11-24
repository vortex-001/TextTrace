"""
TextTrace - Backend Web Controller & REST API
Pure Flask routing and API layer. Algorithmic core is in texttrace/.
"""

import os
import sys
from flask import Flask, jsonify, render_template, request, send_from_directory

# Ensure backend directory and root are in sys.path
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(CURRENT_DIR)

if CURRENT_DIR not in sys.path:
    sys.path.insert(0, CURRENT_DIR)
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from texttrace.similarity import compare_documents
from texttrace.validate import validate_input
from texttrace.extractor import extract_text_from_file

# Initialize Flask with explicit paths to the frontend directory
app = Flask(
    __name__,
    template_folder=os.path.join(ROOT_DIR, "frontend", "templates"),
    static_folder=os.path.join(ROOT_DIR, "frontend", "static"),
)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/favicon.ico")
def favicon():
    return send_from_directory(app.static_folder, "favicon.svg", mimetype="image/svg+xml")


@app.route("/api/extract", methods=["POST"])
def api_extract():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded."}), 400

    uploaded_file = request.files["file"]
    if not uploaded_file or not uploaded_file.filename:
        return jsonify({"error": "No file selected."}), 400

    try:
        text = extract_text_from_file(uploaded_file)
        if not text or not text.strip():
            return (
                jsonify(
                    {"error": f"The document '{uploaded_file.filename}' contains no readable plain text."}
                ),
                400,
            )
        return jsonify({"text": text, "filename": uploaded_file.filename}), 200
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": f"Failed to extract document text: {str(e)}"}), 500


@app.route("/api/compare", methods=["POST"])
def api_compare():
    try:
        data = request.get_json(silent=True)
        if not data or not isinstance(data, dict):
            return jsonify({"error": "Invalid JSON body."}), 400

        text_a = data.get("text_a", "")
        text_b = data.get("text_b", "")
        k = data.get("k", 5)

        # Ensure k is an integer
        if not isinstance(k, int) or isinstance(k, bool):
            return jsonify({"error": "Phrase length k must be an integer between 2 and 10."}), 400

        err = validate_input(text_a, text_b, k)
        if err:
            return jsonify({"error": err}), 400

        result = compare_documents(text_a, text_b, k)
        return jsonify(result), 200

    except Exception:
        return jsonify({"error": "An unexpected error occurred during document comparison."}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    # host="0.0.0.0" allows mobile devices on local Wi-Fi and cloud platforms to connect
    app.run(host="0.0.0.0", port=port, debug=True)
