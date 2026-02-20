<style>
p{
    font-size: 16px;
}
</style>

<template>
    
    <div class="about-profile section-b-space">
        <div class="card-title">
            <h3>KPIs Checklist for Participants wishing to venture into Entrepreneurship and Job Readiness
                (To be filled every 3 months)</h3>
        </div>
        
        <div class="container pb-5 pt-5">
            <div class="row">
                <div class="col-md-2 col-sm-12"></div>
                <div class="col-md-8 col-sm-12">
                    <h3 class="text-center mb-5">KEY PERFORMANCE INDICATORS</h3>
                    
                    <h3 class="mt-5 mb-3"><u>SECTION I: JOB READINESS/ EMPLOYMENT</u></h3>
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

                    <h3 class="mt-5 mb-5"><u>SECTION II: ENTREPRNEURSHIP</u></h3>
                    <div class="mb-5">
                        <h4 class="text-bold mb-2"><b>A FORMALIZATION & COMPLIANCE</b></h4>
                        <p class="">1. Please tick the level of formalization you have for your business </p>
                        <label class="label-2" for="obstako1">
                                <input type="checkbox" v-model="this.check_business_info" id="obstako1" value="BRELA-Business Name"> BRELA-Business Name 
                        </label><br>
                        <label class="label-2" for="obstako2">
                                <input type="checkbox" v-model="this.check_business_info" id="obstako2" value="Business License-LGA (Local Government Authority)"> Business License-LGA (Local Government Authority) 
                        </label><br>
                        <label class="label-2" for="obstako3">
                                <input type="checkbox" v-model="this.check_business_info" id="obstako3" value="TIN Certificate"> TIN Certificate 
                        </label><br>
                        <label class="label-2" for="obstako4">
                                <input type="checkbox" v-model="this.check_business_info" id="obstako4" value="Registration as a limited company "> Registration as a limited company  
                        </label><br>
                        <label class="label-2" for="obstako5">
                                <input type="checkbox" v-model="this.check_business_info" id="obstako5" value="Registration as group"> Registration as group 
                        </label><br>
                        <span class="p-3"></span>

                        <p class="mb-2 mt-5">2. Do you have a Bank account for your business? (YES/NO) If YES, please state bank name </p>
                        <select class="form-control w-50" required v-model="select_bank_account">
                            <option disabled selected value="">Select Yes/ No</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        <input v-if="this.select_bank_account == 'Yes'" class="form-control mt-2" placeholder="Bank name" type="text" v-model="this.yes_bank_account">
                        <span class="p-3"></span>

                        <p class="mb-2 mt-2">3.Have you obtained a business premises or address? (YES/NO) If YES, Please state location of the business</p>
                        <select class="form-control w-50" required v-model="select_business_address">
                            <option disabled selected value="">Select Yes/ No</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        <input v-if="this.select_business_address == 'Yes'" class="form-control mt-2" placeholder="location of business" type="text" v-model="this.yes_business_address">
                        <span class="p-3"></span>
                    </div>

                    <div class="mb-5">
                        <h4 class="text-bold mb-2"><b>B MARKETING & SALES</b></h4>
                        <p class="mb-2">1. What is the current number of customers served in the last 3 months? </p>
                        <input class="form-control w-50" v-model="entre.customers" type="number" min="0" max="99">
                        <span class="p-3"></span>
                        <p class="mb-2">2. What is your average sales revenue in the last 3 months? </p>
                        <input class="form-control w-50" v-model="entre.revenue" min="0" type="number">
                        <span class="p-3"></span>
                        <p class="mb-2">3. What is your average profit generated in the last 3 months? </p>
                        <input class="form-control w-50" v-model="entre.profits" min="0" type="number">
                    </div>

                    <div class="mb-5">
                        <h4 class="text-bold mb-2"><b>C EMPLOYEES</b></h4>
                        <p class="mb-2">1. How many full-time employees do you have? </p>
                        <input class="form-control w-50" v-model="entre.ft_employees" type="number" min="0" max="99">
                        <span class="p-3"></span>
                        <p class="mb-2">2. How many part-time employees do you have? </p>
                        <input class="form-control w-50" v-model="entre.pt_employees" type="number" min="0" max="999">
                    </div>

                    <div class="mb-5">
                        <h4 class="text-bold mb-2"><b>D BUSINESS SYSTEMS</b></h4>

                        <p class="mb-2 mt-5">1. Have you developed a business plan for your business? (YES/NO)</p>
                        <select class="form-control w-50" required v-model="entre.business_plan">
                            <option disabled selected value="">Select Yes/ No</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        <span class="p-3"></span>

                        <p class="mb-2 mt-2">3.Do you use a record-keeping system to track business transactions? (YES/NO)</p>
                        <select class="form-control w-50" required v-model="entre.record_keeping">
                            <option disabled selected value="">Select Yes/ No</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        <span class="p-3"></span>
                    </div>

                    <div class="mb-5">
                        <h4 class="text-bold mb-2"><b>E NETWORKING </b></h4>
                        <p class="mb-2">1.How many business forums or networking events have you attended for your business in the last 3 months (exhibitions, events, etc)?</p>
                        <input class="form-control w-50" v-model="entre.business_event" type="number" min="0" max="99">
                        <span class="p-3"></span>
                        <p class="mb-2">2. How many special programs (hubs, incubators, programs/projects, etc) have you joined/attended for your business? (Please state the name(s) of the program) </p>
                        <input class="form-control w-100" v-model="entre.special_programs" type="text">
                    </div>

                    <div class="mb-5">
                        <h4 class="text-bold mb-2"><b>F ACCESS TO FINANCE</b></h4>
                        <p class="mb-2 mt-2">3.Have you ever obtained a loan, credit, equity for your business? (YES/NO)  If YES, Please state name of bank, finance institution and amount</p>
                        <select class="form-control w-50" required v-model="select_business_loan">
                            <option disabled selected value="">Select Yes/ No</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        <input v-if="this.select_business_loan == 'Yes'" class="form-control mt-2" placeholder="name of bank, finance institution and amount" type="text" v-model="this.yes_business_loan">
                        <span class="p-3"></span>
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
            entre:{
                business_info:'',
                bank_account:'',
                business_address:'',
                business_loan:'',
                customers:0,
                revenue:0,
                profits:0,
                pt_employees:0,
                ft_employees:0,
                business_plan:"",
                record_keeping:'',
                business_event:'',
                special_programs:'' 
            },
            select_business_loan:'',
            yes_business_loan:'',
            select_business_address:'',
            yes_business_address:'',
            select_bank_account:'',
            yes_bank_account:'',
            check_business_info:[],
            //////kpi jobreadness
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
            if(this.form.interviews == null || this.form.job_applications == null || this.form.network_event == null || this.entre.customers == null || this.entre.revenue == null || this.entre.profits == null || this.entre.pt_employees == null || this.entre.ft_employees == null || this.entre.special_programs == "" || this.entre.business_event == ""){
                alert('Fill all required Information')
            }else{
                if(this.select_employment == "" || this.select_internship == "" || this.select_volunteer == "" || this.select_bank_account == "" || this.select_business_loan == "" || this.select_business_address == "" || this.entre.record_keeping == "" || this.entre.business_plan == ""){
                    alert('Select YES or No accordingly')
                }else{
                    //enterpreneur
                    if(this.select_bank_account == "Yes" && this.yes_bank_account == ''){
                        alert('Fill required information after select Yes')
                        return
                    }
                    if(this.select_business_address == "Yes" && this.yes_business_address == ''){
                        alert('Fill required information after select Yes')
                        return
                    }
                     if(this.select_business_loan == "Yes" && this.yes_business_loan == ''){
                        alert('Fill required information after select Yes')
                        return
                    }
                    if(this.check_business_info.length == 0){
                        //alert('Check Areas of your Expertise')
                        this.entre.business_info = "No formalization "
                    }else{
                        this.entre.business_info = this.check_business_info.toString()
                    }
                   
                    if(this.select_bank_account == 'Yes'){
                        this.entre.bank_account = this.select_bank_account+", "+this.yes_bank_account
                    }else{
                        this.entre.bank_account = this.select_bank_account
                    }

                    if(this.select_business_address == 'Yes'){
                        this.entre.business_address = this.select_business_address+", "+this.yes_business_address
                    }else{
                        this.entre.business_address = this.select_business_address
                    }

                    if(this.select_business_loan == 'Yes'){
                        this.entre.business_loan = this.select_business_loan+", "+this.yes_business_loan
                    }else{
                        this.entre.business_loan = this.select_business_loan
                    }

                    ///JOb readness
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

                    //console.log(this.entre)
                    //console.log(this.form)

                    var response = await axios.post(this.$store.state.api_url + "/kpi-both",{'job':this.form,'entre':this.entre})
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