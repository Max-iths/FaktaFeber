import { createRouter, createWebHistory } from 'vue-router'


const Home = () => import('../views/Home.vue')
const Results = () => import('../views/Results.vue')
const routes = [
    { path: '/', component: Home},
    { path: '/results', component: Results},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
