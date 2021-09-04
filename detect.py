from transformers import ViTForImageClassification, ViTFeatureExtractor
from PIL import Image
import numpy as np
import cv2
from sys import exit
from time import time
import requests

URL = 'https://mobot-app-39805-default-rtdb.asia-southeast1.firebasedatabase.app/moods.json'
REQUESTS_ENABLE = True
# interval in seconds
INTERVAL = 10


def post_to_url(url: str, data):

    r = requests.post(URL, json={"mood": avg_mode_label})
    return r.status_code


model_name = "flozi00/face_emotion_recognition-vit-base-patch16-224"

model = ViTForImageClassification.from_pretrained(model_name)

feature_extractor = ViTFeatureExtractor.from_pretrained(model_name)

label = (
    "angry",
    "disgusted",
    "fearful",
    "happy",
    "neutral",
    "sad",
    "surprised"
)

# 0 for default , 1 for second cam
cap = cv2.VideoCapture(0)
# can open
if cap.isOpened():
    print("Camera OK")
else:
    cap.open()

running_sum = np.zeros((7, ), np.float32)

last_sum_time = time()
while True:
    try:
        # cv2 returns (rows, col, channels)
        ret, original = cap.read()

        frame = cv2.resize(original, (224, 224))
        image = Image.fromarray(original)

        inputs = feature_extractor(images=image, return_tensors='pt')
        prediction = model(**inputs)
        output = prediction.logits.detach().numpy()[0]
        # print(*label, sep='\t\t')
        # print(*output, sep='\t')
        predict = f'Feeling {label[(prediction[0]).argmax()]}'

        cv2.putText(original, predict, (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
        cv2.imshow("Classification", original)
        # remove output for when model is unsure
        output[output < 0.5] = 0

        running_sum += output
        avg_mode_label = label[np.argmax(running_sum)]

        # number of seconds per sum and send
        if time() - last_sum_time >= INTERVAL:
            # TODO test send to server
            if REQUESTS_ENABLE:
                status = post_to_url(URL, avg_mode_label)
                if status >= 400:
                    print(
                        f'HTTP status code {status} received when sending data')
            for l in label:
                print(f'{l:9s}', end='\t')
            print()
            for value in running_sum:
                print(f'{value:0.3f}', end='\t\t')
            print()
            def zero_out(x): return 0
            running_sum = zero_out(running_sum)
            last_sum_time = time()

        # Press 'q' to quit application.
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    except KeyboardInterrupt:
        break

cap.release()
frame = None
cv2.destroyAllWindows()
exit()
