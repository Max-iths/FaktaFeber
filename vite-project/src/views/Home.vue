<template>
    <div class="Welcome">
        <h1>Welcome to FactFever</h1>
        <p>Choose number of questions, category, and difficulty below to produce your own quiz! Check out your results on the results page.</p>

    </div>
    <QuizForm @start-quiz="fetchQuestions" />
    <QuizDisplay v-if="questions.length" :questions="questions" />
</template>

<script>
import { ref } from 'vue'
import QuizForm from '../components/QuizForm.vue'
import QuizDisplay from '../components/QuizDisplay.vue'
import axios from 'axios'

export default {
    name: 'Home',
    components: {
        QuizForm,
        QuizDisplay
    },
    setup() {
        const questions = ref([])

        //Fetches questions from the API
        const fetchQuestions = ({ category, numQuestions, difficulty }) => {

        const ifCategory = category ? category : '';
          const url = `https://opentdb.com/api.php?amount=${numQuestions}&category=${ifCategory}&difficulty=${difficulty}&type=boolean`

            axios
                .get(url)
                .then((response) => {
                    questions.value = response.data.results
                })
                .catch((error) => {
                    console.error(error)
                })
        }

        return {
            questions, fetchQuestions
        }
    }
}
</script>

<style scoped>

.Welcome {
    text-align: center;
    margin: 20px;
}
</style>
