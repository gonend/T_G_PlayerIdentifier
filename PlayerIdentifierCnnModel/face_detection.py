import cv2

# for face detection
face_cascade = cv2.CascadeClassifier('venv/Lib/site-packages/cv2/data/haarcascade_frontalface_default.xml')


# resolution of the webcam
screen_width = 1280
creen_height = 720

stream = cv2.VideoCapture(0, cv2.CAP_DSHOW)

while(True):
    (grabbed, frame) = stream.read()
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    faces = face_cascade.detectMultiScale(rgb, scaleFactor=1.3)

    for (x, y, w, h) in faces:
        # Draw a rectangle around the face
        color = (0, 255, 255) # in BGR
        stroke = 5
        cv2.rectangle(frame, (x, y), (x + w, y + h), color, stroke)

    # show the frame
    cv2.imshow("Image", frame)
    key = cv2.waitKey(1) & 0xFF
    if key == ord("q"):    # Press q to break out
        break                  # of the loop

# cleanup
stream.release()
cv2.waitKey(1)
cv2.destroyAllWindows()
cv2.waitKey(1)



