# Instructions to set up
## Conda
- Install Anaconda from anaconda.org
- Open anaconda prompt
- run these commands and press 'y' when prompted
```
conda install -c pytorch pytorch
conda install -c huggingface transformers
python C:\\PATH_TO_THIS_FOLDER\detect.py
```
## pip
- Install Python 3.8
- Run these commands in command prompt
```
pip install torch
pip install transformers
python C:\\PATH_TO_THIS_FOLDER\detect.py
```

# Problem Statement

To help to raise awareness in the community and to aid in early detection of depression for individual.


- AI Mood recogniton boost self awareness of one's emotions
- Color stripes dashboard (shareable) promotes mental health in the community
- The MoBot also acts as a companion, which comforts potentiallly depressed users by reducing their loneliness

# Original Concept

The MoBot is a companion bot that has 3 main features – Mood Detector, Reaction, Website Dashboard with shareable color stripes. The MoBot reacts differently based on the mood of the owner.

Refer to the PowerPoint attached to see how they are linked.

# Actual Prototype

Due to hardware and time contraints, we could only work on the software features.

Features are
- AI mood recognition [**Angry, Disgusted, Fearful, Happy, Neutral, Sad, Surprised.**]
- Color stripes Dashboard


Missing features:
- A companion robot
- Static share button (For color stripe dashboard)

We hope that in future, with enough time and resources, we will be able to come out with the complete physical prototype.

# Demo

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

# Code Deployment
The following is our dashboard url. It is responsive based on mood detected from AI. 

https://mobot-app-39805.web.app/

# Dependencies

ML libraries to install : Pillow, Transformers, PyTorch , OpenCV, numpy



# Notes

Each MoBot will have their own unique website dashboard with their own color stripes representing them. The color stripes are **shareable**!

10s capture of the mood in the Mood Detector

- ```detect.py``` is used for actual opencv detection (using pc camera - **set up required **) 
- we incuded a google collab file for your guys to also try out! (**no set up required!**)

**need public repo when everything is done**   -- remove when done
