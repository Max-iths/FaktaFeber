<template>

  <ResultsCard :results="results" />
</template>

<script>
import ResultsCard from '../components/ResultsCard.vue';
import { useQuizResultsStore } from '../stores/QuizResults'

export default {
  name: 'Results',
  components: {
    ResultsCard,
  },
  setup() {
    const quizStore = useQuizResultsStore()
    const results = quizStore.results

    return {
      results,
    }
  },
};
</script>
