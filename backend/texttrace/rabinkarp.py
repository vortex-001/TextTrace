def word_hash(word, M=1_000_000_007):
    # Polynomial rolling hash for a word using multiplier 31
    h = 0
    for c in word:
        h = (h * 31 + ord(c)) % M
    return h


def window_hashes(word_hashes, k, B=131, M=1_000_000_007):
    # Rolling hash for all windows of length k
    if len(word_hashes) < k:
        return []

    # Precompute B^(k-1) mod M
    power = pow(B, k - 1, M)

    # Calculate hash of first window
    h = 0
    for j in range(k):
        h = (h * B + word_hashes[j]) % M

    hashes = [h]

    # Roll through remaining windows
    for i in range(len(word_hashes) - k):
        h = ((h - word_hashes[i] * power) * B + word_hashes[i + k]) % M
        hashes.append(h)

    return hashes


def find_matches(tokens_a, tokens_b, k, B=131, M=1_000_000_007):
    # Rabin-Karp phrase matching between Document A and Document B
    marked_a = [False] * len(tokens_a)
    marked_b = [False] * len(tokens_b)

    if len(tokens_a) < k or len(tokens_b) < k:
        return marked_a, marked_b

    words_a = [t[0] for t in tokens_a]
    words_b = [t[0] for t in tokens_b]

    hw_a = [word_hash(w, M) for w in words_a]
    hw_b = [word_hash(w, M) for w in words_b]

    hashes_a = window_hashes(hw_a, k, B, M)
    hashes_b = window_hashes(hw_b, k, B, M)

    # Store Document A window hashes in a hash map
    hash_to_pos_a = {}
    for i, h in enumerate(hashes_a):
        if h not in hash_to_pos_a:
            hash_to_pos_a[h] = []
        hash_to_pos_a[h].append(i)

    # Check Document B windows against Document A
    for j, h in enumerate(hashes_b):
        if h in hash_to_pos_a:
            for i in hash_to_pos_a[h]:
                # Direct word-by-word comparison to prevent false positives from collisions
                if words_a[i : i + k] == words_b[j : j + k]:
                    for idx in range(i, i + k):
                        marked_a[idx] = True
                    for idx in range(j, j + k):
                        marked_b[idx] = True

    return marked_a, marked_b
