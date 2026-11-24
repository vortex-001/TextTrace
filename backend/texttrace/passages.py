def merge_marked(flags, tokens, text=None):
    # Merge consecutive True flags into passage ranges
    passages = []
    n = len(flags)
    i = 0

    while i < n:
        if flags[i]:
            run_start = i
            while i < n and flags[i]:
                i += 1
            run_end = i - 1

            start_char = tokens[run_start][1]
            end_char = tokens[run_end][2]
            passage_text = text[start_char:end_char] if text is not None else ""

            passages.append({
                "start_word": run_start,
                "end_word": run_end,
                "word_count": run_end - run_start + 1,
                "start_char": start_char,
                "end_char": end_char,
                "text": passage_text,
            })
        else:
            i += 1

    return passages
