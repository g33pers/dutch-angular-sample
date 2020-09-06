export interface IWord {
    word: string;
    translation: string;
    id: number;
    strength?: number;
    learned?: boolean;
    lastPracticed?: Date;
    revisionDue?: Date;
}