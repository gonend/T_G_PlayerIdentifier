from YoloDetection import predict_player
from flask import Flask, request
import os

app = Flask(__name__)

@app.route("/predictPlayer", methods=['POST'])
def predictPlayer():
    # return image_path
    print(request)
    image_path = request.get_json()['imgUrl']
    print(type(image_path))
    image_path = '../../uploads/'+image_path
    print(image_path)
    preds = predict_player('best(2).pt', image_path)
    print(preds)
    return preds


if __name__ == '__main__':
    app.run(debug=True)

