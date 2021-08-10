<template>
  <div>
    <input class="number-of-questions" id="questions" type="text" required />

    <select class="choose-category">
      <option selected>Choose Category</option>
      <option v-for="category in this.categories.trivia_categories" :key="category.id">
        {{ category.name }}
      </option>
    </select>

    <select class="choose-game-style">
      <option selected>Choose Game</option>
      <option v-for="game in this.games" :key="game.id">{{ game.name }}</option>
    </select>

    <select class="choose-game-style">
      <option selected>Choose Difficulty</option>
      <option v-for="difficulty in this.difficulties" :key="difficulty.id">{{ difficulty.name }}</option>
    </select>

    <button @click="setGameUrl">Start Game</button>
    <button @click="fetchGame">fetch json</button>
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
      games: [
        { id: 0, name: "Multipy Awnser" },
        { id: 1, name: "True or False" },
      ],
      difficulties: [
        { id: 0, name: "Easy" },
        { id: 1, name: "Medium" },
        { id: 2, name: "Hard"}
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
    async fetchGame() {
      try {
        const response = await fetch("https://opentdb.com/api.php?amount=10");
        const gameJson = await response.json();
        console.log("before json");
        console.log(gameJson);
        console.log("after json");
      } catch (error) {
        console.error(error);
      }
    },
    createGameUrl() {
        let gameUrl = "";
    }
  },
};
</script>

