import os
import time
import playsound
import speech_recognition as sr
from gtts import gTTS
import wave

def speak(text):
    tts = gTTS(text=text, lang="en")
    filename = "voice.mp3"
    tts.save(filename)
    playsound.playsound(filename)

def get_duration_wave(file_path):
   with wave.open(file_path, 'r') as audio_file:
      frame_rate = audio_file.getframerate()
      n_frames = audio_file.getnframes()
      duration = n_frames / float(frame_rate)
      return duration

def analyze_speed(file_path, string):
    duration = get_duration_wave(file_path)
    num_words = len(string.split())
    rate = num_words/(duration/60)
    print('Duration: ' + str(duration))
    print('Num words: ' + str(num_words))
    print('Rate: ' + str(rate))
    if rate >= 140 and rate <= 160:
        print('Perfect speed!')
    elif rate < 140:
        print('Speak faster...')
    else:
        print('Speak slower...')

def get_audio():
    r = sr.Recognizer()
    r.energy_threshold = 4000
    audio_file = './audio/recording (1).wav'
    with sr.AudioFile(audio_file) as source:
        r.adjust_for_ambient_noise(source)
        print('start')
        audio = r.record(source)
        # audio = r.listen(source)
        print('stop')
        try:
            s = r.recognize_google(audio_data=audio)
            analyze_speed(audio_file, s)
            print("Text: "+s)
        except ValueError as e:
            print("speech not recognized")
        except Exception as e:
            print("Exception: "+str(e))

get_audio()