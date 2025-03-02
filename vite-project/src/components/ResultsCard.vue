<template>
<h2 id="results-heading">Results for {{ userName }}</h2>
<div class="results-container">
  <div v-for="(result, index) in results" :key="index" class="results-card">
    <h3>{{ result.quizName || "Quiz" }}</h3>
    <div class="results-info">
      <p><strong>Date : </strong>{{ result.date }} | {{ result.time }}</p>
      <p><strong>Difficulty:</strong> {{ result.difficulty }}</p>
      <p><strong>Correct:</strong> {{ result.correct }}</p>
      <p><strong>Incorrect:</strong> {{ result.incorrect }}</p>
      <p><strong>Time: </strong> {{ result.totalTime }}</p>
      <p><strong>Score: {{ result.score }} / {{ result.outOf }}  | {{ result.scorePercent }}%</strong></p>
    </div>
  </div>
</div>
</template>

<script>
import { ref, computed } from 'vue'
import { useQuizResultsStore } from '../stores/QuizResults'
import { useRoute } from 'vue-router'

export default {
  name: 'ResultsCard',
  props: {
    results: Array,
    },
  setup() {
    const route = useRoute()

    const userName = computed(() => {
      return route.params.userName || 'Guest'
    })

    const quizStore = useQuizResultsStore()
    return { quizStore, userName }
  },
}
</script>

<style scoped>
#results-heading {
  text-align: center;
  padding: 30px;
}
.results-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row-reverse;
}

.results-card {
  padding: 20px;
  border: 1px solid #00008B;
  background-color: #ADD8E6;
  text-align: left;
}

.results-info {
  background-color:rgb(255, 255, 255);
  padding: 20px;
}

@media (max-width: 975px) {
  .results-container {
    flex-wrap: wrap;
  }
  .results-card {
    margin: 10px;
  }
}
</style>
