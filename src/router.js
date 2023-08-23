import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import CreateAcc from "./components/CreateAcc.vue";
import Withdraw from "./components/Withdraw.vue";
// lazy-loaded
const Profile = () => import("./components/Profile.vue")


const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  }, 
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/create",
    name: "create",
    component: CreateAcc,
  },
  {
    path: "/withdraw",
    name: "withdraw",
    component: Withdraw,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;