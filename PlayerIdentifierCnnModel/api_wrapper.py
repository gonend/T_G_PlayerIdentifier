from flask import Flask,request
from YoloDetection import predict_player

app=Flask(__name__)

@app.route("/predictPlayer",methods=["POST"])
def predictPlayer():
    imgPath=request.get_json()["imgUrl"]
    imgPath="../expressBackend/uploads/"+imgPath
    preds=predict_player("best(2).pt",imgPath)

    return preds

if __name__=="__main__":
    app.run()