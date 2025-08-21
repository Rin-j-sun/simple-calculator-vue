import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import Calculator from '../components/Calculator.vue';

const routes = [
    { path: '/', component: App },
    { path: '/calculator', component: Calculator }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;