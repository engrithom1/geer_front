import { createRouter, createWebHistory } from "vue-router";
import Dashbord from "../views/Dashbord.vue";
///accounts
import Profile from "../views/Profile.vue";
import Account from "../views/account/Account.vue";
import News from "../views/account/News.vue";
import Modules from "../views/account/Modules.vue";
import Books from "../views/account/Books.vue";
import Audios from "../views/account/Audios.vue";
import Videos from "../views/account/Videos.vue";
import Discussions from "../views/account/Discussions.vue";
import AllMentors from "../views/account/AllMentors.vue";
import Mentors from "../views/account/Mentors.vue";
import AllStudents from "../views/account/AllStudents.vue";
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
    path: "/account",
    name: "Profile",
    component: Profile,
    redirect:"/account",
    children:[
      {
        path:'/account',
        name:Account,
        component:Account
      },
      {
        path:'/account/news',
        name:News,
        component:News
      },
      {
        path:'/account/modules',
        name:Modules,
        component:Modules
      },
      {
        path:'/account/videos',
        name:Videos,
        component:Videos
      },
      {
        path:'/account/audios',
        name:Audios,
        component:Audios
      },
      {
        path:'/account/books',
        name:Books,
        component:Books
      },
      {
        path:'/account/discussions',
        name:Discussions,
        component:Discussions
      },
      {
        path:'/account/all-mentors',
        name:AllMentors,
        component:AllMentors
      },
      {
        path:'/account/mentors',
        name:Mentors,
        component:Mentors
      },
      {
        path:'/account/all-students',
        name:AllStudents,
        component:AllStudents
      }
    ]
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
