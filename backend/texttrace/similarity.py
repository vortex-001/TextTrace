from texttrace.preprocess import tokenize
from texttrace.wordcompare import unique_set, common_and_union, word_overlap
from texttrace.rabinkarp import find_matches
from texttrace.passages import merge_marked
from texttrace.mergesort import merge_sort
from texttrace.lcs import lcs


def calculate_coverage(matched_words_count, total_words):
    # Percentage of words in document that appear in matched passages
    if total_words == 0:
        return 0.0
    return round((matched_words_count / total_words) * 100.0, 2)


def calculate_overall(word_overlap, coverage_a, coverage_b):
    # Overall similarity is the average of word overlap and mean phrase coverage
    avg_coverage = (coverage_a + coverage_b) / 2.0
    return round((word_overlap + avg_coverage) / 2.0, 2)


def compare_documents(text_a, text_b, k=5, compute_lcs=True):
    # Complete similarity comparison pipeline
    tokens_a = tokenize(text_a)
    tokens_b = tokenize(text_b)

    words_a = [t[0] for t in tokens_a]
    words_b = [t[0] for t in tokens_b]

    set_a = unique_set(words_a)
    set_b = unique_set(words_b)

    common, union = common_and_union(set_a, set_b)
    overlap = word_overlap(set_a, set_b)

    marked_a, marked_b = find_matches(tokens_a, tokens_b, k)

    passages_a = merge_marked(marked_a, tokens_a, text_a)
    passages_b = merge_marked(marked_b, tokens_b, text_b)

    # Sort passages longest first
    sorted_passages_a = merge_sort(passages_a)
    sorted_passages_b = merge_sort(passages_b)

    matched_count_a = sum(1 for m in marked_a if m)
    matched_count_b = sum(1 for m in marked_b if m)

    cov_a = calculate_coverage(matched_count_a, len(tokens_a))
    cov_b = calculate_coverage(matched_count_b, len(tokens_b))
    overall = calculate_overall(overlap, cov_a, cov_b)

    longest = 0
    if sorted_passages_a:
        longest = max(longest, sorted_passages_a[0]["word_count"])
    if sorted_passages_b:
        longest = max(longest, sorted_passages_b[0]["word_count"])

    # Optional LCS length: computed only for documents <= 2000 words
    lcs_length = None
    if compute_lcs and len(words_a) <= 2000 and len(words_b) <= 2000:
        lcs_length = lcs(words_a, words_b)

    return {
        "scores": {
            "overall": overall,
            "word_overlap": overlap,
            "coverage_a": cov_a,
            "coverage_b": cov_b,
        },
        "stats": {
            "words_a": len(words_a),
            "words_b": len(words_b),
            "unique_a": len(set_a),
            "unique_b": len(set_b),
            "common_words": len(common),
            "union_words": len(union),
            "passages_a": len(sorted_passages_a),
            "passages_b": len(sorted_passages_b),
            "longest_passage": longest,
            "lcs_length": lcs_length,
        },
        "passages_a": sorted_passages_a,
        "passages_b": sorted_passages_b,
    }
