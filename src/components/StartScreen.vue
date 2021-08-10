<template>
  <div>
    <input
      name="nrOfQ"
      v-model="numberOfQuestions"
      id="questions"
      type="text"
      required
    />

    <select class="choose-category" v-model="chosenCategory">
      <option selected>Choose Category</option>
      <option
        v-for="category in this.categories.trivia_categories"
        v-bind:key="category.id"
      >
        {{ category.name }}
      </option>
    </select>

    <select class="chose-game-difficulty" v-model="chosenDifficulty">
      <option selected>Choose Difficulty</option>
      <option v-for="difficulty in this.difficulties" :key="difficulty.id">
        {{ difficulty.name }}
      </option>
    </select>

    <select class="choose-game-style" v-model="chosenGameStyle">
      <option selected>Choose Game</option>
      <option v-for="game in this.games" :key="game.id">{{ game.name }}</option>
    </select>

    <button @click="setGameUrl()">Start Game</button>
  </div>
</template>

<script>
export default {
  name: "StartScreen",
  data() {
    return {
      rootGameUrl: "https://opentdb.com/api.php?amount=",
      categoryUrl: "https://opentdb.com/api_category.php",
      categories: [],
      numberOfQuestions: "",
      chosenCategory: "",
      chosenDifficulty: "",
      chosenGameStyle: "",
      games: [
        { id: "multiple", name: "Multipy Awnser" },
        { id: "boolean", name: "True or False" },
      ],
      difficulties: [
        { id: "easy", name: "Easy" },
        { id: "medium", name: "Medium" },
        { id: "hard", name: "Hard" },
      ],
    };
  },
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
    setGameUrl() {
      /** https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=boolean */
      /** https://opentdb.com/api.php?amount=10&category=14&difficulty=medium&type=multiple */
      let quest = this.numberOfQuestions;
      console.log(quest);
      let cat = "";
      for (let i = 0; i < this.categories.trivia_categories.length; i++) {
        if (this.categories.trivia_categories[i].name === this.chosenCategory) {
          cat = this.categories.trivia_categories[i].id;
        }
      }
      console.log(cat);

      let diff = "";
      for (let i = 0; i < this.difficulties.length; i++) {
        if (this.difficulties[i].name === this.chosenDifficulty) {
          diff = this.difficulties[i].id;
        }
      }
      console.log(diff);

      let type = "";
      for (let i = 0; i < this.games.length; i++) {
        if (this.games[i].name === this.chosenGameStyle) {
          type = this.games[i].id;
        }
      }
      console.log(type);
      let str = this.rootGameUrl + quest + "&category=" + cat + "&difficulty=" + diff + "&type=" + type;
      console.log(str);
    },
  },
};
</script>

