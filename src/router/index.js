import { createRouter, createWebHistory } from "vue-router";
import Dashbord from "../views/Dashbord.vue";
import Profile from "../views/Profile.vue";
import Account from "../views/profile/Account.vue";
/////Dashbord pageeeeee
import Home from "../views/dashbord/Home.vue";
import Forums from "../views/dashbord/Forums.vue";
import MyModules from "../views/dashbord/MyModules.vue";
import Recruitment from "../views/dashbord/Recruitment.vue";
///pages
import ForumPost from "../views/pages/ForumPost.vue";
import VideoCourse from "../views/pages/VideoCourse.vue";
import AudioCourse from "../views/pages/AudioCourse.vue";
import NoteCourse from "../views/pages/NotesCourse.vue";
import ModuleCourses from "../views/pages/ModuleCourses.vue";

const routes = [
  {
    path: "/",
    name: "Dashbord",
    component: Dashbord,
    redirect:"/",
    children:[
      {
        path:'/',
        name:Home,
        component:Home
      },
      {
        path:'/recruitments',
        name:'recruitment',
        component:Recruitment
      },
      {
        path:'/my-modules',
        name:'mymodules',
        component:MyModules
      },
      {
        path:'/module-courses',
        name:'modulecourses',
        component:ModuleCourses,
      },
      {
        path:'/video-course',
        name:'videocourse',
        component:VideoCourse,
      },
      {
        path:'/audio-course',
        name:'audiocourse',
        component:AudioCourse,
      },
      {
        path:'/note-course',
        name:'notecourse',
        component:NoteCourse,
      },
      {
        path:'/forums',
        name:'forums',
        component:Forums
      },
      {
        path:'/forum-post',
        name:'forumpost',
        component:ForumPost
      }
    ]
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    redirect:"/profile",
    children:[
      {
        path:'/profile',
        name:Account,
        component:Account
      }
    ]
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
