import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Polls from '../views/Polls'
import NewPoll from '../views/NewPoll'
import Poll from '../views/Poll'
import Delete from '../views/Delete'

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
  },
  {
    path: '/vote-poll/:id',
    name: 'Poll',
    component: Poll
  },
  {
    path: '/delete/:id',
    name: 'Delete',
    component: Delete
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

export default router
