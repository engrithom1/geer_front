<template>
    <!--  event cover start -->
    <div class="event-cover light-cover mb-5">
        <div class="event-img bg-size blur-up lazyloaded event-dashbord">
            <div class="event-content">
                <h1>Modules Test</h1>
            </div>
        </div>
    </div>
    <!--  event cover end -->
    <!--news feeds-->
    <div  v-if="this.visibility" class="content-center">
        <!-- friend list -->
        <div v-if="this.groups_loading" class="row">
             <div class="loading-img container-fluid">
                <div  class="friend-list friend-page-list">
                    <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
                </div>
            </div>     
        </div>
        <div v-if="!this.groups_loading" class="row">
             
             <div v-if="settings.length == 0">
                <h4>No Settings Found</h4>
            </div>
            <div class="col-md-6 col-lg-4" v-for="setting in settings">
                
                <div class="event-box section-t-space ratio2_3 p-0">
                    <div class="event-content text-center">
                        <h3 class="text-capitalize">{{ setting.name }}</h3>
                        <p>Total questions : {{ setting.tf + setting.mc }}</p>
                        <p>Multiple Choise : {{ setting.mc }}</p>
                        <p>True & False : {{ setting.tf }}</p>
                        <p>Time : {{ setting.time+" minutes" }}</p>
                        
                        <button v-if="setting.status == 3" @click="appealTest(setting.id)" class="btn btn-info mt-2">Appeal Test</button>
                        <button v-if="!setting.status" @click="checkTest(setting)" class="btn btn-primary mt-2">Start Test</button>
                        <button v-if="setting.status == 2" @click="checkTest(setting)" class="btn btn-warning mt-2">Start Test</button>
                        <h4 class="mt-2 text-primary" v-if="setting.status == 1"> You was scored {{ setting.scores+" / "+setting.qns }} </h4>
                    </div>
                </div>
                
            </div>
                 
        </div>
    </div>

    <div v-if="!this.visibility" class="content-center">
        <div v-if="this.qns_loading" class="row mt-5">
             <div class="loading-img container-fluid">
                <div  class="friend-list friend-page-list">
                    <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
                </div>
            </div>     
        </div>
        <div class="event-box section-t-space ratio2_3 p-3 mt-5">
            <h2 class="text-center mt-3 mb-5">Time Remainig {{ this.time_down }}</h2>
            
            <h3 v-if="mcs">A: Multiple Choise (choose the most correct answer)</h3>
            
            <div v-for="(mc,index) in mcs" :key="mc.id" class="mt-3">
                <h4>{{index+1+") "}}{{ mc.question }}</h4>
                <div v-for="mc_ans in mc.test_answers">
                    <input v-on:change="onSelectedAns(mc_ans)" :name="mc.id" :value="mc_ans.status" type="radio" :id="mc_ans.id"/>
                    <label style="font-weight: 600;" class="ml-3" :for="mc_ans.id">{{ mc_ans.answer }}</label>
                </div>
            </div>

            <h3 v-if="tfs" class="mt-5 mb-3">B: True & False (choose True or False for a given statement)</h3>

            <div v-for="(tf, index) in tfs" :key="tf.id" class="mt-3">
                <h4>{{index+1+") "}}{{ tf.question }}</h4>
                <div v-for="tf_ans in tf.test_answers">
                    <input v-on:change="onSelectedAns(tf_ans)" :name="tf.id" :value="tf_ans.status" type="radio" :id="tf_ans.id"/>
                    <label style="font-weight: 600;" class="ml-3" :for="tf_ans.id">{{ tf_ans.answer }}</label>
                </div>
            </div>

            <button :disabled="this.qns_loading" v-on:click="this.submitTest()" class="btn btn-primary align-center mt-5 mb-3">Submit Test</button>
        </div>
    </div>

    <div class="text-center pa-4">
        <v-dialog
        v-model="this.dialogVisibility"
        max-width="400"
        persistent
        >
        <v-card loading>
            <v-card-title class="">CONFIRM TEST.</v-card-title>
            <v-card-text>This Test will takes {{ this.time }} min, Don't close or refresh page until you click Submit Test or Time is out.</v-card-text>
            <template v-slot:actions>
            <v-spacer></v-spacer>

            <button class="btn btn-danger" @click="dialogVisibility = false">
                Cancel
            </button>
            <span class="mr-3"> </span>
            <a href="#" class="btn btn-primary" @click="getTestQuestions()">
                Yes Start
            </a>
            </template>
        </v-card>
        </v-dialog>
    </div>

</template>

<script>
import axios from "axios";
import * as CryptoJS from 'crypto-js';

