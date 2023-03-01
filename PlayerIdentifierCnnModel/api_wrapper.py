import os

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
    # print(jwt)
    print('////////////////////////')
    authorized_uids = [user.uid for user in auth.list_users().iterate_all()]
    print("ids: ",authorized_uids)

    print('////////////////////////')

    id_token = request.headers.get('Authorization').split(' ')[1]
    try:
        decoded_token = auth.verify_id_token(id_token)
        print("\ndecoded token: ",decoded_token)
        uid = decoded_token['uid']
        print("\nuid: ",uid)
        if uid in authorized_uids:
            # Activate function based on string
            print("\n run model pred")
            imgPath = request.get_json()["imgUrl"]
            imgPath = os.getenv('UPLOAD_DIR') + imgPath
            preds = predict_player(os.getenv('MODEL_PATH'), imgPath)
            return preds,200
        else:
            return 'Unauthorized', 401

    except auth.InvalidIdTokenError:
        return 'Invalid token', 401


if __name__ == "__main__":
    app.run()



# @app.route('/login', methods=['POST'])
# def login():
#     username = request.json.get('username', None)
#     password = request.json.get('password', None)
#     # Authenticate user
#     if username == 'admin' and password == 'admin':
#         # Create a JWT token
#         access_token = create_access_token(identity=username)
#         # Send the token back to the client
#
#         return jsonify(access_token=access_token), 200
#     else:
#         return jsonify({'message': 'Invalid credentials'}), 401

# @app.route('/activate', methods=['POST'])
# def activate_function():
#     id_token = request.headers.get('Authorization').split('Bearer ')[1]
#     try:
#         decoded_token = auth.verify_id_token(id_token)
#         uid = decoded_token['uid']
#         string = request.json['string']
#         if uid == 'your-firebase-user-uid':
#             # Activate function based on string
#             return 'Function activated'
#         else:
#             return 'Unauthorized', 401
#     except auth.InvalidIdTokenError:
#         return 'Invalid token', 401