from texttrace.wordcompare import (
    build_freq,
    unique_set,
    common_and_union,
    word_overlap,
)


def test_build_freq():
    words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
    freq = build_freq(words)
    assert freq == {"apple": 3, "banana": 2, "cherry": 1}


def test_unique_set():
    words = ["apple", "banana", "apple", "cherry"]
    unique = unique_set(words)
    assert unique == {"apple", "banana", "cherry"}


def test_common_and_union():
    set_a = {"apple", "banana", "cherry"}
    set_b = {"banana", "date", "fig"}
    common, union = common_and_union(set_a, set_b)

    assert common == {"banana"}
    assert union == {"apple", "banana", "cherry", "date", "fig"}


def test_t5_no_shared_words():
    # T5: Red green blue yellow orange purple vs one two three four five six
    words_a = ["red", "green", "blue", "yellow", "orange", "purple"]
    words_b = ["one", "two", "three", "four", "five", "six"]

    set_a = unique_set(words_a)
    set_b = unique_set(words_b)
    common, union = common_and_union(set_a, set_b)

    assert common == set()
    assert word_overlap(set_a, set_b) == 0.0


def test_t7_shared_words_no_phrase():
    # T7: texts share some words
    set_a = {"cat", "dog", "mouse"}
    set_b = {"dog", "elephant", "bird"}

    overlap = word_overlap(set_a, set_b)
    # common = 1 (dog), union = 5 (cat, dog, mouse, elephant, bird) -> 1/5 = 20.0%
    assert overlap == 20.0


def test_word_overlap_identical():
    set_a = {"cat", "dog"}
    set_b = {"cat", "dog"}
    assert word_overlap(set_a, set_b) == 100.0


def test_word_overlap_empty():
    assert word_overlap(set(), set()) == 0.0
