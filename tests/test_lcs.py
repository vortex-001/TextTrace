from texttrace.lcs import lcs


def test_t19_lcs_basic():
    # T19: LCS of ["a", "b", "c", "d"] and ["b", "d", "c"] is 2
    words_a = ["a", "b", "c", "d"]
    words_b = ["b", "d", "c"]
    assert lcs(words_a, words_b) == 2


def test_lcs_identical():
    words = ["hello", "world", "foo", "bar"]
    assert lcs(words, words) == 4


def test_lcs_empty():
    assert lcs([], ["a", "b"]) == 0
    assert lcs(["a", "b"], []) == 0
