from texttrace.rabinkarp import word_hash, window_hashes, find_matches
from texttrace.preprocess import tokenize


def _compute_window_direct(word_hashes, start, k, B, M):
    h = 0
    for i in range(start, start + k):
        h = (h * B + word_hashes[i]) % M
    return h


def test_t9_rolling_hash_equals_direct():
    # T9: Rolling hash computed window by window matches direct calculation
    words = ["algorithm", "hash", "table", "search", "tree", "binary", "graph", "queue", "stack"]
    B = 131
    M = 1_000_000_007
    k = 4

    hw = [word_hash(w, M) for w in words]
    rolled = window_hashes(hw, k, B, M)

    direct = [_compute_window_direct(hw, i, k, B, M) for i in range(len(words) - k + 1)]
    assert rolled == direct


def test_t10_collision_check_tiny_m():
    # T10: When M is tiny (e.g. 7), collisions occur in hashes but word comparison prevents false matches
    tokens_a = tokenize("alpha beta gamma delta epsilon")
    tokens_b = tokenize("one two three four five")
    k = 3

    # Force tiny M = 7
    marked_a, marked_b = find_matches(tokens_a, tokens_b, k, M=7)

    # Because words are different, no words should be marked
    assert not any(marked_a)
    assert not any(marked_b)
