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
        endTime: 0.9,
        tokenizedChinese: [{ hanzi: ['鸡', '你'], pinyin: ['jī', 'nǐ'] }],
        english: 'Chicken you',
    },
    {
        startTime: 0.9,
        endTime: 1.8,
        tokenizedChinese: [{ hanzi: ['太', '美'], pinyin: ['tài', 'měi'] }],
        english: 'are too beautiful',
    },
    {
        startTime: 1.8,
        endTime: 2.65,
        tokenizedChinese: [
            { hanzi: ['篮', '球'], pinyin: ['lán', 'qiú'] },
            { hanzi: ['太'], pinyin: ['tài'] },
        ],
        english: 'Basketball is',
    },
    {
        startTime: 2.65,
        endTime: 3.5,
        tokenizedChinese: [{ hanzi: ['危', '险'], pinyin: ['wēi', 'xiǎn'] }],
        english: 'dangerous',
    },
    {
        startTime: 3.5,
        endTime: 4.15,
        tokenizedChinese: [{ hanzi: ['哎', '呦'], pinyin: ['āi', 'yō'] }],
        english: 'Aiyo',
    },
    {
        startTime: 4.15,
        endTime: 4.8,
        tokenizedChinese: [
            { hanzi: ['你'], pinyin: ['nǐ'] },
            { hanzi: ['干', '嘛'], pinyin: ['gàn', 'má'] },
        ],
        english: 'What are you doing',
    },
    {
        startTime: 4.8,
        endTime: 5.75,
        tokenizedChinese: [
            { hanzi: ['这'], pinyin: ['zhè'] },
            { hanzi: ['好'], pinyin: ['hǎo'] },
        ],
        english: 'This is so',
    },
    {
        startTime: 5.75,
        endTime: 6.7,
        tokenizedChinese: [{ hanzi: ['讨', '厌'], pinyin: ['tǎo', 'yàn'] }],
        english: 'annoying',
    },
    {
        startTime: 6.7,
        endTime: 7.55,
        tokenizedChinese: [
            { hanzi: ['鸡'], pinyin: ['jī'] },
            { hanzi: ['太'], pinyin: ['tài'] },
        ],
        english: 'Chicken is too',
    },
    {
        startTime: 7.55,
        endTime: 8.4,
        tokenizedChinese: [{ hanzi: ['美'], pinyin: ['měi'] }],
        english: 'beautiful',
    },
    {
        startTime: 8.4,
        endTime: 9.2,
        tokenizedChinese: [
            { hanzi: ['练', '习'], pinyin: ['liàn', 'xí'] },
            { hanzi: ['了'], pinyin: ['le'] },
        ],
        english: 'Practised for',
    },
    {
        startTime: 9.2,
        endTime: 10,
        tokenizedChinese: [
            { hanzi: ['两'], pinyin: ['liǎng'] },
            { hanzi: ['年'], pinyin: ['nián'] },
        ],
        english: '2.5 years',
    },
    {
        startTime: 10,
        endTime: 11.2,
        tokenizedChinese: [
            { hanzi: ['我'], pinyin: ['wǒ'] },
            { hanzi: ['多'], pinyin: ['duō'] },
            { hanzi: ['想'], pinyin: ['xiǎng'] },
        ],
        english: 'I really want to',
    },
    {
        startTime: 11.2,
        endTime: 12.4,
        tokenizedChinese: [
            { hanzi: ['用'], pinyin: ['yòng'] },
            { hanzi: ['背', '带'], pinyin: ['bèi', 'dài'] },
            { hanzi: ['隔', '绝'], pinyin: ['gé', 'jué'] },
            { hanzi: ['世', '界'], pinyin: ['shì', 'jiè'] },
        ],
        english: 'use straps to isolate from the world',
    },
    {
        startTime: 12.4,
        endTime: 13.4,
        tokenizedChinese: [
            { hanzi: ['我'], pinyin: ['wǒ'] },
            { hanzi: ['的'], pinyin: ['de'] },
            { hanzi: ['唱', '跳'], pinyin: ['chàng', 'tiào'] },
        ],
        english: 'My singing and dancing',
    },
    {
        startTime: 13.4,
        endTime: 14.4,
        tokenizedChinese: [
            { hanzi: ['rap'], pinyin: ['rap'] },
            { hanzi: ['篮', '球'], pinyin: ['lán', 'qiú'] },
            { hanzi: ['和'], pinyin: ['hé'] },
        ],
        english: 'rap, basketball and',
    },
    {
        startTime: 14.4,
        endTime: 16.2,
        tokenizedChinese: [
            { hanzi: ['鸡'], pinyin: ['jī'] },
            { hanzi: ['太'], pinyin: ['tài'] },
        ],
        english: 'Chicken is too',
    },
    {
        startTime: 16.2,
        endTime: 18,
        tokenizedChinese: [{ hanzi: ['美'], pinyin: ['měi'] }],
        english: 'beautiful',
    },
];


