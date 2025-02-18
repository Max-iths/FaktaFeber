<template>
<h2 id="results-heading">Results</h2>
<div class="results-container">
  <div v-for="(result, index) in results" :key="index" class="results-card">
    <h3>Quiz</h3>
    <div class="results-info">
    <p><strong>Date : </strong>{{ result.date }}</p>
    <p><strong>Time:</strong> {{ result.time }}</p>
    <p><strong>Correct:</strong> {{ result.correct }}</p>
    <p><strong>Incorrect:</strong> {{ result.incorrect }}</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ResultsCard',
  props: {
    results: Array,
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
</style>
