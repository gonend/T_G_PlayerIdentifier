from flask import Flask
from YoloDetection import predict_player

app = Flask(__name__)

@app.route("/predictPlayer/<image_path>")
def predictPlayer(image_path):
    # return image_path
    # print(image_path)
    preds = predict_player('best(2).pt', image_path)
    print(preds)
    return preds


if __name__ == '__main__':
    app.run(debug=True)

