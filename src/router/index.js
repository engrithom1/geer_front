import { createRouter, createWebHistory } from "vue-router";
import * as CryptoJS from 'crypto-js';

var user_cry = localStorage.getItem("user")  || "";
var user = CryptoJS.AES.decrypt(user_cry, 'user').toString(CryptoJS.enc.Utf8) || null
user = JSON.parse(user)

function authAdmin(){
  if(user){
    //user = JSON.parse(user)
    if(user.roles_id == 3){
      return true
    }else{
      return {name:'NotParmit'}
    }
  }else{
    return {name:'Dashbord'}
  }
}

function authMentor(){
  if(user){
    //user = JSON.parse(user)
    if(user.roles_id == 2){
      return true
    }else{
      return {name:'NotParmit'}
    }
  }else{
    return {name:'Dashbord'}
  }
}

function authStudent(){
  if(user){
    
    if(user.roles_id == 1){
      return true
    }else{
      return {name:'NotParmit'}
    }
  }else{
    return {name:'Dashbord'}
  }
}

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
import MStudent from "../views/account/MStudents.vue";
import AllStudents from "../views/account/AllStudents.vue";
import TestPanel from "../views/account/TestPanel.vue";
import STestResult from "../views/account/STestResult.vue";
import Materials from "../views/account/Materials.vue";
/////Dashbord pageeeeee
import Home from "../views/dashbord/Home.vue";
import Forums from "../views/dashbord/Forums.vue";
import MyModules from "../views/dashbord/MyModules.vue";
import STest from "../views/dashbord/STest.vue";
import TestResult from "../views/dashbord/TestResult.vue";
import Recruitment from "../views/dashbord/Recruitment.vue";
import TrushedStudents from "../views/dashbord/TrushedStudents.vue";
import AllMentors from "../views/dashbord/AllMentor.vue";
import SMentors from "../views/dashbord/SMentors.vue";
import Material from "../views/dashbord/Materials.vue";
import Chats from "../views/dashbord/Chats.vue";
///pages
import ForumPost from "../views/pages/ForumPost.vue";
import VideoCourse from "../views/pages/VideoCourse.vue";
import AudioCourse from "../views/pages/AudioCourse.vue";
import NoteCourse from "../views/pages/NotesCourse.vue";
import ModuleCourses from "../views/pages/ModuleCourses.vue";
///fail page
import NotFound from '../views/404.vue'
import NotParmit from '../views/500.vue'
///FEEDBACK MAN
import MEvaluation from "../views/account/MEvaluation.vue";
import PEvaluation from "../views/account/PEvaluation.vue";
import KPI_Job from "../views/account/KPI_jobreadiness.vue";
import KPI_Enter from "../views/account/KPI_entrepreneur.vue";
import KPI_Both from "../views/account/KPI_both.vue";


const routes = [
  {
    path: "/permission-denied",
    name: "NotParmit",
    component: NotParmit,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
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
        path:'/materials',
        name:Material,
        component:Material
      },
      {
        path:'/chats',
        name:Chats,
        component:Chats
      },
      {
        path:'/recruitments',
        beforeEnter:authAdmin,
        name:'recruitment',
        component:Recruitment
      },
      {
        path:'/trushed-students',
        beforeEnter:authAdmin,
        name:'trushed-students',
        component:TrushedStudents
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
      },
      {
        path:'/all-mentors',
        beforeEnter:authAdmin,
        name:AllMentors,
        component:AllMentors
      },
      {
        path:'/student-mentors',
        beforeEnter:authStudent,
        name:SMentors,
        component:SMentors
      }
      ,
      {
        path:'/module-test',
        beforeEnter:authStudent,
        name:STest,
        component:STest
      }
      ,
      {
        path:'/test-result',
        beforeEnter:authAdmin,
        name:TestResult,
        component:TestResult
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
        beforeEnter:authAdmin,
        name:News,
        component:News
      },
      {
        path:'/account/modules',
        beforeEnter:authAdmin,
        name:Modules,
        component:Modules
      },
      {
        path:'/account/videos',
        beforeEnter:authAdmin,
        name:Videos,
        component:Videos
      },
      {
        path:'/account/audios',
        beforeEnter:authAdmin,
        name:Audios,
        component:Audios
      },
      {
        path:'/account/books',
        beforeEnter:authAdmin,
        name:Books,
        component:Books
      },
      {
        path:'/account/discussions',
        beforeEnter:authAdmin,
        name:Discussions,
        component:Discussions
      },
      {
        path:'/account/materials',
        beforeEnter:authAdmin,
        name:Materials,
        component:Materials
      },
      {
        path:'/account/mentor-students',
        beforeEnter:authMentor,
        name:MStudent,
        component:MStudent
      },
      {
        path:'/account/mentor-feedback',
        beforeEnter:authMentor,
        name:MEvaluation,
        component:MEvaluation
      },
      {
        path:'/account/kpi-jobreadiness',
        beforeEnter:authStudent,
        name:KPI_Job,
        component:KPI_Job
      },
      {
        path:'/account/kpi-jobreadiness-entrepreneurship',
        beforeEnter:authStudent,
        name:KPI_Both,
        component:KPI_Both
      },
      {
        path:'/account/kpi-entrepreneurship',
        beforeEnter:authStudent,
        name:KPI_Enter,
        component:KPI_Enter
      },
      {
        path:'/account/student-feedback',
        beforeEnter:authStudent,
        name:PEvaluation,
        component:PEvaluation
      },
      {
        path:'/account/all-students',
        beforeEnter:authAdmin,
        name:AllStudents,
        component:AllStudents
      },
      {
        path:'/account/test-panel',
        beforeEnter:authAdmin,
        name:TestPanel,
        component:TestPanel
      }
      ,
      {
        path:'/account/test-result',
        beforeEnter:authAdmin,
        name:STestResult,
        component:STestResult
      }
    ]
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


export default router;
