import { Player } from '@vue-youtube/core';
import { ref } from 'vue';

const isReady = ref<boolean>(false);
const playerInstance = ref<Player | undefined>(undefined);
const currentTime = ref<number>(-1);

export function useVueYoutube() {
    return {
        currentTime,
        playerInstance,
        isReady,
    };
}
