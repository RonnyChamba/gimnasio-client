import { CategoryAttribute } from "./category.model";

export interface ExerciseAttributes {
    ide?: number;
    name: string;
    description?: string;
    photo?: string;
    url: string;
    createDate?: string;
    level: string;
}

export interface ExerciseFetch  extends ExerciseAttributes {
    categories: CategoryAttribute[];
}