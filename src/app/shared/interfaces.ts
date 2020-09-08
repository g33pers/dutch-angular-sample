export interface IWord {
    word: string;
    translation: string;
    id: number;
    strength?: number;
    learning?: boolean;
    lastPracticed?: string;
    revisionDue?: string;
}