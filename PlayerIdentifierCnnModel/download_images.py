from simple_image_download import simple_image_download as simp
response = simp.simple_image_download

keywords = ['Jayson Tatum', 'Joel Embiid', 'Ja Morant', 'LaMelo Ball','Nicola Jokic'] #'LeBron James','Stephen Curry','Luka Doncic', 'Deni Avdija', 'Kevin Durant',

for kw in keywords:
    response().download(kw, 250)

# import os
# import requests
# from bs4 import BeautifulSoup
# from urllib.parse import urlparse
# from tqdm import tqdm
#
# # specify the NBA players to download images for
# players = ["LeBron James", "Stephen Curry", "Kevin Durant", "Kawhi Leonard", "Giannis Antetokounmpo"]
#
# # specify the number of images to download for each player
# num_images_per_player = 100
#
# # iterate over each player and download the specified number of distinct images
# for player in players:
#     # specify the URL of the Google Images search page for the player
#     query = f"{player} basketball"
#     url = f"https://www.google.com/search?q={query}&source=lnms&tbm=isch"
#
#     # send an HTTP GET request to the URL
#     response = requests.get(url)
#
#     # parse the HTML content of the response using BeautifulSoup
#     soup = BeautifulSoup(response.content, "html.parser")
#
#     # find all the image tags in the HTML content
#     img_tags = soup.find_all("img")
#
#     # create a set to store the downloaded image URLs
#     downloaded_urls = set()
#
#     # download the specified number of distinct images for the player
#     for i in tqdm(range(num_images_per_player)):
#         # get the URL of the next image that has not been downloaded yet
#         img_url = None
#         while not img_url or img_url in downloaded_urls:
#             # get the next `img` tag that has a `src` attribute
#             img_tag = next((tag for tag in img_tags if tag.has_attr("src")), None)
#
#             if img_tag:
#                 # get the URL of the image from the `src` attribute of the `img` tag
#                 img_url = img_tag["src"]
#
#                 # remove any size constraints from the image URL
#                 img_url = img_url.split("&")[0]
#
#                 # add the image URL to the set of downloaded URLs
#                 downloaded_urls.add(img_url)
#             else:
#                 # if no more `img` tags with `src` attributes are found, break out of the loop
#                 break
#
#         if img_url:
#             # parse the URL to get the filename and extension of the image
#             parsed_url = urlparse(img_url)
#             filename, extension = os.path.splitext(os.path.basename(parsed_url.path))
#
#             # send an HTTP GET request to the image URL and save the response content to a file
#             response = requests.get(img_url)
#             with open(f"{player}_{i + 1}.{extension}", "wb") as f:
#                 f.write(response.content)
#         else:
#             # if no more distinct images can be found, break out of the loop
#             break
