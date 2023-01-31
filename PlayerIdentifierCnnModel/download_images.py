from simple_image_download import simple_image_download as simp
from tqdm import trange
response = simp.simple_image_download

keywords = ['lebron james', 'steph curry']

for kw in keywords:
    response().download(kw, 30)

