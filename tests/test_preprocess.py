from texttrace.preprocess import tokenize


def test_t1_tokenize_basic():
    # T1: basic tokenization with punctuation
    tokens = tokenize("Hello, World!")
    words = [t[0] for t in tokens]
    positions = [(t[1], t[2]) for t in tokens]

    assert words == ["hello", "world"]
    assert positions == [(0, 5), (7, 12)]


def test_t2_apostrophe():
    # T2: apostrophes should stay part of the word
    tokens = tokenize("Don't stop")
    words = [t[0] for t in tokens]
    assert words == ["don't", "stop"]


def test_t3_extra_spaces_and_newlines():
    # T3: multiple spaces and newlines should preserve character offsets
    tokens = tokenize("a   b\n\nc")
    words = [t[0] for t in tokens]
    positions = [(t[1], t[2]) for t in tokens]

    assert words == ["a", "b", "c"]
    assert positions == [(0, 1), (4, 5), (7, 8)]


def test_t20_unicode():
    # T20: text with accents and emojis should not crash and positions must be valid
    text = "Café au lait 😊 is nice"
    tokens = tokenize(text)
    assert len(tokens) >= 4
    # Ensure every slice matches the word in original text
    for word, start, end in tokens:
        assert text[start:end].lower() == word


def test_tokenize_empty():
    assert tokenize("") == []
    assert tokenize("   \n\t  ") == []
