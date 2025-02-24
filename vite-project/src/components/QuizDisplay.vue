<template>
    <div v-if="questions.length" class="quiz">
        <div>
            <div class="quiz-title">
                <div class="quizTimer">
                        <p v-if="!showAnswers"><strong>Time:</strong> {{ formattedTime }}</p>
                        <p v-if="showAnswers"><strong>Time:</strong> {{ totalTimeFormatted }}</p>
                </div>
                <h2 v-if="!isEditing"> {{ quizName || "Quiz" }}</h2>
                <input
                    v-else
                    type="text"
                    v-model="editedQuizName"
                    placeholder="Enter quiz title"
                    ref="inputField"
                />
                <img
                src="https://icons.veryicon.com/png/o/miscellaneous/two-color-webpage-small-icon/edit-247.png"
                alt="pencil icon for edit function"
                title="Edit quiz title"
                class="edit-icon"
                width="30"
                height="30"
                @click="enableEditing"
                />
            </div>
            <button v-if="isEditing" @click="disableEditing">Save</button>

        </div>

        <div v-for="(question, index) in questions" :key="index" class="question-box">
            <div>
            <p class="question">{{ question.question }}</p>
            </div>
            <div class="answers">
                <button class="true" @click="answerQuestion(index, true)" :disabled="answered[index]">True</button>
                <button class="false" @click="answerQuestion(index, false)" :disabled="answered[index]">False</button>
            </div>

        <p v-if="showAnswers && answered[index]">
            Your answer: {{ userAnswers[index] ? 'True' : 'False'}}
            <br>
            Correct answer: {{ question.correct_answer }}
        </p>
        </div>
        <button id="submit-button"  @click="submitQuiz" :disabled="quizSubmitted">Finish Quiz</button>

        <p v-if="showAnswers">Your score: {{ score }} / {{ questions.length }}</p>
    </div>
</template>

<script>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
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

        const quizSubmitted = ref(false)
        const storedQuizResult = ref(null)

        const quizName = ref("")
        const editedQuizName = ref("")
        const isEditing = ref(false)

        const answered = ref(new Array(props.questions.length).fill(false))
        const userAnswers = ref(new Array(props.questions.length).fill(null))
        const showAnswers = ref(false)
        const score = ref(0)
        const correctAnswers = ref(0)
        const incorrectAnswers = ref(0)
        const category = ref("")
        const difficulty = ref("")
        const scorePercent = ref(0)

        const inputField = ref(null)

        const startTime = ref(0)
        const currentTime = ref(0)
        const totalTime = ref(0)
        let timeInterval = null

        const formattedTime = computed(() => {
            const minutes = Math.floor(totalTime.value / 60)
            const seconds = totalTime.value % 60
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
        })

        const totalTimeFormatted = computed(() => {
            const minutes = Math.floor(totalTime.value / 60)
            const seconds = totalTime.value % 60
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
        })

        const calculateTotalTime = () => {
            totalTime.value = Math.floor((currentTime.value - startTime.value) / 1000)
        }

        //Enables editing of the quiz title and updates it unless clicked off
        const enableEditing = () => {
            isEditing.value = true
            editedQuizName.value = quizName.value
            nextTick(() => {
                inputField.value?.focus()
            })
        }

        const disableEditing = () => {
            isEditing.value = false
            quizName.value = editedQuizName.value || "Quiz"

            if (storedQuizResult.value) {
            storedQuizResult.value.quizName = quizName.value;
            }
        }

        //Updates the answered array and marks unanswered questions answered
        const answerQuestion = (index, answer) => {
            userAnswers.value[index] = answer
            answered.value[index] = true
        }

        //Checks if all questions have been answered
        const allAnswered = computed(() =>
            answered.value.every(answer => answer === true)
        )


        //Submits quiz answers and sends the information to the QuizResults store
        const submitQuiz = () => {
            if (quizSubmitted.value) return
            quizSubmitted.value = true


            showAnswers.value = true
            score.value = 0
            correctAnswers.value = 0
            incorrectAnswers.value = 0
            quizName.value = editedQuizName.value || "Quiz"
            calculateTotalTime()

            clearInterval(timeInterval)



            questions.forEach((question, index) => {
                const correctAnswer = question.correct_answer === 'True'
                if (userAnswers.value[index] === correctAnswer) {
                    score.value++;
                    correctAnswers.value++;
                } else {
                    incorrectAnswers.value++
                }
            })

            scorePercent.value = Math.round((score.value / questions.length) * 100)


            quizStore.UpdateAnswers(correctAnswers.value, incorrectAnswers.value);

             storedQuizResult.value = {
                score: score.value,
                correct: correctAnswers.value,
                incorrect: incorrectAnswers.value,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                quizName: quizName.value,
                outOf: questions.length,
                totalTime: totalTimeFormatted.value,
                category: category.value,
                difficulty: quizStore.difficulty,
                scorePercent: scorePercent.value,
            }

            quizStore.addResult(storedQuizResult.value)
        }

        onMounted(() => {
            startTime.value = new Date().getTime()
            timeInterval = setInterval(() => {
                currentTime.value = new Date().getTime()
                calculateTotalTime()
            }, 1000)
        })

        onBeforeUnmount(() => {
            clearInterval(timeInterval)
        })

        return {
            quizName,
            editedQuizName,
            isEditing,
            enableEditing,
            answered,
            userAnswers,
            showAnswers,
            allAnswered,
            score,
            submitQuiz,
            answerQuestion,
            inputField,
            disableEditing,
            formattedTime,
            totalTimeFormatted,
            quizSubmitted,
            scorePercent,
        }
    },
}

</script>

<style scoped>
.quiz {
    gap: 20px;
    margin-bottom: 20px;
    margin-top: 10px;
    padding: 20px;
    border: 1px solid #00008B;
}

.quiz-title {
}
.quizTimer {
    padding-top: 10px;
    padding-inline: 5px;
    width: 17%;
    text-align: center;
    font-size: 18px;
    border: 1px solid #00008B;
    background-color:rgb(198, 204, 206);
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

@media (max-width: 768px) {
    .question-box {
        flex-direction: column;
    }
    .answers {
        flex-direction: column;
    }
}
</style>
