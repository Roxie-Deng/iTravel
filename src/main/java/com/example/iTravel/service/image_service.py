import os
from bing_image_downloader import downloader
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

# Flask application for fetching and serving images.
# This application provides two main functionalities:
# 1. Endpoint '/get_image' accepts POST requests with a JSON payload containing 'query' parameter.
#    It downloads an image related to the query using bing_image_downloader and returns the URL.
# 2. Endpoint '/dataset/<path:filename>' serves the downloaded images from the 'dataset' directory.

app = Flask(__name__)
CORS(app)

# 下载图片并返回图片URL
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

@app.route('/get_image', methods=['POST'])
def get_image():
    try:
        query = request.json['query']
        image_urls = fetch_image_urls(query, limit=1)
        if image_urls:
            # 提供相对路径
            relative_path = os.path.relpath(image_urls[0], os.path.join(os.getcwd(), 'dataset'))
            return jsonify({"image_url": f"http://localhost:5000/dataset/{relative_path.replace(os.sep, '/')}"})
        else:
            return jsonify({"error": "No images found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 新的路由来提供图片
@app.route('/dataset/<path:filename>')
def serve_image(filename):
    return send_from_directory(os.path.join(os.getcwd(), 'dataset'), filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
