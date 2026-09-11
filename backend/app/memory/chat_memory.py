chat_history = []


def add_message(role: str, message: str):
    chat_history.append({
        "role": role,
        "message": message
    })


def get_history():
    return chat_history

def get_history_text():
    return "\n".join(
        f"{message['role']}: {message['message']}"
        for message in chat_history
    )