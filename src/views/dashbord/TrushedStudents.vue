<template>
    <div class="row">
        
        <div class="col-md-4 d-flex justify-content-between">
            <h2>Trushed Participants</h2>
            <a class="btn btn-success" href="/recruitments" rel="noopener noreferrer">Pre-Selected</a>
        </div>
        <div class="col-md-2 col-6">{{ students.length }} of {{og_students.length}}</div>
        <div class="col-md-2 col-6">
            <select class="form-control" v-on:change="bySelected()" required v-model="s_filter">
                <option selected value="All">Filter All</option>
                <option value="1">Sex</option>
                <option value="5">Age</option>
                <option value="2">Level</option>
                <option value="3">Merital</option>
                <option value="4">Graduate</option>
            </select>
        </div>
        <div class="col-md-2 col-6">
            <select v-if="filter_by == 2" class="form-control" v-model="s_level">
                <option selected="true" value="Certificate">Certificate</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Post Graduate">Post Graduate</option>
                <option value="Master">Master</option>
            </select>
            <select v-if="filter_by == 1" class="form-control" v-model="s_sex" id="sex">
                <option selected value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <select v-if="filter_by == 3" class="form-control" v-model="s_marital">
                <option selected value="single">Single</option>
                <option value="married">Married</option>
                <option value="separated">Separated</option>
                <option value="widowed">Widowed</option>   
            </select>
            <select v-if="filter_by == 4" class="form-control" v-model="s_graduate">
                <option v-for="year in years" :value="year.graduate_year">{{ year.graduate_year }}</option> 
            </select>
            <select v-if="filter_by == 5" class="form-control" v-model="s_age">
                <option  selected value="Below 18">Below 18</option>
                <option value="18 to 24">18 to 24</option>
                <option value="25 to 30">25 to 30</option>
                <option value="31 to 35">31 to 35</option>
                <option value="Above 35">Above 35</option> 
            </select>
        </div>
        <div class="col-md-2 col-6">
            <button :disabled="f_btn" v-on:click="this.filterStudent()" class="btn btn-solid btn-sm">Filter</button>
        </div>
    </div>

    <div v-if="this.loading" class="loading-img mt-5 mb-5">
        <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
    </div>

   <table v-if="!this.loading" class="table table-striped table-hover table-responsive">
    
  <thead>
    <tr>
      <th scope="col">Fullname</th>
      <th scope="col">Age</th>
      <th scope="col">Graduate</th>
      <th scope="col">Level</th>
      <th scope="col">Merital</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <div v-if="students.length == 0">
        <h4>No Student Found</h4>
    </div>
    <tr v-for="student in students">
      <td v-if="student.sex == 'male'" class="text-capitalize">{{student.name+" [M]"}}</td>
      <td v-if="student.sex == 'female'" class="text-capitalize">{{student.name+" [F]"}}</td>
      <td>{{student.age}}</td>
      <td>{{student.graduate_year}}</td>
      <td>{{student.education_level}}</td>
      <td>{{student.merital}}</td>
      <td>
        <button class="btn btn-primary btn-my-sm" v-on:click="viewApprove(student)" data-bs-toggle="modal" data-bs-target="#view-approve">Details</button>
        <span class="mx-1"> </span>
        <button class="btn btn-success btn-my-sm" v-on:click="quickApprove(student)" data-bs-toggle="modal" data-bs-target="#quick-approve">Quick</button>
      </td>
    </tr>
    
  </tbody>
</table>


