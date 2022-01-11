export interface RedditPost {
    title: string;
    author: string;
    created: number;
    is_video: boolean;
    over_18: boolean;
    post_hint: string;
    score: number;
    [propName: string]: any;
}