from texttrace.validate import validate_input


def test_valid_input():
    text_a = "This is a valid document with enough words."
    text_b = "This is another valid document with enough words."
    assert validate_input(text_a, text_b, 5) is None


def test_t12_empty_input():
    valid = "One two three four five"
    # Document A empty
    err_a = validate_input("", valid, 5)
    assert err_a is not None
    assert "Document A" in err_a

    # Document B empty
    err_b = validate_input(valid, "   ", 5)
    assert err_b is not None
    assert "Document B" in err_b


def test_t13_fewer_than_k_words():
    short = "One two three"
    valid = "One two three four five"

    # Document A has 3 words, k=5
    err_a = validate_input(short, valid, 5)
    assert err_a is not None
    assert "Document A" in err_a
    assert "5" in err_a

    # Document B has 3 words, k=5
    err_b = validate_input(valid, short, 5)
    assert err_b is not None
    assert "Document B" in err_b
    assert "5" in err_b


def test_t14_too_large():
    valid = "One two three four five"
    large_text = "word " * 25000  # 125,000 characters

    err_a = validate_input(large_text, valid, 5)
    assert err_a is not None
    assert "Document A" in err_a

    err_b = validate_input(valid, large_text, 5)
    assert err_b is not None
    assert "Document B" in err_b


def test_t15_bad_k():
    valid_a = "One two three four five"
    valid_b = "Six seven eight nine ten"

    # k too small
    err_low = validate_input(valid_a, valid_b, 1)
    assert err_low is not None

    # k too large
    err_high = validate_input(valid_a, valid_b, 50)
    assert err_high is not None

    # k not an int
    err_type = validate_input(valid_a, valid_b, "5")
    assert err_type is not None
