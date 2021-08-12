<template>
  <div class="container">
    <h2>Question Screen</h2>
    <div v-if="gameData">
      <p>{{ getQuestion(index) }}</p>

      <div>
        <div class="btn-group" role="group">
          <div class="options row">
            <div
              class="col questionBox"
              v-for="answer in getAnswers(index)"
              :key="answer.index"
            >
              <button id="buttons" class="btn btn-secondary" @click="setAnswer(answer)">
                {{ answer }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <p v-if="this.index != this.gameQuestions.length - 1">
        <button class="btn btn-primary" @click="nextQuestion()">Next question</button>
      </p>
      <p v-if="this.index === this.gameQuestions.length - 1">
        <button class="btn btn-success" @click="submitAnswers()">Submit score</button>
      </p>
    </div>
  </div>
</template>

<script>
import { setStorage } from "../utils/storage";
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
  async created() {
    try {
      const response = await fetch(this.gameUrl);
      const gameJson = await response.json();
      this.gameData = gameJson;

      this.setArrays();
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    setArrays() {
      this.gameData.results.forEach((x) => {
        let q = x.question;
        this.gameQuestions.push(q);

        let ia = x.incorrect_answers;
        this.gameWrongAnswers.push(ia);

        let ca = x.correct_answer;
        this.gameRightAnswer.push(ca);

        let c = x.category;
        this.gameCategory.push(c);

        let d = x.difficulty;
        this.gameDifficulty.push(d);

        let t = x.type;
        this.gameType.push(t);
      });
    },
    encodeString(string) {
      var temp = string.replaceAll("&quot;", "");
      temp = temp.replaceAll("&#039;", "");
      temp = temp.replaceAll("&aacute;", "");
      temp = temp.replaceAll("amp;", "");
      temp = temp.replaceAll("&rsquo;", "");
      temp = temp.replaceAll("&iacute;", "");
      return temp;
    },
    getQuestion(index) {
      let temp = [];
      temp.push(this.encodeString(this.gameQuestions[index]));
      //let questions = this.encodeString(this.gameQuestions[index])
      setStorage("encodedQuestions", temp);
      return temp;
    },
    getAnswers(index) {
      let temp = [];
      for (let i = 0; i < this.gameWrongAnswers[index].length; i++) {
        temp.push(this.encodeString(this.gameWrongAnswers[index][i]));
      }
      temp.push(this.encodeString(this.gameRightAnswer[index]));
      temp = this.shuffle(temp);
      return temp;
    },
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
    setAnswer(answer) {
      this.playerAnswers[this.index] = answer;
      this.playerAnswers.forEach((element) => {
        console.log(element);
      });
    },
    nextQuestion() {
      this.index++;
    },
    submitAnswers() {
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
    },
  },
};
</script>
<style>
#buttons {
  padding: 2rem;
  border-radius: 10px;
  border-width: 10px;
  border-color: #4e6392;
}
.h2 {
  font-size: 4rem;
}

.questionBox {
  height: 20vh;
}
</style>