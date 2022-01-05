import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Polls from '../views/Polls'
import NewPoll from '../views/NewPoll'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/polls',
    name: 'Polls',
    component: Polls
  },
  {
    path: '/newpoll',
    name: 'New Poll',
    component: NewPoll
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

export default router