// Converts the seconds from the iframe api to HH:MM:SS
export const secondsToStandardTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const hrsStr = hrs > 0 ? String(hrs).padStart(2, '0') + ':' : '';
    const minsStr = String(mins).padStart(2, '0');
    const secsStr = String(secs).padStart(2, '0');

    return hrsStr + minsStr + ':' + secsStr;
};

export type VideoMetadata = {
    id: string;
    title: string;
    description: string;
    publishedAt: string; // ISO string
    channel: {
        id: string;
        title: string;
    };
    duration: string; // ISO 8601 duration
    categoryId: string;
    stats: {
        views: number;
        likes: number;
        comments: number;
    };
};

export const videoData: VideoMetadata = {
    id: 'MbEXK7sKqCk',
    title: '萧敬腾 — 篮球太危险 #鸡太美#篮球太危险#蔡徐坤',
    description:
        '三度IG：https://www.instagram.com/3doc0609/\n\n影片來源：\n1) ⚡外婆家的澎湖雞⚡\nhttps://www.bilibili.com/video/BV1cU4y1Z74j\n\n2) 599買的ikun13\nhttps://www.bilibili.com/video/BV1BT411J7B2\n\n3) 你幹嘛！？小黑子他們不能放過我？\nhttps://www.bilibili.com/video/BV1cY411H7Sc\n\n4) 史上最強蔡徐坤打籃球\nhttps://www.bilibili.com/video/BV1h4411g7Fp\n\n5) 蕭敬騰夜太美雞太美\nhttps://www.bilibili.com/video/BV1FS4y1W71U\n\n6) 周杰倫最偉大的雞\nhttps://www.bilibili.com/video/BV1XN4y1M7o5\n\n7) 練習時長兩分半女坤\nhttps://www.bilibili.com/video/BV1at4y1V7NC\n\n8) 來自印度的ikun 印度版雞你太美\nhttps://www.bilibili.com/video/BV1se411L7sG\n\n9) 雞你太美，但是是機械版玩具！\nhttps://www.bilibili.com/video/BV1vP4y1S7xX\n\n10) 沒點才藝都不敢說自己是ikun\nhttps://www.bilibili.com/video/BV1rm4y1A79M\n\n11) 電《雞》嘲諷 Groove Battle電搖嘲諷\nhttps://www.bilibili.com/video/BV1DY4y1V7YK\n\n12) 坤坤大戰三浦\n https://www.bilibili.com/video/BV1p94y197jR\n\n13) 本來挺喜歡喝阿薩姆的\nhttps://www.bilibili.com/video/BV1Qe4y1s7Er\n\n14) 三萬粉整活兒：《大 悲 咒》，但是只因你太美。\nhttps://www.bilibili.com/video/BV1Q44y1f7aX\n\n#蔡徐坤 \n#小黑子\n#Ikun\n-----------------------------------------------------------\n笑話投稿請點→http://bit.ly/2Jk2NyO\n其他邀演合作請洽：3dmm0609@gmail.com\n\n#fun\n#live\n#funny\n#comedy\n#lol\n#fun\n#meme\n#trending\n#memes\n#Entertainment',
    publishedAt: '2022-08-06T15:06:29Z',
    channel: {
        id: 'UCJS6eOhldDpi9ZVFSPi49Eg',
        title: '閑',
    },
    duration: 'PT18S',
    categoryId: '22',
    stats: {
        views: 98855,
        likes: 1825,
        comments: 54,
    },
};
