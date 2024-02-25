from controllers.gemini_controller import send_message, send_history
import random

start_convo = "Ask me one behavioral question. Do not write anything except the question in your response. No headers."
followup = "Ask me a followup question. Do not write anything except the question in your response. No headers."
nextq = "Ask me another behavioral question. Do not write anything except the question in your response. No headers."

def start():
    chat = start_chat()

send_message(start_convo).text

def prompt_followup_question(answer):
    send_message(f'Here is my sample answer: {answer} {followup}').text

def prompt_next_question(answer):
    send_message(f'Here is my sample answer: {answer} {nextq}').text

def pick_q(answer):
    rand = random.randint(0, 1)
    if rand:
        return prompt_followup_question(answer)
    else:
        return prompt_next_question(answer)

# answer = "I encourage open and honest communication among team members, providing a safe space for everyone to express their concerns and viewpoints. I would facilitate a meeting where each party can share their perspective and actively listen to understand the underlying issues."
# pick_q(answer)
# answer2 = "I worked."
# pick_q(answer2)

for message in send_history():
    print(f'{message.role}: {message.parts[0].text}')
