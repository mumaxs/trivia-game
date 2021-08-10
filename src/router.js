import Vue from 'vue'
import VueRouter from 'vue-router'
import StartScreen from './components/StartScreen.vue'
import QuestionScreen from './components/QuestionScreen.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'startscreen',
        component: StartScreen
    },
    {
        path: '/questionscreen',
        name: 'questionscreen',
        component: QuestionScreen
    },

    /*{
        path: '/questionscreen',
        name: 'questionscreen',
        component: QuestionScreen
    }*/
]

const router = new VueRouter({ routes });

export default router;