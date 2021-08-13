<template>
  <div class="container" id="mainContainer">
    <div id="form-div">
      <form>
        <input
          name="nrOfQ"
          class="form-control"
          v-model="numberOfQuestions"
          id="questions"
          type="number"
          placeholder="Number of questions"
          required
        />

        <select class="form-select" v-model="chosenCategory">
          <option value="" disabled selected>Choose Category</option>
          <option
            v-for="category in this.categories.trivia_categories"
            v-bind:key="category.id"
          >
            {{ category.name }}
          </option>
        </select>

        <select class="form-select" v-model="chosenDifficulty">
          <option value="" disabled selected>Choose Difficulty</option>
          <option v-for="difficulty in this.difficulties" :key="difficulty.id">
            {{ difficulty.name }}
          </option>
        </select>

        <select class="form-select" v-model="chosenGameStyle">
          <option value="" disabled selected>Choose Game</option>
          <option v-for="game in this.games" :key="game.id">
            {{ game.name }}
          </option>
        </select>

        <div id="buttonDiv">
          <button type="button" class="btn btn-primary" @click="setGameUrl()">
            Start Game
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { decode } from "html-entities"; //import library to decode html enteties.
export default {
  name: "StartScreen",
  data() {
    return {
      categories: [],
      numberOfQuestions: "",
      chosenCategory: "",
      chosenDifficulty: "",
      chosenGameStyle: "",
      categoryId: "",
      difficultyId: "",
      gameTypeId: "",
      startGameUrl: "",
      games: [
        { id: "multiple", name: "Multipy Answer" },
        { id: "boolean", name: "True or False" },
      ],
      difficulties: [
        { id: "easy", name: "Easy" },
        { id: "medium", name: "Medium" },
        { id: "hard", name: "Hard" },
      ],
    };
  },
  /**
   * Async created() that runs when when component is loaded.
   * Fetched the different categories that a player can choose between.
   */
  async created() {
    try {
      const response = await fetch("https://opentdb.com/api_category.php");
      const categoryJson = await response.json();
      this.categories = categoryJson;
    } catch (error) {
      console.error(error);
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
#row2 {
  margin-top: 50px;
}
#buttonDiv {
  margin-top: 30px;
}
#mainContainer {
  display: grid;
  max-width: 35%;
  max-height: 65%;
  margin-top: 10rem;
  display: block;
  margin-bottom: 10px;
}
.form-select {
  margin-top: 30px;
  display: flex;
  /*background-color: #1e2881;
  color: white;*/
}
</style>