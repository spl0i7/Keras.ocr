from flask import Flask, current_app, url_for, request, jsonify
import numpy as np
from PIL import Image
import base64, io, preprocess, cnn_prediction

app = Flask(__name__)


@app.route('/')
def index():
    url_for('static', filename='style.css')
    url_for('static', filename='app.js')
    return current_app.send_static_file('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    if request.method == "POST":
        result = request.get_json()
        imageb64 = result.get('image')
        imagebytes = base64.b64decode(imageb64[imageb64.index(',') + 1:])
        imagepil = Image.open(io.BytesIO(imagebytes))
        image = np.array(imagepil)
        imagepre = preprocess.preprocess(image)
        result = cnn_prediction.predict(imagepre)
        return jsonify(
            result=str(result),
            success=True
        )
    return jsonify(success=False)


if __name__ == '__main__':
    app.run()
