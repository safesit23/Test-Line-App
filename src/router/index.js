import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/index.vue";
//Staff
import Staff from "../views/staff.vue";
import StaffRegister from "../components/Staff/register.vue";
import StaffJoin from "../components/Staff/join.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Index
  },
  {
    path: "/staff",
    name: "Staff",
    component: Staff,
    children: [
      {
        path: "join",
        name: "StaffJoin",
        component: StaffJoin
      },
      {
        path: "register",
        name: "StaffRegister",
        component: StaffRegister
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
