<template>
  <div>
    <h3>hej</h3>
<!--     <select v-for="category of categories" :key="category"></select>
 -->    <button @click="fetchGame">Start Game</button>
  </div>
</template>

<script>
export default {
    name: 'StartScreen',
/*     async created() {
        const response = await fetch('https://opentdb.com/api_category.php');
        const categoryJson = await response.json();
        this.categories = categoryJson;
    }, */
    data() {
        return {
            rootGameUrl: 'https://opentdb.com/api.php?amount=',
            categoryUrl: 'https://opentdb.com/api_category.php',
            categories: []
        }
    },
    methods: {
        getGameUrl(){

        },
        startGame(){

        },
/*         async getCatergories(){
            try {
                const response = await fetch('https://opentdb.com/api_category.php');
                const categoryJson = await response.json();
                categories = categoryJson;
            } catch (error) {
                
            }
        }, */
        async fetchGame(){
            try {
                const response = await fetch('https://opentdb.com/api.php?amount=10');
                const gameJson = await response.json();
                console.log("before json");
                console.log(gameJson);
                console.log("after json");
            } catch (error) {
                console.error(error);
            }
        }
    }    
}


</script>

