from flask import Flask,request
from YoloDetection import predict_player
from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'my_secret_key'
jwt = JWTManager(app)


@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    # Authenticate user
    if username == 'admin' and password == 'admin':
        # Create a JWT token
        access_token = create_access_token(identity=username)
        # Send the token back to the client
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route("/predictPlayer",methods=["POST"])
def predictPlayer():
    imgPath=request.get_json()["imgUrl"]
    imgPath="../expressBackend/uploads/"+imgPath
    preds=predict_player("best(4).pt",imgPath)

    return preds

if __name__=="__main__":
    app.run()