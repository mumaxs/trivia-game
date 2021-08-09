<template>
  <div id="app">
    <HelloWorld msg="Welcome SIR"/>
    <StartScreen/>
    <QuestionScreen/>
    <ResultsScreen/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import StartScreen from './components/StartScreen.vue'
import QuestionScreen from './components/QuestionScreen.vue'
import ResultsScreen from './components/ResultsScreen.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    StartScreen,
    QuestionScreen,
    ResultsScreen
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
