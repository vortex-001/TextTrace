from texttrace.preprocess import tokenize


def validate_input(text_a, text_b, k):
    # k must be an integer between 2 and 10
    if not isinstance(k, int) or k < 2 or k > 10:
        return "Phrase length k must be an integer between 2 and 10."

    # Check for empty text
    if not text_a or not text_a.strip():
        return "Document A cannot be empty."
    if not text_b or not text_b.strip():
        return "Document B cannot be empty."

    # Maximum character limit is 100,000 characters
    if len(text_a) > 100000:
        return "Document A exceeds the limit of 100,000 characters."
    if len(text_b) > 100000:
        return "Document B exceeds the limit of 100,000 characters."

    # Documents must contain at least k words
    tokens_a = tokenize(text_a)
    if len(tokens_a) < k:
        return f"Document A has fewer than {k} words."

    tokens_b = tokenize(text_b)
    if len(tokens_b) < k:
        return f"Document B has fewer than {k} words."

    return None
