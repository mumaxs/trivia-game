<template>
  <div class="container" id="resultContainer">
    <table class="table">
      <thead>
        <th>Question</th>
        <th>Correct answer</th>
        <th>Your Answer</th>
      </thead>
      <tbody v-for="counter in this.gameQuestions.length" :key="counter.index">
        <tr>
          <td>{{ getQuestion(counter - 1) }}</td>
          <td>{{ getCorrectAnswer(counter - 1) }}</td>
          <td v-if="correctAnswer(counter - 1)">
            {{ getPlayerAnswer(counter - 1) }}
          </td>
          <td v-if="!correctAnswer(counter - 1)">
            {{ getPlayerAnswer(counter - 1) }}
          </td>
          <td>Score: {{ getPlayerQuestionPoints(counter - 1) }}</td>
        </tr>
      </tbody>
    </table>

    <div class="results">
      <h2>Your total score from the quiz: {{ this.playerTotalScore }}</h2>
    </div>
    <div class="resultButtons">
      <span
        ><button class="btn btn-primary" @click="playAgain()">
          Play again
        </button></span
      >
      <span
        ><button class="btn btn-primary" @click="renderStartScreen()">
          Start screen
        </button></span
      >
    </div>
  </div>
</template>

<script>
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
  beforeEnter(){
    if (this.gameUrlApi === undefined) {
      this.$router.push('/');
    }
  },
  /**
   * Calculate the player score and also sets indivitual points for each question.
   */
  created() {
    if (this.playerAnswers === undefined) {
      this.$router.push('/');
    }else{
    //this.gameQuestions = getStorage("encodeQuestions")
        for (let i = 0; i < this.correctAnswers.length; i++) {
          if (this.playerAnswers[i] === this.correctAnswers[i]) {
            this.playerTotalScore += 10;
            this.playerQuestionPoints[i]=10;
          }else{
              this.playerQuestionPoints[i]=0;
          }
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
    getPlayerAnswer(index) {
      return this.playerAnswers[index];
    },
    correctAnswer(index){
        if(this.playerAnswers[index]===this.correctAnswers[index]){
            return true;
        }else{
            return false;
        }
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
  display: grid;
}
table {
  border-collapse: separate;
  border-spacing: 1.5rem;
}
tr {
  font-size: 1rem;
  margin-bottom: 10px;
}
td {
  padding: 25px;
}
.resultButtons {
  margin: 10px;
}
span + span {
  margin-left: 2.5rem;
}
</style>