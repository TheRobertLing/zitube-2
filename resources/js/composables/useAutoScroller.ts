import { ref, watch } from 'vue';

const STORAGE_KEY = 'zitube-use-autoscroller';

const saved = localStorage.getItem(STORAGE_KEY);
const autoscrollerEnabled = ref<boolean>(saved === 'true');

watch(autoscrollerEnabled, (newValue) => {
    localStorage.setItem(STORAGE_KEY, String(newValue));
});

export function useAutoScroller() {
    return { autoscrollerEnabled };
}
