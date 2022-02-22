export class Movie {
    id: string;
    title: string;
    category: string;
    score: number;

    constructor(id: string, title: string, category: string, score: number) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.score = score;
    }
}