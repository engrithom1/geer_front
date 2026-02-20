<template>
    
    <div class="about-profile section-b-space">
        <div class="card-title">
            <h3>FeedBack</h3>
        </div>
        <div class="container pb-5">
            <div class="row">
                <div class="col-xl-4 col-lg-4">
                    <table class="table">
                        <thead>
                            <tr>
                                <td><h3>Provide Feedback To The Following</h3></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td><a href="#" v-on:click="getEvaluationForm('mentee', 'Mentee / Participants Evaluation Form')">Mentee / Participants Evaluation Form</a></td>
                            </tr>
                            <tr>
                                <td><a href="#" v-on:click="getEvaluationForm('program', 'GEER Program Evaluation Form')">GEER Program Evaluation Form</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-xl-8 col-lg-8">
                    <div class="mt-5">
                        <h2 class="text-center">{{ this.form_title }}</h2>
                        <!--evaluat mentee-->
                        <div v-if="this.mentee_form">
                            <div>
                                <p class="mt-3 mb-3">Please take time to provide feedback on the experience from your mentorship 
                                with your participant. Your candid feedback will help us continuously improve
                                 the experience and relationship for a better impact. The information 
                                 you provide shall be used with the highest degree of confidentially and 
                                 not otherwise
                                </p>
                                <h2>PART A</h2>
                                <p>Please provide information and insight regarding the mentoring program you have participated in by indicating a rating value for the following questions related to the activities and the nature of the mentoring process.</p>
                            </div>
                            <div v-for="(mc,index) in m_choose" :key="mc.id" class="mt-3">
                                <h4>{{index+1+") "}}{{ mc.question }}</h4>
                                <div class="row mb-3">
                                    <div v-for="mc_ans in mc.m_p_ans" class="col-sm-6">
                                    <input v-on:change="onSelectedAns('mentee',mc_ans)" :name="mc.id" :value="mc_ans.status" type="radio" :id="mc_ans.id"/>
                                    <label style="font-weight: 600;" class="ml-3" :for="mc_ans.id">{{ mc_ans.answer }}</label>
                                </div>
                                </div>
                            </div>
                            <div class="pt-5">
                                <h2>PART B</h2>
                                <div v-for="(mc,index) in m_explain" :key="mc.id" class="mt-3">
                                <h4>{{index+1+") "}}{{ mc.question }}</h4>
                                <div class="mt-3">
                                    <div class="mb-3">
                                        <textarea row="2" required :id="'qn_'+mc.id" class="form-control"></textarea>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <button v-on:click="submitEvaluation('mentee')" class="btn btn-primary">Submit</button>
                        </div>
                        <!--end evaluate mentee-->

                        <!--evaluat program-->
                        <div v-if="this.program_form">
                            <div>
                                <p class="mt-3 mb-3">Please take time to provide feedback on the experience from your 
                                    GEER Program. Your candid feedback will help us continuously improve the program 
                                    for a better impact. The information you provide shall be used with the highest 
                                    degree of confidentially and not otherwise. 
                                </p>
                                <h2>PART A</h2>
                            </div>
                            <div v-for="(mc,index) in p_choose" :key="mc.id" class="mt-3">
                                <h4>{{index+1+") "}}{{ mc.question }}</h4>
                                <div class="row mb-3">
                                    <div v-for="mc_ans in mc.m_p_ans" class="col-sm-6">
                                    <input v-on:change="onSelectedAns('program',mc_ans)" :name="mc.id" :value="mc_ans.status" type="radio" :id="mc_ans.id"/>
                                    <label style="font-weight: 600;" class="ml-3" :for="mc_ans.id">{{ mc_ans.answer }}</label>
                                </div>
                                </div>
                            </div>
                            <div class="pt-5">
                                <h2>PART B</h2>
                                <div v-for="(mc,index) in p_explain" :key="mc.id" class="mt-3">
                                <h4>{{index+1+") "}}{{ mc.question }}</h4>
                                <div class="mt-3">
                                    <div class="mb-3">
                                        <textarea row="2" required :id="'qn_'+mc.id" class="form-control"></textarea>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <button v-on:click="submitEvaluation('program')" class="btn btn-primary">Submit</button>
                        </div>
                        <!--end evaluate program-->

                    </div>
                </div>
                    
            </div>
        </div>
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
            form_loading:true,
            mentee_form:false,
            program_form:false,
            user: {},
            form_title:"",
            m_choose:[],
            p_choose:[],
            m_explain:[],
            p_explain:[],
            m_choose_ans:[],
            m_explain_ans:[],
            p_choose_ans:[],
            p_explain_ans:[]
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

                if('about_me' in JSON.parse(user)){
                    this.about_me = JSON.parse(user).about_me
                }else{
                    this.about_me = "about me"
                }
                this.imgPreview = this.$store.state.img_url+JSON.parse(user).avatar
            } 
        },
        onSelectedAns(type,asnz){
            //console.log(asnz)
            if(type == 'mentee'){
                var ansz = this.m_choose_ans
                var answer = asnz.answer
                var qn_id = asnz.m_p_evaluation_id

                var objIndex = ansz.findIndex(obj => obj.qn_id == qn_id)

                if(objIndex >= 0){
                ansz[objIndex].answer = answer
                this.m_choose_ans = ansz 
                //console.log(this.m_choose_ans)
                }else{
                    //this.m_choose_ans = this.m_choose_ans.filter((i) => i.qn_id != qn_id);
                    var anz = {qn_id, answer};
                    this.m_choose_ans.push(anz)
                    //console.log(this.m_choose_ans)
                }
            }else{
                var ansz = this.p_choose_ans
                var answer = asnz.answer
                var qn_id = asnz.m_p_evaluation_id
                console.log(asnz)

                var objIndex = ansz.findIndex(obj => obj.qn_id == qn_id)

                if(objIndex >= 0){
                ansz[objIndex].answer = answer
                this.p_choose_ans = ansz 
                console.log(this.p_choose_ans)
                }else{
                    //this.p_choose_ans = this.p_choose_ans.filter((i) => i.qn_id != qn_id);
                    var anz = {qn_id, answer};
                    this.p_choose_ans.push(anz)
                    console.log(this.p_choose_ans)
                }
            }
        },
        async submitEvaluation(type){
            if(type == 'mentee'){

                var m_explain = this.m_explain
                var m_choose = this.m_choose
                var m_choose_ans = this.m_choose_ans

                if(m_choose_ans.length != m_choose.length){
                    alert('Answer all questions in PART A')
                }else{

                m_explain.forEach(elm => {
                    var ansz =  this.m_explain_ans
                   var qn_id = elm.id
                   var answer = document.getElementById('qn_'+qn_id).value
                   if(answer == '' || answer == undefined || answer == null){
                        alert('Fill required information on PART B')
                   }else{
                        var objIndex = ansz.findIndex(obj => obj.qn_id == qn_id)

                        if(objIndex >= 0){
                            ansz[objIndex].answer = answer
                            this.m_explain_ans = ansz 
                            console.log(this.m_explain_ans)
                        }else{
                            var anz = {qn_id,answer};
                            this.m_explain_ans.push(anz)

                            console.log(this.m_explain_ans)
                        }
                   }
                })

                if(this.m_explain_ans.length != this.m_explain.length){
                   
                }else{

                    var response = await axios.post(this.$store.state.api_url + "/submit-evaluation-form",{type:'member',choose:this.m_choose_ans,explain:this.m_explain_ans})
                    .catch((errors) => {
                        this.form_loading = false
                        var message = "Network or Request Errors";
                        this.$toast.error(message,{duration: 7000,dismissible: true,})
                    });
                
                    if (response.data.success) { 
                        var message = response.data.message
                        this.$toast.success(message,{duration: 7000,dismissible: true,})
                        window.location.replace('/account');
                    } else {
                        console.log(response.data.errors)
                        var message = response.data.message
                        this.$toast.error(message,{duration: 7000,dismissible: true,})
                    }
                    this.form_loading = false

                }

                }

            }else{

                var p_explain = this.p_explain
                var p_choose = this.p_choose
                var p_choose_ans = this.p_choose_ans

                if(p_choose_ans.length != p_choose.length){
                    alert('Answer all questions in PART A')
                }else{

                p_explain.forEach(elm => {
                   var ansz =  this.p_explain_ans
                   var qn_id = elm.id
                   var answer = document.getElementById('qn_'+qn_id).value
                   if(answer == '' || answer == undefined || answer == null){
                        alert('Fill required information on PART B')
                   }else{
                        var objIndex = ansz.findIndex(obj => obj.qn_id == qn_id)

                        if(objIndex >= 0){
                            ansz[objIndex].answer = answer
                            this.p_explain_ans = ansz 
                            console.log(this.p_explain_ans)
                        }else{
                            var anz = {qn_id,answer};
                            this.p_explain_ans.push(anz)

                            console.log(this.p_explain_ans)
                        }
                   }
                })
                if(this.p_explain_ans.length != this.p_explain.length){
                   
                }else{
                var response = await axios.post(this.$store.state.api_url + "/submit-evaluation-form",{type:'program',choose:this.p_choose_ans,explain:this.p_explain_ans})
                .catch((errors) => {
                    this.form_loading = false
                    var message = "Network or Request Errors";
                    this.$toast.error(message,{duration: 7000,dismissible: true,})
                });
            
                if (response.data.success) { 
                    var message = response.data.message
                    this.$toast.success(message,{duration: 7000,dismissible: true,})
                    window.location.replace('/account');
                } else {
                    console.log(response.data.errors)
                    var message = response.data.message
                    this.$toast.error(message,{duration: 7000,dismissible: true,})
                }
                this.form_loading = false

                }

                }

            }
        },
        onExplain(qn_id){
            console.log(this.explain_ans)
        },
        async getEvaluationForm(type, title){
            ///type can be mentee or program and respectivery title
            this.form_title = title;
            if(type == 'mentee'){
                //member evaluation form
                this.program_form = false
                this.mentee_form = true

                this.form_loading = true

                var response = await axios.post(this.$store.state.api_url + "/member-evaluation-form",{})
                .catch((errors) => {
                    this.form_loading = false
                    var message = "Network or Request Errors";
                    this.$toast.error(message,{duration: 7000,dismissible: true,})
                });
            
                if (response.data.success) { 
                    this.m_choose = response.data.choose
                    this.m_explain = response.data.explain

                } else {
                    //console.log(response.data.errors)
                    var message = response.data.message
                    this.$toast.error(message,{duration: 7000,dismissible: true,})
                }
                this.form_loading = false
            }else{
                //program evaluation form
                this.program_form = true
                this.mentee_form = false 

                this.form_loading = true

                var response = await axios.post(this.$store.state.api_url + "/program-evaluation-form",{})
                .catch((errors) => {
                    this.form_loading = false
                    var message = "Network or Request Errors";
                    this.$toast.error(message,{duration: 7000,dismissible: true,})
                });
            
                if (response.data.success) { 
                    this.p_choose = response.data.choose
                    this.p_explain = response.data.explain

                } else {
                    console.log(response.data.errors)
                    var message = response.data.message
                    this.$toast.error(message,{duration: 7000,dismissible: true,})
                }
                this.form_loading = false
            }

            

        }

    },
    created() {
        this.isAuth()
        
    }
}
</script>