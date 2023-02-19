from simple_image_download import simple_image_download as simp
from tqdm import trange
response = simp.simple_image_download

keywords = ['Luka Doncic', 'Deni Avdija', 'Kevin Durant', 'Jason Tatum', 'Joel Embiid', 'Ja Morant', 'LaMelo Ball']

for kw in keywords:
    response().download(kw, 75)

