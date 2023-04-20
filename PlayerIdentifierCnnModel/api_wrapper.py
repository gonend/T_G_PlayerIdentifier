import os

from PIL import Image
from io import BytesIO
from flask import Flask,request
from YoloDetection import predict_player
from flask import Flask, jsonify, request
# from flask_jwt_extended import JWTManager, create_access_token, jwt_required,get_jwt_identity

from dotenv import load_dotenv
load_dotenv()

import firebase_admin
from firebase_admin import credentials
from firebase_admin import auth


app = Flask(__name__)
# app.config['JWT_SECRET_KEY'] = 'your_secret_key'
# jwt = JWTManager(app)
cred = credentials.Certificate(os.getenv('ADMIN_CRED_JSON'))
firebase_admin.initialize_app(cred)


@app.route("/predictPlayer",methods=["POST"])
def predictPlayer():
    # print('////////////////////////')
    # authorized_uids = [user.uid for user in auth.list_users().iterate_all()]
    # print("ids: ",authorized_uids)
    #
    # print('////////////////////////')
    id_token = request.headers.get('Authorization').split(' ')[1]
    try:
        decoded_token = auth.verify_id_token(id_token)
        # print("\ndecoded token: ",decoded_token)
        uid = decoded_token['uid']
        # print("\nuid: ",uid)
        if auth.get_user(uid):
            # Activate function based on string
            print("running  model pred")
            imgBuff = request.data
            image = Image.open(BytesIO(imgBuff))
            print(os.getenv('MODEL_PATH'))
            preds = predict_player(os.getenv('MODEL_PATH'), image)
            # imgPath = os.getenv('UPLOAD_DIR') + imgPath
            # preds = predict_player(os.getenv('MODEL_PATH'), imgPath)
            return preds,200
        else:
            return 'Unauthorized', 401

    except auth.InvalidIdTokenError:
        return 'Invalid token', 401


if __name__ == "__main__":
    app.run()
