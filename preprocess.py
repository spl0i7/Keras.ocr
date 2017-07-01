from skimage.transform import resize
from skimage.color import rgb2gray

def preprocess(image):
    i_matrix = rgb2gray(image)
    i_matrix = resize(i_matrix, (28, 28))
    i_matrix = i_matrix.reshape((28, 28, 1)).astype('float32')
    return i_matrix
