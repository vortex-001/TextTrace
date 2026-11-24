def build_freq(words):
    # Count occurrences of each word using a hash map
    freq = {}
    for word in words:
        freq[word] = freq.get(word, 0) + 1
    return freq


def unique_set(words):
    # Collect unique words using a hash set
    return set(words)


def common_and_union(set_a, set_b):
    # Intersection and union of unique word sets
    common = set_a & set_b
    union = set_a | set_b
    return common, union


def word_overlap(set_a, set_b):
    # Jaccard similarity percentage: |A & B| / |A | B| * 100
    union = set_a | set_b
    if not union:
        return 0.0

    common = set_a & set_b
    overlap = (len(common) / len(union)) * 100.0
    return round(overlap, 2)
