from texttrace.mergesort import merge_sort


def test_t11_merge_sort_lengths():
    # T11: Merge sort with lengths [3, 9, 1, 9, 5] gives [9, 9, 5, 3, 1]
    lengths = [3, 9, 1, 9, 5]
    sorted_lengths = merge_sort(lengths)
    assert sorted_lengths == [9, 9, 5, 3, 1]


def test_merge_sort_empty_and_single():
    assert merge_sort([]) == []
    assert merge_sort([42]) == [42]


def test_merge_sort_stability_with_dicts():
    # Test stability with dict items
    items = [
        {"word_count": 5, "id": 1},
        {"word_count": 8, "id": 2},
        {"word_count": 5, "id": 3},
    ]
    res = merge_sort(items)
    assert [x["word_count"] for x in res] == [8, 5, 5]
    # Stable: id 1 should appear before id 3
    assert res[1]["id"] == 1
    assert res[2]["id"] == 3
