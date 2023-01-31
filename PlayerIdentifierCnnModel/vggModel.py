# import numpy as np
# # from keras.preprocessing import image
# from keras_vggface.vggface import VGGFace
# from keras_vggface import utils
# import keras.utils as image
#
# base_model = VGGFace(include_top=False,
# model='vgg16',
# input_shape=(224, 224, 3))
# base_model.summary()
# print(len(base_model.layers))
#
# # 19 layers after excluding the last few layers
# #
# # # load the image
# # img = image.load_img(
# #     'steven tyler.png',
# #     target_size=(224, 224))
# #
# # # prepare the image
# # x = image.img_to_array(img)
# # x = np.expand_dims(x, axis=0)
# # x = utils.preprocess_input(x, version=1)
# #
# # # perform prediction
# # preds = model.predict(x)
# # print('Predicted:', utils.decode_predictions(preds))
#
#
# x = base_model.output
# x = GlobalAveragePooling2D()(x)
#
# x = Dense(1024, activation='relu')(x)
# x = Dense(1024, activation='relu')(x)
# x = Dense(512, activation='relu')(x)
#
# # final layer with softmax activation
# preds = Dense(NO_CLASSES, activation='softmax')(x)
