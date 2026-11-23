# VIVA NOTES — be able to answer these without looking at code

1. Why lowercase and remove punctuation? So "Hash," and "hash" count as the same word.
2. HashMap vs HashSet here? HashMap (dict) stores word -> count and phrase hash -> positions. HashSet (set) stores unique words; & gives common words, | gives union.
3. Why Rabin–Karp and not comparing every phrase with every phrase? Hashing turns a k-word phrase into one number and the rolling formula gets the next one in O(1), so about O(n+m) instead of O(n·m·k).
4. What if two different phrases give the same hash? Collision. That is why equal hashes are verified word by word.
5. Rolling hash formula? Remove the first word's contribution (h(w_i)·B^(k-1)), multiply by B, add the new word's hash, take mod M.
6. Why Merge Sort? Stable and always O(p log p). Longest passages shown first.
7. Worst case of Rabin–Karp? Many equal hashes or the same phrase repeated many times in both docs: about O(n·m·k).
8. Why Jaccard? Intersection over union is simple and always between 0 and 1.
9. Why is the overall score a weighted mix? Word overlap alone ignores order; phrase coverage alone ignores shared vocabulary. Weights are a design choice and can be tuned.
10. Does a high score prove plagiarism? No. Quotes, common phrases and shared sources also match.
11. What can't it detect? Paraphrasing, translation.
12. What is LCS and why optional? DP over the two word lists, O(n·m) time and space, so only for short docs.
13. KMP vs Rabin–Karp? KMP is single-pattern O(T+P); Rabin–Karp hashing handles many windows easily and is simple to roll.
14. Why Flask and JSON? Simple backend, browser sends texts with Fetch, gets scores and positions back.
