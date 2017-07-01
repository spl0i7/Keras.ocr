from __future__ import division
from keras.models import load_model
import numpy as np


def predict(imagepre):
    n_classes = 10
    model = load_model('./mnist_cnn.h5')
    image = np.array([imagepre])
    prediction = model.predict(image).reshape(n_classes)
    return np.argmax(prediction)
