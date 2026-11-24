import re


def tokenize(text):
    tokens = []
    if not text:
        return tokens

    # Match on original text so start and end character offsets stay accurate
    for match in re.finditer(r"[A-Za-z0-9']+", text):
        word = match.group().lower()
        start = match.start()
        end = match.end()
        tokens.append((word, start, end))

    return tokens
