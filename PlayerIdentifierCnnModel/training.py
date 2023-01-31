from keras import Input
from keras_vggface import VGGFace

from tensorflow.keras.layers import Dense, GlobalAveragePooling2D

from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.mobilenet import preprocess_input

from tensorflow.keras.preprocessing.image import ImageDataGenerator

from tensorflow.keras.models import Model

from tensorflow.keras.optimizers import Adam

train_datagen = ImageDataGenerator(
    preprocessing_function=preprocess_input)

train_generator = \
    train_datagen.flow_from_directory(
'simple_images',
target_size=(224,224),
color_mode='rgb',
batch_size=32,
class_mode='categorical',
shuffle=True)

train_generator.class_indices.values()
# dict_values([0, 1, 2])
NO_CLASSES = len(train_generator.class_indices.values())

# base_model = VGGFace(include_top=False,
#                      model='vgg16',
#                      input_shape=(224, 224, 3))
# base_model.summary()
# print(len(base_model.layers))


base_model = VGGFace(weights='vggface', model='vgg16',include_top=False, input_shape=(224,224,3))

base_model.summary()
print(len(base_model.layers))



# freeze the weights of the base model
base_model.trainable = False

# define the input layer
inputs = Input(shape=(224,224,3))

# pass the input through the base model
x = base_model(inputs)

# add a global average pooling layer
x = GlobalAveragePooling2D()(x)

# add a dense layer with 1024 neurons and relu activation
x = Dense(1024, activation='relu')(x)
x = Dense(1024, activation='relu')(x)
x = Dense(512, activation='relu')(x)

# add a final dense layer with 10 neurons and softmax activation
predictions = Dense(NO_CLASSES, activation='softmax')(x)

# instantiate the final model
model = Model(inputs=inputs, outputs=predictions)

# model.summary()
# print(len(model.layers))



# don't train the first 19 layers - 0..18
for layer in model.layers[:2]:
    layer.trainable = False

# train the rest of the layers - 19 onwards
for layer in model.layers[2:]:
    layer.trainable = True

model.compile(optimizer='Adam',
    loss='categorical_crossentropy',
    metrics=['accuracy'])

model.fit(train_generator,
  batch_size = 1,
  verbose = 1,
  epochs = 20)

# creates a HDF5 file
model.save(
    'transfer_learning_trained' +
    '_face_cnn_model.h5')



from keras.models import load_model

# deletes the existing model
del model

# returns a compiled model identical to the previous one
model = load_model(
    'transfer_learning_trained' +
    '_face_cnn_model.h5')


import pickle

class_dictionary = train_generator.class_indices
class_dictionary = {
    value:key for key, value in class_dictionary.items()
}
print(class_dictionary)


# save the class dictionary to pickle
face_label_filename = 'face-labels.pickle'
with open(face_label_filename, 'wb') as f: pickle.dump(class_dictionary, f)