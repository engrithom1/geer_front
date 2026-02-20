<style>
p{
    font-size: 16px;
}
</style>
<template>
    
    <div class="about-profile section-b-space">
        <div class="card-title">
            <h3>KPIs Checklist for Participants wishing to venture into Job Readiness
                (To be filled every 3 months)</h3>
        </div>
        <div class="container pb-5 pt-5">
            <div class="row">
                <div class="col-md-2 col-sm-12"></div>
                <div class="col-md-8 col-sm-12">
                    <h3 class="text-center mb-5">KEY PERFORMANCE INDICATORS</h3>
                    <div class="mb-5">
                        <h4 class="text-bold mb-2"><b>A JOB SEARCH ACTIVITIES</b></h4>
                        <p class="mb-2">1. How many job applications have you submitted in the last 3 months? </p>
                        <input class="form-control w-50" v-model="form.job_applications" type="number" min="0" max="99">
                    </div>
                    <div class="mb-5">
                        <h4 class="text-bold mb-2"><b>B NETWORKING EFFORTS</b></h4>
                        <p class="mb-2">2. Please state the number of networking events that you attended in the last 3 months </p>
                        <input class="form-control w-50" v-model="form.network_event" type="number" min="0" max="99">
                    </div>
                    <div class="mb-5">
                        <h4 class="text-bold mb-2"><b>C INTERVIEW PERFORMANCE</b></h4>
                        <p class="mb-2">3. How many Interviews have you done in the last 3 months? </p>
                        <input class="form-control w-50" v-model="form.interviews" type="number" min="0" max="99">
                    </div>
                    <div class="mb-5">
                        <h4 class="text-bold mb-2"><b>D JOB OFFER METRICS</b></h4>
                        <p class="mb-2">4. Did you get any Volunteer work in the last 3 months?  (YES/NO). Please state name of Organization and location </p>
                        <select class="form-control w-50" required v-model="select_volunteer">
                            <option disabled selected value="">Select Yes/ No</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        <input v-if="this.select_volunteer == 'Yes'" class="form-control mt-2" placeholder="Organization and location" type="text" v-model="this.yes_volunteer">
                        <span class="p-3"></span>
                        <p class="mb-2">5. Did you obtain any Internship work in the last 3 months?  (YES/NO). Please state name of Organization and location</p>
                        <select class="form-control w-50" required v-model="select_internship">
                            <option disabled selected value="">Select Yes/ No</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        <input v-if="this.select_internship == 'Yes'" class="form-control mt-2" placeholder="Organization and location" type="text" v-model="this.yes_internship">
                        <span class="p-3"></span>
                        <p class="mb-2">6. Did you get any offers of Full-time employment work in the last 3 months? (YES/NO). Please state name of Organization and location</p>
                        <select class="form-control w-50" required v-model="select_employment">
                            <option disabled selected value="">Select Yes/ No</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        <input v-if="this.select_employment == 'Yes'" class="form-control mt-2" placeholder="Organization and location" type="text" v-model="this.yes_employment">
                    </div>
                    <button v-on:click="submitKPI()" class="btn btn-primary">Submit</button>
                </div>
                <div class="col-md-2 col-sm-12"></div>
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
            user: {},
            form:{
                job_applications:'0',
                network_event:'0',
                interviews:'0',
                volunteer:'',
                internship:'',
                employment:'',
            },
            select_volunteer:'',
            yes_volunteer:'',
            select_internship:'',
            yes_internship:'',
            select_employment:'',
            yes_employment:''
            //////kpi form for students
            
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
        async submitKPI(){
            if(this.form.interviews == null || this.form.job_applications == null || this.form.network_event == null){
                alert('Fill all required Information')
            }else{
                if(this.select_employment == "" || this.select_internship == "" || this.select_volunteer == ""){
                    alert('Select YES or No accordingly')
                }else{
                    if(this.select_employment == "Yes" && this.yes_employment == ''){
                        alert('Fill required information after select Yes')
                        return
                    }
                    if(this.select_internship == "Yes" && this.yes_internship == ''){
                        alert('Fill required information after select Yes')
                        return
                    }
                    if(this.select_volunteer == "Yes" && this.yes_volunteer == ''){
                        alert('Fill required information after select Yes')
                        return
                    }
                    if(this.select_employment == 'Yes'){
                        this.form.employment = this.select_employment+", "+this.yes_employment
                    }else{
                        this.form.employment = this.select_employment
                    }

                    if(this.select_internship == 'Yes'){
                        this.form.internship = this.select_internship+", "+this.yes_internship
                    }else{
                        this.form.internship = this.select_internship
                    }

                    if(this.select_volunteer == 'Yes'){
                        this.form.volunteer = this.select_volunteer+", "+this.yes_volunteer
                    }else{
                        this.form.volunteer = this.select_volunteer
                    }

                    var response = await axios.post(this.$store.state.api_url + "/kpi-jobreadiness",this.form)
                    .catch((errors) => {
                        this.form_loading = false
                        var message = "Network or Request Errors";
                        this.$toast.error(message,{duration: 7000,dismissible: true,})
                    });
                
                    if (response.data.success) { 
                        var message = response.data.message
                        this.$toast.success(message,{duration: 7000,dismissible: true,})
                        window.location.replace('/account/student-feedback');
                    } else {
                        //console.log(response.data.errors)
                        var message = response.data.message
                        this.$toast.error(message,{duration: 7000,dismissible: true,})
                    }
                    this.form_loading = false
                }
            }
        },

    },
    created() {
        this.isAuth()
    }
}
</script>