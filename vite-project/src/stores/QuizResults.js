import { defineStore } from 'pinia'

export const useQuizResultsStore = defineStore('quizResults', {
    state: () => ({
        results: [],
        correctAnswers: 0,
        incorrectAnswers: 0,
    }),
    actions: {
        addResult(newResult) {
            this.results.push(newResult)
        },
        UpdateAnswers(correct, incorrect) {
            this.correctAnswers = correct
            this.incorrectAnswers = incorrect
    }
}
})
