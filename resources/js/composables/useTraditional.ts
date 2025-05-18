import { ref, watch } from 'vue';

const STORAGE_KEY = 'zitube-show-traditional';

const saved = localStorage.getItem(STORAGE_KEY);
const showTraditional = ref<boolean>(saved === 'true');

watch(showTraditional, (newValue) => {
    localStorage.setItem(STORAGE_KEY, String(newValue));
});

export function useTraditional() {
    return { showTraditional };
}
