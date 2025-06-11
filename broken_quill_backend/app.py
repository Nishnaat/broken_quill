 
from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from utils import load_post_list, load_post_content

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "https://broken-quillfrontend.vercel.app",
            "https://nakedmetaphor.com",
            "https://www.nakedmetaphor.com"
        ]
    }
})


@app.route('/api/posts', methods=['GET'])
def get_posts():
	return jsonify(load_post_list())

@app.route('/api/posts/<slug>', methods=['GET'])
def get_post(slug):
	content = load_post_content(slug)
	if content:
		return jsonify(content)
	else:
		return jsonify({'error': 'Post not found'}), 404

@app.route('/api/contact', methods=['POST'])
def contact():
	data = request.json
	print("Received contact form:", data)
	return jsonify({'message': 'Form submitted successfully'}), 200

if __name__ == '__main__':
	app.run(debug=True)
