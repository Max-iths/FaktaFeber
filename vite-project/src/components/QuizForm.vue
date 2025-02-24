<template>
    <form @submit.prevent="StartQuiz" class="quizSettingsForm">
        <div>
        <label><strong>Category</strong></label>
            <select v-model="category">
                <option value="">Random</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id" >
                    {{ cat.name }}
                </option>
            </select>
        </div>
        <div>
            <label><strong>Number of questions</strong></label>
            <input type="number" v-model="numQuestions" min="1" max="15" />
        </div>
        <div>
            <label><strong>Difficulty</strong></label>
            <label>
                <input type="radio" v-model="difficulty" value="easy" />
                Easy
            </label>
            <label>
                <input type="radio" v-model="difficulty" value="medium" />
                Medium
            </label>
            <label>
                <input type="radio" v-model="difficulty" value="hard" />
                Hard
            </label>
        </div>
        <div>
            <button type="submit" :disabled="isClicked" @click="StartQuiz" id="startButton">Start Quiz</button>
        </div>
    </form>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useQuizResultsStore } from '../stores/QuizResults'


export default {
  setup(props, { emit }) {
    const numQuestions = ref(1)
    const category = ref('')
    const difficulty = ref('easy')
    const categories = ref([])
    const isClicked= ref(false)

    const quizStore = useQuizResultsStore()


    //Fetch categories from the API and send them to the QuizDisplay component
    onMounted(() => {
        axios
          .get('https://opentdb.com/api_category.php')
          .then((response) => {
              categories.value = response.data.trivia_categories
          })
          .catch((error) => {
              console.error(error)
          })
    })

    //Disables the start Quiz button
    const StartQuiz = () => {
        isClicked.value = true;


    const selectedCategory = category.value ? category.value : null;

    quizStore.setQuizSettings( category.value, difficulty.value)

        emit('start-quiz', {
            numQuestions: numQuestions.value,
            category: category.value,
            difficulty: difficulty.value,
        })

    }

    return {
        numQuestions,
        category,
        difficulty,
        categories,
        StartQuiz,
        isClicked
    }
  },
}
</script>

<style scoped>

.quizSettingsForm {
    display: flex;
    flex-direction: row;
    gap: 15px;
    justify-content: center;
    background-color: #ADD8E6;
    padding: 15px;
    flex-wrap: wrap;
}

label {
    margin-right: 10px;
}

#startButton {
    border-radius: 5px;
}

@media (max-width: 1038px) {
    .quizSettingsForm {
        flex-direction: column;
        padding-top: 30px;
        flex-wrap: wrap;
    }
    #startButton {

    }
}

</style>
