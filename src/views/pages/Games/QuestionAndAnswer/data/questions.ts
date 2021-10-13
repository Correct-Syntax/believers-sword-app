import easy_questions from "./easy_questions";
import hard_question from "./hard_question";
import medium_question from "./medium_question";
import very_hard_question from "./very_hard_question";

export const byLevel = {
    easy : easy_questions,
    medium: medium_question,
    hard: hard_question,
    ver_hard: very_hard_question
}

export const all = {
    ...easy_questions,
    ...medium_question,
    ...hard_question,
    ...very_hard_question
};