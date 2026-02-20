import {createStore} from 'vuex'
import axios from 'axios'
import * as CryptoJS from 'crypto-js';

export default createStore({
  state: {

    //back end local url 192.168.0.2
    api_url:"http://192.168.0.2:8000/api",
    img_url:"http://192.168.0.2:8000/storage/images/",
    pdf_url:"http://192.168.0.2:8000/storage/pdf/",
    audio_url:"http://192.168.0.2:8000/storage/audio/",

    //back end onli url
    //api_url:"https://akiliforum.com/geer_back/api",
    //img_url:"https://akiliforum.com/geer_back/back/public/storage/images/",
    //pdf_url:"https://akiliforum.com/geer_back/back/public/storage/pdf/",
    //audio_url:"https://akiliforum.com/geer_back/back/public/storage/audio/",
    ///////imedconnect
    //api_url:"https://imedconnect.or.tz/geer_back/api",
    //img_url:"https://imedconnect.or.tz/geer_back/back/public/storage/images/",
    //pdf_url:"https://imedconnect.or.tz/geer_back/back/public/storage/pdf/",
    //audio_url:"https://imedconnect.or.tz/geer_back/back/public/storage/audio/",
    
    user:{},
    errors:[],
    errorsSMS:"",
    btn_clicks:false,
    menu_dialog:false,
  },

  getters: {
  },

  mutations: {
    setStatus(state,bool){
      state.btn_clicks = bool
   },
   setMenuDialog(state){
    state.menu_dialog = !state.menu_dialog
  },
    setUser(state,user){
      state.user = user
    },
    setErrors(state,value){
        state.errors=value
    },
    setZeroErrors(state){
        state.errors = []
    },
    setErrorsSMS(state,value){
      state.errorsSMS=value
  },
  setZeroErrorsSMS(state){
      state.errorsSMS = ""
  },
  },

  actions: {
    async reloadUser({state,commit}){
      commit('setZeroErrors');
      

      let config = {
        headers: {
          'Authorization': `Bearer  ${localStorage.getItem("user_token")}`
        }
      };
      const bodyParameters = {
     };
      
      var response = await axios.post(state.api_url+'/reload', bodyParameters,config)
      .catch(errors =>{
        console.log(errors)
        //commit('setErrors',"Network or Request Errors");
        return false

     })

        if(response.data.success) {

          commit('setUser',response.data.dataz.user)
          localStorage.setItem('user',JSON.stringify(response.data.dataz.user))
          localStorage.setItem('user_token',response.data.dataz.token)
          window.location.replace('/');
          return true

        } else { 
          //commit('setErrors',response.data.message);
          return false
        }
         
  },
    async loginUser({state,commit},user){
      commit('setStatus',true)
      commit('setZeroErrors');
      commit('setZeroErrorsSMS');
      
      var response = await axios.post(state.api_url+'/login',user)
      .catch(errors =>{
        commit('setStatus',false)
        console.log(errors)
        commit('setErrorsSMS',"Network or Request Errors");

     })

        if(response.data.success) {

          commit('setUser',response.data.dataz.user)
          //localStorage.setItem('user',JSON.stringify(response.data.dataz.user))
          //localStorage.setItem('user_token',response.data.dataz.token)
          localStorage.setItem('user',CryptoJS.AES.encrypt(JSON.stringify(response.data.dataz.user), 'user').toString())
          localStorage.setItem('user_token',CryptoJS.AES.encrypt(response.data.dataz.token, 'user_token').toString())
          
          
          window.location.replace('/');

        } else { 
          commit('setStatus',false)
          commit('setErrors',response.data.errors);
          commit('setErrorsSMS',response.data.message);
          
        }
         
  },
  async registerUser({state,commit},user){
    commit('setZeroErrors');
    commit('setZeroErrorsSMS');
    commit('setStatus',true)
    
    var response = await axios.post(state.api_url+'/register',user)
    .catch(errors =>{
      commit('setStatus',false)
      console.log(errors)
      commit('setErrorsSMS',"Network or Request Errors");

   })

      if(response.data.success) {

        commit('setUser',response.data.dataz.user)
        //localStorage.setItem('user',JSON.stringify(response.data.dataz.user))
        //localStorage.setItem('user_token',response.data.dataz.token)
        localStorage.setItem('user',CryptoJS.AES.encrypt(JSON.stringify(response.data.dataz.user), 'user').toString())
        localStorage.setItem('user_token',CryptoJS.AES.encrypt(response.data.dataz.token, 'user_token').toString())
        window.location.replace('/');

      } else { 
        commit('setStatus',false)
        commit('setErrors',response.data.errors);
        commit('setErrorsSMS',response.data.message);
      }
       
  },
  logOut({state,commit}){

    localStorage.removeItem("user_token")
    localStorage.removeItem("user")
    if(state.menu_dialog == true){
      commit('setMenuDialog')
    }
    commit('setUser',{})
    window.location.replace('/');
   /*axios
  .post(state.api_url+'/logout/')
  .then(response => {

  if(response.data.success){
      //console.log("loged succsessfuly")
      localStorage.removeItem("user_token")
      localStorage.removeItem("user")
      commit('setUser',{})
      window.location.replace('/');
     
  }
  
   });*/
},
  menuDialog({state,commit}){
    commit('setMenuDialog')
  }
  },
  
  modules: {
  }
})
