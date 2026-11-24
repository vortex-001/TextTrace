def merge_sort(items):
    # Hand-written stable merge sort (descending order)
    if len(items) <= 1:
        return list(items)

    mid = len(items) // 2
    left = merge_sort(items[:mid])
    right = merge_sort(items[mid:])

    return _merge(left, right)


def _get_sort_key(item):
    # Extracts sorting value whether item is a dict with word_count or a number
    if isinstance(item, dict):
        return item.get("word_count", 0)
    return item


def _merge(left, right):
    result = []
    i = 0
    j = 0

    # Merge in descending order, using >= to maintain stability
    while i < len(left) and j < len(right):
        if _get_sort_key(left[i]) >= _get_sort_key(right[j]):
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    while i < len(left):
        result.append(left[i])
        i += 1

    while j < len(right):
        result.append(right[j])
        j += 1

    return result
