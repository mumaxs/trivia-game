<template>
  <div>
    <!--         <p v-for="answer in playerAnswers" :key="answer.index">{{answer}}</p>
        <p v-for="correct in correctAnswer" :key="correct.index">{{correct}}</p>
        <p v-for="question in gameQuestions" :key="question.index">{{question}}</p>
        <p v-for="answerOrder in answerInOrder" :key="answerOrder.index">{{answerOrder}}</p> -->

        <div v-for="question in this.gameQuestions.length" :key="question.index">
            <p>Question {{counter+1}}: {{getQuestion(counter)}}</p>
            <p>Correct answer: {{getCorrectAnswer(counter)}}</p>
            <p>Your answer: {{getPlayerAwnser(counter)}}</p>

        </div>

        <p>{{playerPoints}}</p>
  </div>
</template>

<script>
export default {
  name: "ResultsScreen",
  props: ["playerAnswers", "correctAnswers", "gameQuestions", "answersInOrder"],
  data() {
    return {
      playerPoints: null,
      counter: 0,
    };
  },
  created() {
    for (let i = 0; i < this.correctAnswers.length; i++) {
      if (this.playerAnswers[i] === this.correctAnswers[i]) {
        this.playerPoints += 10;
      }
    }
  },
  methods: {
      getQuestion(index) {
          this.counter++;
          return this.gameQuestions[index];
      },
      getCorrectAnswer(index){
          return this.correctAnswers[index];
      },
      getPlayerAwnser(index) {
          return this.playerAnswers[index];
      }
  },
};
</script>

<style>
</style>