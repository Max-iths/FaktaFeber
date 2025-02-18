<template>
    <div v-if="questions.length" class="quiz">
        <h2 id="Quiz-title">Quiz</h2>
        <div v-for="(question, index) in questions" :key="index" class="question-box">
            <p class="question">{{ question.question }}</p>
            <div class="answers">
                <button class="true" @click="answerQuestion(index, true)" :disabled="answered[index]">Sant</button>
                <button class="false" @click="answerQuestion(index, false)" :disabled="answered[index]">Falskt</button>
            </div>

        <p v-if="showAnswers && answered[index]">
            Ditt svar: {{ userAnswers[index] ? 'Sant' : 'Falskt'}}
            <br>
            Rätt svar: {{ question.correct_answer }}
        </p>
        </div>
        <button id="submit-button"  @click="submitQuiz">Klar</button>

        <p v-if="showAnswers">Din poäng: {{ score }} / {{ questions.length }}</p>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useQuizResultsStore } from '../stores/QuizResults'



export default {
    props: {
        questions: {
            type: Array,
            required: true,
        },
    },
    setup(props) {
        const quizStore = useQuizResultsStore()

        const { questions } = props

        const answered = ref(new Array(props.questions.length).fill(false))
        const userAnswers = ref(new Array(props.questions.length).fill(null))
        const showAnswers = ref(false)
        const score = ref(0)
        const correctAnswers = ref(0)
        const incorrectAnswers = ref(0)

        const answerQuestion = (index, answer) => {
            userAnswers.value[index] = answer
            answered.value[index] = true
        }

        const allAnswered = computed(() =>
            answered.value.every(answer => answer === true)
        )

        const submitQuiz = () => {
            showAnswers.value = true
            score.value = 0
            correctAnswers.value = 0
            incorrectAnswers.value = 0



            questions.forEach((question, index) => {
                const correctAnswer = question.correct_answer === 'True'
                if (userAnswers.value[index] === correctAnswer) {
                    score.value++;
                    correctAnswers.value++;
                } else {
                    incorrectAnswers.value++
                }
            })

            quizStore.UpdateAnswers(correctAnswers.value, incorrectAnswers.value);

            quizStore.addResult({
                score: score.value,
                correct: correctAnswers.value,
                incorrect: incorrectAnswers.value,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
            })
        }

        return {
            answered,
            userAnswers,
            showAnswers,
            allAnswered,
            score,
            submitQuiz,
            answerQuestion
        }
    },
}

</script>

<style scoped>
.quiz {
    gap: 20px;
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #00008B;
}

#Quiz-title {
    text-align: left;
    margin: 20px;
}

.question-box {
    border: 1px solid #00008B;
    padding: 20px;
    background-color: #ADD8E6;
    font-size: 20px;
    font-weight: 450;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top : 20px;
}

.question {
    font-size: 20px;
    font-weight: 450;
}
.answers {
    display: flex;
    gap: 20px;
    font-size: 18px;
}

#submit-button {
    padding: 10px;
    border-color: #00008B;
    background-color: #ADD8E6;
    color: #00008B;
    margin: 20px;
    letter-spacing: 2px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
}
</style>
