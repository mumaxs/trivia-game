<template>
  <div class="container" id="questionContainer">
    <div v-if="gameData">
      <h3>{{ getQuestion(index) }}</h3>
      <div>
        <div class="row">
          <div
            class="btn-group"
            v-for="answer in getAnswers(index)"
            :key="answer.index"
          >
            <button
              id="buttons"
              class="btn btn-secondary"
              @click="setAnswer(answer)"
            >
              {{ answer }}
            </button>
          </div>
        </div>
      </div>

      <p v-if="this.index != this.gameQuestions.length - 1">
        <button class="btn btn-primary" @click="nextQuestion()">
          Next question
        </button>
      </p>
      <p v-if="this.index === this.gameQuestions.length - 1">
        <button class="btn btn-success" @click="submitAnswers()">
          Submit score
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import { decode } from "html-entities"; //import library to decode html enteties.
export default {
  name: "QuestionScreen",
  props: ["gameUrl"],
  data() {
    return {
      gameData: null,
      gameQuestions: [],
      gameWrongAnswers: [],
      gameRightAnswer: [],
      gameCategory: [],
      gameType: [],
      gameDifficulty: [],
      playerAnswers: [],
      answerOrderForResults: [],
      index: 0,
    };
  },
  /**
   * Fetched the jsonfile with game data with the passed game api url from startscreen component.
   */
  async created() {
      if (this.gameUrl === undefined) {
          this.$router.push('/')
      }
    try {
      const response = await fetch(this.gameUrl);
      const gameJson = await response.json();
      this.gameData = gameJson;

      this.setArrays(); // put the data into corresponing array.
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    /**
     * Seperate the data that are fetched in different arrays.
     */
    setArrays() {
      this.gameData.results.forEach((x) => {
        let question = x.question;
        this.gameQuestions.push(decode(question));

        let incorrectAnswers = x.incorrect_answers;
        this.gameWrongAnswers.push(incorrectAnswers);

        let correctAnswer = x.correct_answer;
        this.gameRightAnswer.push(decode(correctAnswer));

        let cate = x.category;
        this.gameCategory.push(decode(cate));

        let difficulty = x.difficulty;
        this.gameDifficulty.push(difficulty);

        let gType = x.type;
        this.gameType.push(gType);
      });
    },
    getQuestion(index) {
      return this.gameQuestions[index];
    },
    /**
     * Puts the wrong answers and the right answer in a array and then shuffel that array so the answers have different positions.
     */
    getAnswers(index) {
      let temp = [];
      for (let i = 0; i < this.gameWrongAnswers[index].length; i++) {
        temp.push(decode(this.gameWrongAnswers[index][i]));
      }
      temp.push(decode(this.gameRightAnswer[index]));
      temp = this.shuffle(temp); //shuffle the array
      return temp;
    },
    /**
     * Shuffle the answers in a array.
     */
    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = temp;
      }
      this.answerOrderForResults.push(array);
      return array;
    },
    /**
     * Sets the players answer for a speficit question.
     */
    setAnswer(answer) {
      this.playerAnswers[this.index] = answer;
      this.playerAnswers.forEach((element) => {
        console.log(element);
      });
    },
    /**
     * Are called when next question button are clicked. The index helps to iterate in setAnswer() array.
     */
    nextQuestion() {
      if (!this.playerAnswers[this.index]) {
        alert("Choose an answer!");
      } else {
        this.index++;
      }
    },
    /**
     * Called when submit answers are clicked. Passes the playerAnswers, correctAnswers, gameQuestions to be able to show the results and score.
     * Also passes the game API url so that the player can choose to play with the same settings again.
     */
    submitAnswers() {
      if (!this.playerAnswers[this.index]) {
        alert("Choose an answer!");
      } else {
        this.$router.push({
          name: "results",
          params: {
            playerAnswers: this.playerAnswers,
            correctAnswers: this.gameRightAnswer,
            gameQuestions: this.gameQuestions,
            answersInOrder: this.answerOrderForResults,
            gameUrlApi: this.gameUrl,
          },
        });
      }
    },
  },
};
</script>
<style>
#buttons {
  padding: 1rem;
  border-radius: 10px;
  border-width: 10px;
  border-color: #1e2881;
  border-style: solid;
  align-items: center;
  margin: 20px;
  box-shadow: 0px 3px 0px #e2bc213a;
  font-size: 1.5rem;
}
#buttons:hover {
  background: #00eeee;
  color: #fff;
}
#buttons:focus {
  background: #00eeee;
  position: sticky;
}
h3 {
  font-size: 16pt;
  color: teal;
}
#questionContainer {
  display: block;
  max-width: 35%;
  max-height: 65%;
  cursor: pointer;
  margin-top: 10rem;
}
.questionBox {
  height: 20vh;
}
</style>