from simple_image_download import simple_image_download as simp
from tqdm import trange
response = simp.simple_image_download

keywords = ['LeBron James headshot','Stephen Curry headshot','Michael Jordan headshot','Luka Doncic headshot', 'Deni Avdija headshot', 'Kevin Durant headshot', 'Jason Tatum headshot', 'Joel Embiid headshot', 'Ja Morant headshot', 'LaMelo Ball headshot']

for kw in keywords:
    response().download(kw, 5)

