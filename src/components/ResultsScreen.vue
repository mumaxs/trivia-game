<template>
  <div class="container" id="resultContainer">
      <table class="table">
        <thead>
          <th>Question {{counter}}</th>
          <th>Correct answer </th>
          <th>Your Answer </th>
        </thead>
        <tbody v-for="counter in this.gameQuestions.length" :key="counter.index"> 
          <tr>
            <td>{{ getQuestion(counter - 1) }}</td>
            <td>{{ getCorrectAnswer(counter - 1) }}</td>
            <td>{{ getPlayerAwnser(counter - 1) }}</td>
            <td>Score: {{ getPlayerQuestionPoints(counter - 1) }}</td> 
          </tr>
        </tbody>
        
      </table>
    
    <div>Total score {{this.playerTotalScore}}</div>
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
      playerTotalScore: 0,
      encodedQuestions: [],
      playerQuestionPoints: [],
    };
  },
  /**
   * Calculate the player score and also sets indivitual points for each question.
   */
  created() {
    //this.gameQuestions = getStorage("encodeQuestions")
    for (let i = 0; i < this.correctAnswers.length; i++) {
      if (this.playerAnswers[i] === this.correctAnswers[i]) {
        this.playerTotalScore += 10;
        this.playerQuestionPoints[i]=10;
      }else{
          this.playerQuestionPoints[i]=0;
      }
    }
    console.log(this.gameUrlApi);
  },
  methods: {
    getPlayerQuestionPoints(index){
        return this.playerQuestionPoints[index];        
    },
    getQuestion(index) {
      return this.gameQuestions[index];
    },
    getCorrectAnswer(index) {
      return this.correctAnswers[index];
    },
    getPlayerAwnser(index) {
      return this.playerAnswers[index];
    },
    /**
     * Returns to start screen.
     */
    renderStartScreen() {
      this.$router.push({
        name: "startscreen",
      });
    },
    /**
     * Starts a game with the same settings as before.
     * Passes the game api url to be able to fetch new questions.
     */
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
#resultContainer {
  margin-top: 10rem;
}
</style>