<div class="modal fade mobile-full-width" data-bs-backdrop="static" data-bs-keyboard="false" id="quick-approve">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <p class="video-p">Quick Approve</p>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>    
            <div class="modal-body m-2">
               <div class="row">
                <div class="col-md-12 mb-2">
                    <p class="v-p">Name : <strong>{{ this.student.name }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">Age : <strong>{{ this.student.age }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">Marital : <strong>{{ this.student.merital }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">Greaduate Year : <strong>{{ this.student.graduate_year }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">Full Address : <strong>{{ this.student.contact }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">Device I Use : <strong>{{ this.student.device }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">Education Level : <strong>{{ this.student.education_level }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">College : <strong>{{ this.student.college }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">Course : <strong>{{ this.student.course }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">Prefered Sector : <strong>{{ this.student.sector }}</strong></p>
                </div>
                <div class="col-12"></div>
                <!--div class="col-md-12">
                    <div class="form-group">
                        <label for="Level">Choose Intake</label>
                        <select class="form-control" required v-model="s_intake" id="Level">
                            <option disabled selected value="">Choose Intake</option>
                            <option v-for="intake in intakes" :value="intake.id">{{ intake.name }} </option>
                        </select>
                    </div>
                </div-->
                <div class="col-md-12">
                    <div class="form-group">
                        <label for="Level">Assign Modules</label>
                        <p class="text-danger">Don't make any unnesesary Changes to Somebody Selected Modules</p>
                        <div v-for="group in groups">
                            <label class="label-2" :for="'obstako1'+group.id">
                            <input type="checkbox" v-model="this.s_group" :id="'obstako1'+group.id" :value="group.id"> {{ group.name }}
                        </label>
                        </div>
                    </div>
                </div>

                <div class="btn-section mt-3">
                    <button v-on:click="studentApprove()" class="btn btn-solid btn-sm">Approve</button>
                    <button data-bs-dismiss="modal" class="btn btn-danger btn-sm ml-2">Close</button>
                </div>
               </div> 
            </div>
        </div>
    </div>
</div>

<div class="modal fade mobile-full-width" data-bs-backdrop="static" data-bs-keyboard="false" id="view-approve">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <p class="video-p">Detailed Approve</p>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>    
            <div class="modal-body m-2">
                <h2 class="mb-3">Personal Information</h2>
               <div class="row">
                <div class="col-md-12 mb-2">
                    <p class="v-p">1. Full Name : <strong>{{ this.student.name }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">2. Age : <strong>{{ this.student.age }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">3. Sex : <strong>{{ this.student.sex }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">4. Current marital status : <strong>{{ this.student.merital }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">5. Highest level of education attended  : <strong>{{ this.student.education_level }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">6. When did you complete your highest-level studies (Year) : <strong>{{ this.student.graduate_year }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">7. Name of institution you attended the highest level of education  : <strong>{{ this.student.course }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">8. Which course did you pursue in your highest level of education? : <strong>{{ this.student.college }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">9. Which sector do you prefer in? : <strong>{{ this.student.sector }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">10. Your contacts and address   : <strong>{{ this.student.contact }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">11. Which devices do you use to access online information : <strong>{{ this.student.device }}</strong></p>
                </div>
                
                <div v-if="this.loading_info">
                    <div class="loading-img container-fluid">
                        <div  class="friend-list friend-page-list">
                            <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
                        </div>
                    </div>  
                </div>
                <div v-if="!this.loading_info">
                <h2 class="mb-3 mt-3">Student Emplyerability & Needs</h2>
                <div class="row">
                    <!--div class="col-md-12 mb-2">
                        <p class="v-p">12. What are the main 3 obstacles you encounter while looking for a job?<br/> 
                            <strong v-for="obs in obstacles">{{ '- '+obs }}<br/></strong>
                        </p>
                    </div-->
                    <div class="col-md-12 mb-2">
                       <p class="v-p">12. What is your preferred career path way? :<br/> <strong>{{ this.employs.carrier_path }}</strong></p>
                    </div>
                    <div class="col-md-12 mb-2">
                       <p class="v-p">13. Are you currently engaged in any of the following.  :<br/> <strong>{{ this.employs.engaged }}</strong></p>
                    </div>
                    
                    <!--div class="col-md-12 mb-2">
                       <p class="v-p">15. If you are currently engaged in any of the above, what is your average income per month (TZS)?  :<br/> <strong>{{ this.employs.income }}</strong></p>
                    </div>
                    <div class="col-md-12 mb-2">
                       <p class="v-p">16. Are you registered as a job seeker in any employment service agency?  :<strong>{{ this.employs.job_seeker }}</strong></p>
                    </div>
                    <div class="col-md-12 mb-2">
                       <p class="v-p">17. If you are not in employment/internship/doing entrepreneurship activities, what activities are you engaged in while looking for paid job/self-employment?  :<br/> <strong>{{ this.employs.activity }}</strong></p>
                    </div-->
                    <div class="col-md-12 mb-2">
                       <p class="v-p">14. If you are planning to start a business as your source of employment, what type of business are you planning to start or in?  :<br/> <strong>{{ this.employs.enterprise }}</strong></p>
                    </div>
                    <div class="col-md-12 mb-2">
                       <p class="v-p">15. If you have started doing business. , what type of business you are doing?   :<strong>{{ '('+this.employs.business_type+')' }}</strong></p>
                    </div>
                    <div class="col-md-12 mb-2">
                       <p class="v-p">16. If you have started doing business, how long have you been doing business ( indicate years and months )  :<strong>{{ '('+this.employs.business_time+')' }}</strong></p>
                    </div>
                    <div class="col-md-12 mb-2">
                       <p class="v-p">17. What is your average income per month (TZS)?  :<strong>{{ '('+this.employs.income+')' }}</strong></p>
                    </div>
                    <div class="col-md-12 mb-2">
                       <p class="v-p">18. Have you received any capacity-building support to develop your employability capacity/skills for salaried or self-employment?  :<strong>{{ '('+this.needs.capacity+')' }}</strong></p>
                    </div>
                    <div class="col-md-12 mb-2">
                       <p class="v-p">19. Are you interested in attending online training and mentorship program for salaried job and self-employment?   :<strong>{{ '('+this.needs.training+')' }}</strong></p>
                    </div>
                    <div class="col-md-12 mb-2">
                       <p class="v-p">20. What time is most favourable for you to attend online training? : <strong>{{ this.needs.training_time }}</strong></p>
                    </div>
                    <div class="col-md-12 mb-2">
                       <p class="v-p">21. Do you have any form of disabilities? : <strong>{{ this.needs.disability }}</strong></p>
                    </div>

                    <!--div class="col-md-12 mb-2">
                       <p class="v-p">19. What are the most critical 3 challenges you have experienced in establishing an enterprise? :<br/> <strong>{{ this.employs.enterprise_challenge }}</strong></p>
                    </div>
                    <div class="col-md-12 mb-2">
                       <p class="v-p">20. How many jobs have you applied since you started looking for employment?   :<strong>{{ '('+this.employs.job_applied+')' }}</strong></p>
                    </div>
                    <div class="col-md-12 mb-2">
                       <p class="v-p">21. How many job interviews have you attended?  :<strong>{{ '('+this.employs.interviews+')' }}</strong></p>
                    </div-->
                </div>

                <!--h2 class="mb-3 mt-3">Student Gaps/Needs</h2-->
                <!--div class="row">
                    <div class="col-md-12 mb-2">
                       <p class="v-p">22. Have you received any capacity building support to develop your employability capacity/skills for salaried or self-employment?  :<strong>{{ this.needs.capacity }}</strong></p>
                    </div>
                    <div class="col-md-12 mb-2">
                       <p class="v-p">23. If the answer is YES from the question above, what are the names of institutions supported you for employability capacity for salaried job or self-employment? :<br/> <strong>{{ this.needs.capacity_institution }}</strong></p>
                    </div>
                    <div class="col-md-12 mb-2">
                       <p class="v-p">24. Complementing your responses from the question above, what capacity building support you have received to develop your employability capacity/skills for salaried job or self-employment? :<br/> <strong>{{ this.needs.capacity_type }}</strong></p>
                    </div>
                    <div class="col-md-12 mb-2">
                       <p class="v-p">25. Are you interested to attend any online training and mentorship support for salaried job and self-employment?  :<strong>{{ this.needs.training }}</strong></p>
                    </div>
                    <div class="col-md-12 mb-2">
                       <p class="v-p">26. If the answer is NO from the above question why? :<br/> <strong>{{ this.needs.why_training }}</strong></p>
                    </div>
                    <div class="col-md-12 mb-2">
                       <p class="v-p">27. Based on your experience in searching for salaried job employment, name 3 critical skills you need. :<br/> <strong>{{ this.needs.critical_skills }}</strong></p>
                    </div>
                    <div class="col-md-12 mb-2">
                       <p class="v-p">28. What are the 3 critical skills you need to build and succeed in entrepreneurship journey? :<br/> <strong>{{ this.needs.skill_need }}</strong></p>
                    </div>
                    <div class="col-md-12 mb-2">
                       <p class="v-p">29. What time is most favourable for you to attend online training? : <strong>{{ this.needs.training_time }}</strong></p>
                    </div>
                    <div class="col-md-12 mb-2">
                       <p class="v-p">30. Do you have any form of disabilities? : <strong>{{ this.needs.disability }}</strong></p>
                    </div>
                </div-->
                </div>

                <!--div class="col-md-12">
                    <div class="form-group">
                        <label for="Level">Choose Intake</label>
                        <select class="form-control" required v-model="s_intake" id="Level">
                            <option disabled selected value="">Choose Intake</option>
                            <option v-for="intake in intakes" :value="intake.id">{{ intake.name }} </option>
                        </select>
                    </div>
                </div-->
                <div class="col-md-12">
                    <div class="form-group">
                        <label for="Level">Assign Modules</label>
                        <p class="text-danger">Don't make any unnesesary Changes to Somebody Selected Modules</p>
                        <div v-for="group in groups">
                            <label class="label-2" :for="'obstako1'+group.id">
                            <input type="checkbox" v-model="this.s_group" :id="'obstako1'+group.id" :value="group.id"> {{ group.name }}
                        </label>
                        </div>
                    </div>
                </div>

                <div class="btn-section mt-3">
                    <button v-on:click="studentApprove()" class="btn btn-solid btn-sm">Approve</button>
                    <button data-bs-dismiss="modal" class="btn btn-danger btn-sm ml-2">Close</button>
                </div>
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
            og_students:[],
            students:[],
            student:{},
            years:[],
            groups:[],
            s_modules:[],
            intakes:[],
            loading:true,
            loading_info:true,
            f_btn:true,
            s_sex:"male",
            s_level:"Certificate",
            s_marital:"single",
            s_graduate:"2024",
            s_age:"Below 18",
            s_filter:"All",
            filter_by:1,
            user: {},
            s_intake:1,
            s_group:[],
            needs:{},
            employs:{},
            obstacles:[]
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
        async getModules() {
            var response = await axios.get(this.$store.state.api_url + "/admin-get-groups")
            .catch((errors) => {
            var message = "Network or Request Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 
              this.groups = response.data.groups
              //console.log(response.data.dataz)
            } else {
                console.log(response.data.errors)
            }
          
        
        },
        async getIntakes() {
            var response = await axios.get(this.$store.state.api_url + "/admin-get-intakes")
            .catch((errors) => {
            var message = "Network or Request Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 
              this.intakes = response.data.intakes
              //console.log(response.data.dataz)
            } else {
                console.log(response.data.errors)
            }
        },
    
        quickApprove(student){
            //console.log(student)
            this.student = student
        },

        async viewApprove(student){
            //console.log(student)
            this.student = student
            var student_id = student.id

            var response = await axios.post(this.$store.state.api_url + "/admin-student-details",{student_id})
            .catch((errors) => {
            var message = "Network or Request Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 
                var needs = response.data.needs
                var employs = response.data.employs

                this.needs = needs
                this.employs = employs
                this.obstacles = employs.obstacles.split(",")
              console.log(this.obstacles)
            } else {
                
                var sms = response.data.message;
                this.$toast.error(sms,{duration: 5000,dismissible: true,})
                console.log(response.data.errors)
            }
            this.loading_info = false
        },
        async studentApprove(){
            var og_students = this.og_students
            var intake = this.s_intake
            var group = this.s_group.toString()
            var student_id = this.student.id
            var user_id = this.user.id
           

            if(intake == "" || intake == null || group == "" || group == null){
                alert('choose group and modules correctly')
            }else{
                var response = await axios
                .post(this.$store.state.api_url + "/student-approve", {intake,group,student_id,user_id})
                .catch((errors) => {
                    var message = "Network or Request Errors";
                    this.$toast.error(message,{duration: 7000,dismissible: true,})
                });
                    if (response.data.success) {
                    var message = response.data.message;
                    this.$toast.success(message,{duration: 7000,dismissible: true,})
                    this.students = og_students.filter((i) => i.id != student_id);
                    this.og_students = og_students.filter((i) => i.id != student_id);
                    } else {
                        var message = response.data.message;
                        this.$toast.error(message,{duration: 7000,dismissible: true,})
                        //this.errors = response.data.errors;
                        console.log(response.data.errors)
                    }
            }
        },
        async appliedTrushStudents() {
            var response = await axios.get(this.$store.state.api_url + "/applied-trush-students")
            //console.log(response.data);
            this.og_students = response.data.students;
            if(response.data.length > 50){
                this.students = response.data.students.slice(0,50)
            }else{
                this.students = response.data.students;
            }
            this.loading = false
        
        },
        async getYears(){
            var response = await axios.get(this.$store.state.api_url + "/get-years")
            //console.log(response.data);

            if(response.data.success){
                this.years = response.data.years
            }else{
                console.log(response.data.errors)
            }
           
        },
        bySelected(){
           var show = this.s_filter;
           var og_students = this.og_students
           if(show == "All"){
              this.f_btn = true
              
            if(og_students > 50){
                this.students = og_students.slice(0,50)
            }else{
                this.students = og_students
            }
           }else{
            this.f_btn = false
            this.filter_by = show
           }
        },
        filterStudent(){
            var og_students = this.og_students
            var show = this.filter_by;
           ///sex filtering
           if(show == 1){
              
               this.students = og_students.filter((i) => i.sex == this.s_sex);
            }
             ///sex level
             if(show == 2){
                this.students = og_students.filter((i) => i.education_level == this.s_level);
            }
             ///sex marital
             if(show == 3){
                this.students = og_students.filter((i) => i.merital == this.s_marital);
            }
             ///sex year
             if(show == 4){
                this.students = og_students.filter((i) => i.graduate_year == this.s_graduate);
            }
             ///sex age
             if(show == 5){
                this.students = og_students.filter((i) => i.age == this.s_age);
            }
        }
    },
    created() {
        this.isAuth()
        this.appliedTrushStudents()
        this.getYears()
        this.getModules()
        this.getIntakes()
    }
};
</script>