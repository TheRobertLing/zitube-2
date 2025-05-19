<?php

/**
 * Don't need either of the helpers for now
 */
function normalizePinyin($pinyin): string
{
    $search = ['v', 'ü', 'ǖ', 'ǘ', 'ǚ', 'ǜ'];
    $replace = ['u:', 'u:', 'u:', 'u:', 'u:', 'u:'];

    return str_replace($search, $replace, strtolower(trim($pinyin)));
}

function parseSearch(string $input): array
{
    $input = strtolower(trim($input));

    if (str_starts_with($input, 'p:')) {
        return ['column' => 'pinyin', 'term' => normalizePinyin(trim(substr($input, 2)))];
    } elseif (str_starts_with($input, 't:')) {
        return ['column' => 'traditional', 'term' => trim(substr($input, 2))];
    } elseif (str_starts_with($input, 's:')) {
        return ['column' => 'simplified', 'term' => trim(substr($input, 2))];
    }

    // Fallback: assume simplified
    return ['column' => 'simplified', 'term' => $input];
}

