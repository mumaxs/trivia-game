<template>
  <div class="container">
    <div v-for="counter in this.gameQuestions.length" :key="counter.index">
      <table class="table">
        <thead>
          <th>Question</th>
          <th>Your answer</th>
          <th>Correct Answer</th>
        </thead>
        <tbody>
          <tr>
            <td>Question {{ counter }}: {{ getQuestion(counter - 1) }}</td>
            <td>Correct answer: {{ getCorrectAnswer(counter - 1) }}</td>
            <td>Your answer: {{ getPlayerAwnser(counter - 1) }}</td>
            <td>Score: {{ playerPoints }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="resultButtons">
      <button class="btn btn-primary" @click="playAgain()">Play again</button>
      <button class="btn btn-primary" @click="renderStartScreen()">Start screen</button>
    </div>

    <!--<div v-for="counter in this.gameQuestions.length" :key="counter.index">
      <p>Question {{ counter }}: {{ getQuestion(counter - 1) }}</p>
      <p>Correct answer: {{ getCorrectAnswer(counter - 1) }}</p>
      <p>Your answer: {{ getPlayerAwnser(counter - 1) }}</p>
    </div>
    <ul>
      <li v-for="question of this.gameQuestions" :key="question">{{ question }}</li>
    </ul>-->
  </div>
</template>

<script>
//import { getStorage } from '../utils/storage'

export default {
  name: "ResultsScreen",
  props: [
    "playerAnswers",
    "correctAnswers",
    "gameQuestions",
    "answersInOrder",
    "gameUrlApi",
  ],
  data() {
    return {
      playerPoints: 0,
      encodedQuestions: [],
    };
  },
  created() {
    //this.gameQuestions = getStorage("encodeQuestions")
    for (let i = 0; i < this.correctAnswers.length; i++) {
      if (this.playerAnswers[i] === this.correctAnswers[i]) {
        this.playerPoints += 10;
      }
    }
    console.log(this.gameUrlApi);
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
        name: "startscreen",
      });
    },
    playAgain() {
      console.log(this.gameUrlApi);
      this.$router.push({
        name: "questions",
        params: {
          gameUrl: this.gameUrlApi,
        },
      });
    },
  },
};
</script>

<style>
</style>