export default {
    components: {
    },
    data() {
        return {
           settings:[],
            user: {},
            secrete:"",
            secrete2:"",
            time_down:"",
            mcs:[],
            tfs:[],
            answers:[],
            time:0,
            qn_no:0,
            module_id:"",
            visibility:true,
            groups_loading:true,
            qns_loading:false,
            dialogVisibility:false,
        };
    },
    methods: {
        isAuth() {

            var user_cry = localStorage.getItem("user") || "";
            var token_cry = localStorage.getItem("user_token") || "";
            var user = CryptoJS.AES.decrypt(user_cry, 'user').toString(CryptoJS.enc.Utf8) || null
            var token = CryptoJS.AES.decrypt(token_cry, 'user_token').toString(CryptoJS.enc.Utf8) || null
            if (user && token) {
                this.user = JSON.parse(user);
            } 
        },
        async submitTest(){

            this.qns_loading = true

            var module_id = this.module_id
            var scores = this.answers.length

            var response = await axios.post(this.$store.state.api_url + "/submit-test",{module_id, scores})
            .catch((errors) => {
                this.qns_loading = false
                var message = "Network or Request Errors";
                this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 

                var message = response.data.message;
                this.$toast.success(message,{duration: 7000,dismissible: true,})
                location.reload();
            } else {
                var message = response.data.message;
                this.$toast.error(message,{duration: 7000,dismissible: true,})
                this.errors = response.data.errors;
            }
            this.qns_loading = false
        },
        timeWatcher(){
            
            var minutes = this.time
            var sec = 1

            setInterval(()=>{
                this.time_down = minutes+" : "+sec;
                sec--
                if(sec == 0){
                    minutes--
                    sec = 60
                    if(minutes == -1){
                        alert('Time is Up!')
                        this.submitTest()
                    }
                }
            },1000)
        },
        onSelectedAns(asnz){
            //console.log(asnz);
            var a_id = asnz.id
            var q_id = asnz.test_question_id
            var status = asnz.status

            if(asnz.status == 1){
                var anz = {status, q_id, a_id};
                this.answers.push(anz)
                console.log(this.answers)
                
            }else{
                this.answers = this.answers.filter((i) => i.q_id != q_id);
                //console.log(this.answers)
            }
        },
        checkTest(setting){
           this.module_id = setting.id;
           this.time = setting.time;
           this.dialogVisibility = true;
        },
        appealTest(){
           alert('i want to appeal')
        },
        async appealTest(module_id){
            
            this.appeal_loading = true
           
            var response = await axios.post(this.$store.state.api_url + "/appeal-test",{module_id, reason:'unknown'})
            .catch((errors) => {
                this.appeal_loading = false
            var message = "Network or Request Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 
                var message = response.data.message;
                this.$toast.success(message,{duration: 7000,dismissible: true,})
            } else {
                var message = response.data.message;
                this.$toast.error(message,{duration: 7000,dismissible: true,}) 
            }
            this.appeal_loading = false
        },
        async getTestQuestions(){
            
            this.dialogVisibility = false;
            this.qns_loading = true
            this.visibility = false

            var response = await axios.post(this.$store.state.api_url + "/get-test-questions",{module_id:this.module_id})
            .catch((errors) => {
            this.visibility = true
            var message = "Network or Request Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 
              this.mcs = response.data.mcs
              this.tfs = response.data.tfs

              //console.log(response.data)
              this.timeWatcher()
            } else {
                this.visibility = true
                console.log(response.data.errors)
            }
            this.qns_loading = false
        },
        async myModules() {
            var response = await axios.post(this.$store.state.api_url + "/test-settings")
            .catch((errors) => {
            var message = "Network or Request Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 
              var settings = response.data.settings
              var check = response.data.check
              if(check.length == 0){
                this.settings = settings;
              }else{
                for (let index = 0; index < check.length; index++) {
                    const mod_id = check[index].module_id;
                    const statz = check[index].status;
                    const scores = check[index].scores;
                    const end_time = check[index].end_time;
                    const qns = check[index].qns;

                    var objIndex = settings.findIndex(obj => obj.id == mod_id)
                    //console.log(objIndex)
                
                    if(objIndex >= 0){

                        var objz = settings[objIndex]
                        if(statz == 1){
                        ///exams successfuly
                        objz['status'] = 1;
                        objz['scores'] = scores;
                        objz['qns'] = qns;
                        }else{
                            if(end_time <= 2){
                                ///exams supplymentaly
                                objz['status'] = 2;  
                            }else{
                                ///exams closed
                                objz['status'] = 3;
                            }

                        }
                    }
                      
                }
                this.settings = settings;
              }
              console.log(this.settings)
            } else {
                console.log(response.data.errors)
            }
            this.groups_loading = false
        
        }
    },
    created() {
        this.isAuth()
        this.myModules()
        this.secrete = Math.floor(1000 + Math.random()*9000)
        this.secrete2 = Math.floor(10 + Math.random()*90)

        //console.log('sec4 -'+this.secrete+" -- sec2 -"+this.secrete2)
    }
};
</script>