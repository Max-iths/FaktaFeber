<template>
    <form @submit.prevent="StartQuiz">
        <label>Kategori</label>
        <select v-model="category">
            <option value="">Random</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
            </option>
        </select>

        <label>Antal frågor</label>
        <input type="number" v-model="numQuestions" min="1" max="50" />

        <label>Svårighetsgrad</label>
        <label>
            <input type="radio" v-model="difficulty" value="easy" />
        Lätt
        </label>
        <label>
            <input type="radio" v-model="difficulty" value="Medium" />
        Medel
        </label>
        <label>
            <input type="radio" v-model="difficulty" value="Hard" />
        Svår
        </label>

        <button type="submit">Starta Quiz</button>
    </form>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  setup(props, { emit }) {
    const numQuestions = ref(10)
    const category = ref('')
    const difficulty = ref('easy')
    const categories = ref([])

    //Fetch categories
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

    const StartQuiz = () => {
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
        StartQuiz
    }
  },
}
</script>

<style scoped>

form {
    display: flex;
    flex-direction: row;
    gap: 15px;
    margin: 10px 0;
    background-color: #ADD8E6;
    padding: 15px;
}

button {
    border-radius: 5px;}

</style>
