from texttrace.passages import merge_marked
from texttrace.preprocess import tokenize


def test_merge_marked_single_passage():
    text = "one two three four five"
    tokens = tokenize(text)
    # Mark first 3 words
    flags = [True, True, True, False, False]
    passages = merge_marked(flags, tokens, text)

    assert len(passages) == 1
    p = passages[0]
    assert p["word_count"] == 3
    assert p["start_char"] == 0
    assert p["end_char"] == 13
    assert p["text"] == "one two three"


def test_merge_marked_multiple_passages():
    text = "a b c d e f g"
    tokens = tokenize(text)
    flags = [True, True, False, True, True, True, False]
    passages = merge_marked(flags, tokens, text)

    assert len(passages) == 2
    assert passages[0]["word_count"] == 2
    assert passages[0]["text"] == "a b"
    assert passages[1]["word_count"] == 3
    assert passages[1]["text"] == "d e f"
