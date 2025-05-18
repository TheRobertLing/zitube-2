import { DictionaryEntry } from '@/types';
import { Ref, ref } from 'vue';

const searchQuery = ref<string>('');
const searchResults = ref<DictionaryEntry[]>([]);
const state = ref<'initial' | 'loading' | 'results'>('initial');
const error = ref<string | null>(null);
const onSearchCallback = ref<(() => void) | null>(null);

function triggerDictionarySearch(query: string): void {
    searchQuery.value = query;
    onSearchCallback.value?.();
    search();
}

function registerSearchCallback(fn: () => void): void {
    onSearchCallback.value = fn;
}

async function search(): Promise<void> {
    const query: string = searchQuery.value.trim();

    if (!query) return;

    state.value = 'loading';
    error.value = null;

    try {
        const params = new URLSearchParams({ query });
        const response: Response = await fetch(`/api/v1/dictionary?${params}`);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json: DictionaryEntry[] = await response.json();
        searchResults.value = json;
    } catch (err) {
        console.error(err);
        error.value = 'Failed to fetch dictionary results.';
        searchResults.value = [];
    } finally {
        state.value = 'results';
    }
}

export function useDictionarySearch(): {
    searchQuery: Ref<string>;
    searchResults: Ref<DictionaryEntry[]>;
    state: Ref<'initial' | 'loading' | 'results'>;
    error: Ref<string | null>;
    triggerDictionarySearch: (query: string) => void;
    registerSearchCallback: (fn: () => void) => void;
    search: () => Promise<void>;
} {
    return {
        searchQuery,
        searchResults,
        state,
        error,
        triggerDictionarySearch,
        registerSearchCallback,
        search,
    };
}
