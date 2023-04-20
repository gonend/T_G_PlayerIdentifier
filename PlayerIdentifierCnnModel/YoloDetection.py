from ultralytics import YOLO
from ultralytics.yolo.v8.detect.predict import DetectionPredictor
import ultralytics
ultralytics.checks()

def load_model(model_path):
    model = YOLO(model_path)
    return model, model.names

# def import_roboflow_dataset(api_key):
#     # !mkdir {HOME} / datasets
#     # % cd {HOME} / datasets
#     if os.path
#     from roboflow import Roboflow
#     rf = Roboflow(api_key=api_key)
#     project = rf.workspace("gonen-davidi").project("playeridentifier")
#     dataset = project.version(2).download("yolov8")

def predict_player(model_path,image):
    predictions = {}
    try:
        model, labels = load_model(model_path)
        try:
            results = model.predict(source=image,conf=0.3,save=False) #save=True conf=0.3,zzx`
            for i, result in enumerate(results,start=1):
                name_conf_list = []
                conf = [float(conf) for conf in result.boxes.conf]
                name = [labels[int(cls)] for cls in result.boxes.cls]
                for name_conf in zip(name,conf):
                    name_conf_list.append(name_conf)
                predictions[i] = name_conf_list
        except:
            raise Exception("Could Not Predict Image")
    except:
        raise Exception("Coulde Not Load Model")
    finally:
        print(predictions)
        return predictions


