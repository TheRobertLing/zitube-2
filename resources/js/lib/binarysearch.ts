import { TranscriptSegment } from '@/types';

/**
 * Binary search to find the current index of the transcript
 */
export function currentIndexBinarySearch(currentTime: number, videoTranscriptData: TranscriptSegment[]): number {
    let low = 0;
    let high = videoTranscriptData.length - 1;

    while (low <= high) {
        const mid = low + Math.floor((high - low) / 2);

        if (videoTranscriptData[mid].startTime <= currentTime && videoTranscriptData[mid].endTime > currentTime) {
            return mid;
        } else if (videoTranscriptData[mid].endTime <= currentTime) {
            low = mid + 1
        } else {
            high = mid - 1
        }
    }

    return -1;
}
