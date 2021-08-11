import Vue from 'vue'
import VueRouter from 'vue-router'
import StartScreen from './components/StartScreen.vue'
import QuestionScreen from './components/QuestionScreen.vue'
import ResultsScreen from './components/ResultsScreen.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'startscreen',
        component: StartScreen
    },
    {
        path: '/questions',
        name: 'questions',
        component: QuestionScreen,
        props: true
    },

    {
        path: '/results',
        name: 'results',
        component: ResultsScreen,
        props: true
    }
]

const router = new VueRouter({ routes });

export default router;