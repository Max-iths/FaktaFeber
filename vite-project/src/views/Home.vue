<template>
    <div class="Welcome">
        <h1>Välkommen till FaktaFeber</h1>
        <p>Välj antal frågor, kategori, och svårighetsgrad nedan för att producera din egen quiz!</p>
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

        const fetchQuestions = ({ category, numQuestions, difficulty }) => {
          const url = `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=boolean`

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
