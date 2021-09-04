import torch
from transformers import ViTForImageClassification, ViTFeatureExtractor
from PIL import ImageOps, Image
import numpy as np
import cv2
from sys import exit

model_name = "flozi00/face_emotion_recognition-vit-base-patch16-224"

model = ViTForImageClassification.from_pretrained(model_name)

feature_extractor = ViTFeatureExtractor.from_pretrained(model_name)

label = [
    "angry",
    "disgusted",
    "fearful",
    "happy",
    "neutral",
    "sad",
    "surprised"
]

cap = cv2.VideoCapture(0)

if (cap.isOpened()):
    print("Camera OK")
else:
    cap.open()


while True:
    try:
        # cv2 returns (rows, col, channels)
        ret, original = cap.read()

        frame = cv2.resize(original, (224, 224))
        image = Image.fromarray(original)

        inputs = feature_extractor(images=image, return_tensors='pt')
        # Display the predictions
        prediction = model(**inputs)
        print(*label)
        print(*prediction.logits.detach().numpy()[0])

        predict = f'Feeling {label[(prediction[0]).argmax()]}'

        cv2.putText(original, predict, (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
        cv2.imshow("Classification", original)

        if (cv2.waitKey(1) & 0xFF == ord('q')):
            break
    except KeyboardInterrupt:
        break

cap.release()
frame = None
cv2.destroyAllWindows()
exit()