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
     * Method for start Game Button. Get all vaules in select and input fields and build a API url for the game.
     * Passes the created URL to QuestionsScreen compontent.
     */
    setGameUrl() {
      if (this.numberOfQuestions <= 0 || this.numberOfQuestions > 50) {
          alert("Enter a number between 1-50");
      }else{
        //get selected category id
        for (let i = 0; i < this.categories.trivia_categories.length; i++) {
          if (
            this.categories.trivia_categories[i].name === this.chosenCategory
          ) {
            this.categoryId = this.categories.trivia_categories[i].id;
          }
        }
        //get selected difficulty id
        for (let i = 0; i < this.difficulties.length; i++) {
          if (this.difficulties[i].name === this.chosenDifficulty) {
            this.difficultyId = this.difficulties[i].id;
          }
        }
        //get selected gamestyle id
        for (let i = 0; i < this.games.length; i++) {
          if (this.games[i].name === this.chosenGameStyle) {
            this.gameTypeId = this.games[i].id;
          }
        }
        //set game api url
        this.startGameUrl =
          "https://opentdb.com/api.php?amount=" +
          this.numberOfQuestions +
          "&category=" +
          this.categoryId +
          "&difficulty=" +
          this.difficultyId +
          "&type=" +
          this.gameTypeId;
        //console.log(this.startGameUrl);

        //render QuestionsScreen
        this.$router.push({
          name: "questions",
          params: {
            gameUrl: this.startGameUrl,
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