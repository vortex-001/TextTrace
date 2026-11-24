import time
from texttrace.similarity import compare_documents


def test_t4_identical_docs():
    # T4: Identical 20-word text twice, k=5 -> overall 100, overlap 100, coverage 100/100, 1 passage
    words = "the quick brown fox jumps over the lazy dog and runs across the green field near the blue lake"
    res = compare_documents(words, words, k=5)

    assert res["scores"]["overall"] == 100.0
    assert res["scores"]["word_overlap"] == 100.0
    assert res["scores"]["coverage_a"] == 100.0
    assert res["scores"]["coverage_b"] == 100.0
    assert res["stats"]["passages_a"] == 1
    assert res["stats"]["passages_b"] == 1


def test_t6_synopsis_figure_2():
    # T6: Synopsis Figure 2 example
    text_a = (
        "Data structures help programmers organise information. A hash map stores "
        "key value pairs so that a value can be found quickly. Students often use "
        "it in their projects."
    )
    text_b = (
        "Many students prefer this approach. A hash map stores key value pairs "
        "so that a value can be found quickly, which makes searching faster."
    )
    res = compare_documents(text_a, text_b, k=5)

    assert res["scores"]["overall"] == 49.61
    assert res["scores"]["word_overlap"] == 41.18
    assert res["scores"]["coverage_a"] == 53.57
    assert res["scores"]["coverage_b"] == 62.5
    assert res["stats"]["passages_a"] == 1
    assert res["stats"]["passages_b"] == 1
    assert res["stats"]["longest_passage"] == 15
    assert res["passages_a"][0]["word_count"] == 15
    assert res["passages_b"][0]["word_count"] == 15


def test_t8_case_and_punctuation_ignored():
    # T8: Case and punctuation ignored
    text_a = "Hash, MAP stores keys."
    text_b = "hash map stores keys"
    res = compare_documents(text_a, text_b, k=3)

    assert res["scores"]["overall"] == 100.0
    assert res["scores"]["coverage_a"] == 100.0
    assert res["scores"]["coverage_b"] == 100.0


def test_t16_repeated_phrase():
    # T16: Repeated phrase should not crash and should give sensible result
    text = "go go go go go go"
    res = compare_documents(text, text, k=3)
    assert res["scores"]["overall"] == 100.0
    assert res["stats"]["passages_a"] >= 1


def test_t17_special_characters():
    # T17: Text with special HTML characters
    text_a = 'Testing <script>alert("hello")</script> & other <b>tags</b> here now.'
    text_b = 'Testing <script>alert("hello")</script> & other <b>tags</b> here now.'
    res = compare_documents(text_a, text_b, k=4)

    assert res["scores"]["overall"] == 100.0
    # Original text characters should be preserved in passage slice
    assert "<script>" in res["passages_a"][0]["text"]


def test_t18_large_input_timing():
    # T18: Two ~5,000 word documents should respond in about 1 second
    words = [f"token{i % 300}" for i in range(5000)]
    doc = " ".join(words)
    start_time = time.time()
    res = compare_documents(doc, doc, k=5, compute_lcs=False)
    elapsed = time.time() - start_time

    assert res["scores"]["overall"] == 100.0
    assert elapsed < 3.0  # Responds in well under a second
