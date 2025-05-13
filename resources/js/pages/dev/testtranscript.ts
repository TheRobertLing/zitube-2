export type TranscriptSegment = {
    startTime: number;
    endTime: number;
    tokenizedChinese: ChineseToken[];
    english: string;
};

export type ChineseToken = {
    hanzi: string[];
    pinyin: string[];
};

export const transcript: TranscriptSegment[] = [
    {
        startTime: 0,
        endTime: 1.8,
        tokenizedChinese: [{ hanzi: ['鸡', '你', '太', '美'], pinyin: ['jī', 'nǐ', 'tài', 'měi'] }],
        english: 'Chicken you are too beautiful',
    },
    {
        startTime: 1.8,
        endTime: 3.5,
        tokenizedChinese: [
            { hanzi: ['篮', '球'], pinyin: ['lán', 'qiú'] },
            { hanzi: ['太'], pinyin: ['tài'] },
            { hanzi: ['危', '险'], pinyin: ['wēi', 'xiǎn'] },
        ],
        english: 'Basketball is dangerous',
    },
    {
        startTime: 3.5,
        endTime: 4.8,
        tokenizedChinese: [
            { hanzi: ['哎', '呦'], pinyin: ['āi', 'yō'] },
            { hanzi: ['你'], pinyin: ['nǐ'] },
            { hanzi: ['干', '嘛'], pinyin: ['gàn', 'má'] },
        ],
        english: 'What are you doing',
    },
    {
        startTime: 4.8,
        endTime: 6.7,
        tokenizedChinese: [
            { hanzi: ['这'], pinyin: ['zhè'] },
            { hanzi: ['好'], pinyin: ['hǎo'] },
            { hanzi: ['讨', '厌'], pinyin: ['tǎo', 'yàn'] },
        ],
        english: 'This is so annoying',
    },
    {
        startTime: 6.7,
        endTime: 8.4,
        tokenizedChinese: [
            { hanzi: ['鸡'], pinyin: ['jī'] },
            { hanzi: ['太'], pinyin: ['tài'] },
            { hanzi: ['美'], pinyin: ['měi'] },
        ],
        english: 'Chicken is beautiful',
    },
    {
        startTime: 8.4,
        endTime: 10,
        tokenizedChinese: [
            { hanzi: ['练', '习'], pinyin: ['liàn', 'xí'] },
            { hanzi: ['了'], pinyin: ['le'] },
            { hanzi: ['两'], pinyin: ['liǎng'] },
            { hanzi: ['年'], pinyin: ['nián'] },
        ],
        english: 'Practised for 2.5 years',
    },
    {
        startTime: 10,
        endTime: 12.4,
        tokenizedChinese: [
            { hanzi: ['我'], pinyin: ['wǒ'] },
            { hanzi: ['多'], pinyin: ['duō'] },
            { hanzi: ['想'], pinyin: ['xiǎng'] },
            { hanzi: ['用'], pinyin: ['yòng'] },
            { hanzi: ['背', '带'], pinyin: ['bèi', 'dài'] },
            { hanzi: ['隔', '绝'], pinyin: ['gé', 'jué'] },
            { hanzi: ['世', '界'], pinyin: ['shì', 'jiè'] },
        ],
        english: 'I want to isolate from the world using shoulder straps',
    },
    {
        startTime: 12.4,
        endTime: 14.4,
        tokenizedChinese: [
            { hanzi: ['我'], pinyin: ['wǒ'] },
            { hanzi: ['的'], pinyin: ['de'] },
            { hanzi: ['唱', '跳'], pinyin: ['chàng', 'tiào'] },
            { hanzi: ['rap'], pinyin: ['rap'] },
            { hanzi: ['篮', '球'], pinyin: ['lán', 'qiú'] },
            { hanzi: ['和'], pinyin: ['hé'] },
        ],
        english: 'My dance, jump, rap, basketball and',
    },
    {
        startTime: 14.4,
        endTime: 16,
        tokenizedChinese: [
            { hanzi: ['鸡'], pinyin: ['jī'] },
            { hanzi: ['太'], pinyin: ['tài'] },
            { hanzi: ['美'], pinyin: ['měi'] },
        ],
        english: 'Chicken is too beautiful',
    },
];

