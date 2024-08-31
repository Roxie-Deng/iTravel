import os
from bing_image_downloader import downloader
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Download image and return image URL
def fetch_image_urls(query, limit=1, output_dir='dataset'):
    output_dir = os.path.join(os.getcwd(), output_dir, query.replace(" ", "_"))

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    downloader.download(query, limit=limit, output_dir=output_dir, adult_filter_off=True, force_replace=False, timeout=60, verbose=True)
    image_urls = []
    for root, dirs, files in os.walk(output_dir):
        for file in files:
            if file.endswith(".jpg") or file.endswith(".png"):
                image_urls.append(os.path.join(root, file))
    return image_urls

@app.route('/get_image', methods=['POST', 'OPTIONS'])
@cross_origin(origins='http://localhost:3000')
def get_image():
    print(f"Received request: {request.method} {request.url}")
    print(f"Headers: {request.headers}")

    if request.method == "OPTIONS":
        return {"msg": "OK"}, 200

    try:
        query = request.json['query']
        image_urls = fetch_image_urls(query, limit=1)
        if image_urls:
            # Provide relative path
            relative_path = os.path.relpath(image_urls[0], os.path.join(os.getcwd(), 'dataset'))
            return jsonify({"image_url": f"http://127.0.0.1:5000/dataset/{relative_path.replace(os.sep, '/')}"})
        else:
            return jsonify({"error": "No images found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# New route to serve images
@app.route('/dataset/<path:filename>')
def serve_image(filename):
    return send_from_directory(os.path.join(os.getcwd(), 'dataset'), filename)

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

# Simple test route
@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Server is running"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)