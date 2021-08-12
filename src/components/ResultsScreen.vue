<template>
  <div>
    <div v-for="counter in this.gameQuestions.length" :key="counter.index">
      <p>Question {{ counter }}: {{ getQuestion(counter - 1) }}</p>
      <p>Correct answer: {{ getCorrectAnswer(counter - 1) }}</p>
      <p>Your answer: {{ getPlayerAwnser(counter - 1) }}</p>
    </div>

    <p>Score: {{ playerPoints }}</p>
    <button @click="playAgain()">Play again</button>
    <button @click="renderStartScreen()">Start screen</button>
  </div>
</template>

<script>
export default {
  name: "ResultsScreen",
  props: ["playerAnswers", "correctAnswers", "gameQuestions", "answersInOrder", "gameUrlApi"],
  data() {
    return {
      playerPoints: 0,
    };
  },
  created() {
    for (let i = 0; i < this.correctAnswers.length; i++) {
      if (this.playerAnswers[i] === this.correctAnswers[i]) {
        this.playerPoints += 10;
      }
    }
    console.log(this.gameUrlApi)
  },
  methods: {
    getQuestion(index) {
      return this.gameQuestions[index];
    },
    getCorrectAnswer(index) {
      return this.correctAnswers[index];
    },
    getPlayerAwnser(index) {
      return this.playerAnswers[index];
    },
    renderStartScreen() {
        this.$router.push({
            name: 'startscreen'
        });
    },
    playAgain() {
        console.log(this.gameUrlApi)
        this.$router.push({
            name: 'questions',
            params: {
                gameUrl: this.gameUrlApi,
            }
        });
    },
  },
};
</script>

<style>
</style>