<template>
  <div>
    <!--         <p v-for="answer in playerAnswers" :key="answer.index">{{answer}}</p>
        <p v-for="correct in correctAnswer" :key="correct.index">{{correct}}</p>
        <p v-for="question in gameQuestions" :key="question.index">{{question}}</p>
        <p v-for="answerOrder in answerInOrder" :key="answerOrder.index">{{answerOrder}}</p> -->

        <div v-for="counter in this.gameQuestions.length" :key="counter.index">
            <p>Question {{counter}}: {{getQuestion(counter-1)}}</p>
            <p>Correct answer: {{getCorrectAnswer(counter-1)}}</p>
            <p>Your answer: {{getPlayerAwnser(counter-1)}}</p>

        </div>

        <p>Score: {{playerPoints}}</p>
  </div>
</template>

<script>
export default {
  name: "ResultsScreen",
  props: ["playerAnswers", "correctAnswers", "gameQuestions", "answersInOrder"],
  data() {
    return {
      playerPoints: null,
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