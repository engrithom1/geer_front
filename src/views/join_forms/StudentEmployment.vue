<template>
    <div class="login-discription text-center ">
        <h3>(Form 2 of 2)</h3>
        <h1>Employability & Needs</h1>
    </div>
    <div class="form-sec mt-3">
        <div>
            <form @submit.prevent="studentEmployment" class="theme-form">
                <p v-for="error in errors" :key="error" class="text-danger">
                    {{ error[0] }}
                  </p>
                <div class="row">
                    <!--div class="col-md-12">
                        <div class="form-group">
                            <label for="college">What are the main 3 obstacles you encounter while looking for a job? </label>
                            <label class="label-2" for="obstako1">
                                <input type="checkbox" v-model="this.obstako" id="obstako1" value="Lack of employability skills and competence"> Lack of employability skills and competence 
                            </label><br>
                            <label class="label-2" for="obstako2">
                                <input type="checkbox" v-model="this.obstako" id="obstako2" value="Mismatch between skills demanded by employees and skills possessed by graduates"> Mismatch between skills demanded by employees and skills possessed by graduates  
                            </label><br>
                            <label class="label-2" for="obstako3">
                                <input type="checkbox" v-model="this.obstako" id="obstako3" value="Lack of prior work experience"> Lack of prior work experience  
                            </label><br>
                            <label class="label-2" for="obstako4">
                                <input type="checkbox" v-model="this.obstako" id="obstako4" value="High competition in the labour market "> High competition in the labour market 
                            </label><br>
                            <label class="label-2" for="obstako5">
                                <input type="checkbox" v-model="this.obstako" id="obstako5" value="Age limitation (Considered too young/old)"> Age limitation (Considered too young/old) 
                            </label><br>
                            <label class="label-2" for="obstako6">
                                <input type="checkbox" v-model="this.obstako" id="obstako6" value="Gender related issues"> Gender related issues 
                            </label><br>
                            <label class="label-2" for="obstako7">
                                <input type="checkbox" v-model="this.obstako" id="obstako7" value="Discriminatory prejudices (for example, disability, religion, appearance, etc.)">Discriminatory prejudices (for example, disability, religion, appearance, etc.)
                            </label><br>
                            <label class="label-2" for="obstako8">
                                <input type="checkbox" v-model="this.obstako" id="obstako8" value="Low paying jobs "> Low paying jobs  
                            </label><br>
                            <label class="label-2" for="obstako9">
                                <input type="checkbox" v-model="this.obstako" id="obstako9" value="Poor working conditions in available jobs"> Poor working conditions in available jobs   
                            </label><br>
                            <label class="label-2" for="obstako10">
                                <input type="checkbox" v-model="this.obstako" id="obstako10" value="Not aware"> Not aware   
                            </label><br>
                            <label class="label-2" for="obstako11">
                                <input type="checkbox" v-model="this.obstako" id="obstako11" value="other"> Other  
                            </label><br>
                        </div> 
                    </div-->
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="carrier">What is your preferred career path way?</label>
                            <select class="form-control" required v-model="form.carrier_path" id="carrier">
                                <option disabled selected value="">Select Carrier</option>
                                <option value="Paid employment">Paid employment</option>
                                <option value="Self-employment through entrepreneurship">Self-employment through entrepreneurship</option>
                                <option value="Both paid emplyment and self-employment">Both paid emplyment and self-employment</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="Engage">Are you currently engaged in any of the following?</label>
                            <select class="form-control" required v-model="form.engaged" id="Engage">
                                <option disabled selected value="">Select what you Engaged</option>
                                <option value="Self-employed (entrepreneurship)">Self-employed (entrepreneurship)</option>
                                <option value="Salaried job">Salaried job</option>
                                <option value="Internship/apprenticeship">Internship/apprenticeship</option>
                                <option value="Supporting a family or extended family business">Supporting a family or extended family business</option>
                                <option value="other">Others, specify</option>
                                
                            </select>
                            <input required v-if="this.form.engaged == 'other'" class="form-control" placeholder="specify.." type="text" v-model="this.engaged_other" id="">
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="income">What is your average income per month (TZS)?</label>
                            <select class="form-control" required v-model="form.income" id="income">
                                <option disabled selected value="">Select Income</option>
                                <option value="Below 500,000">No income</option>
                                <option value="Below 500,000">Below 500,000</option>
                                <option value="Between 500,000 to 1,000,000">Between 500,000 to 1,000,000</option>
                                <option value="Above 1,000,000 ">Above 1,000,000 </option>
                            </select>
                        </div>
                    </div>
                    <!--div class="col-md-12">
                        <div class="form-group">
                            <label for="job_seeker">Are you registered as a job seeker in any employment service agency?</label>
                            <select class="form-control" required v-model="form.job_seeker" id="job_seeker">
                                <option disabled selected value="">Select yes/no</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div-->
                    <!--div class="col-md-12">
                        <div class="form-group">
                            <label for="activity">. If you are not in employment/internship/doing entrepreneurship activities, what activities are you engaged in while looking for paid job/self-employment?</label>
                            <select class="form-control" required v-model="form.activity" id="activity">
                                <option disabled selected value="">Select Activity</option>
                                <option value="Taking some online courses ">Taking some online courses </option>
                                <option value="Helping with household activities">Helping with household activities</option>
                                <option value="Helping in family business">Helping in family business</option>
                                <option value="Searching for employment opportunities">Searching for employment opportunities</option>
                                <option value="Transforming my business idea into reality">Transforming my business idea into reality</option>
                                <option value="Spending time alone">Spending time alone</option>
                                <option value="Spending time with family">Spending time with family</option>
                                <option value="other">Others</option>
                            </select>
                        </div>
                    </div-->
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="enterprise">If you are planning to start a business as your source of employment, what type of business are you planning to start or in?</label>
                            <textarea v-model="form.enterprise" cols="3" id="enterprise" class="form-control"></textarea>
                        </div>
                    </div>
                    <!--div class="col-md-12">
                        <div class="form-group">
                            <label for="enterprise_challenge">What are the most critical 3 challenges you have experienced in establishing an enterprise?</label>
                            <textarea required v-model="form.enterprise_challenge" maxlength="450" cols="3" id="enterprise_challenge" class="form-control"></textarea>
                        </div>
                    </div-->
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="enterprise_challenge">If you have started doing business. , what type of business you are doing?</label>
                            <input type="text"  v-model="form.business_type" id="enterprise_challenge" class="form-control"/>
                        </div>
                    </div>
                    <!--div class="col-md-6">
                        <div class="form-group">
                            <label for="job_applied">How many jobs have you applied ?</label>
                            <input required type="number" v-model="form.job_applied" id="job_applied" class="form-control">
                        </div>
                    </div-->
                    <!--div class="col-md-6">
                        <div class="form-group">
                            <label for="interviews">How many job interviews have you attended?</label>
                            <input required type="number" v-model="form.interviews" id="interviews" class="form-control">
                        </div>
                    </div-->
                    <div class="col-md-12 row">
                        <div class="form-group">
                            <label for="year">If you have started doing business, how long have you been doing business ( indicate years and months ) </label>
                            <div class="row">
                                <div class="col-sm-6">
                                <input type="number" placeholder="Year" v-model="year" max="15" id="year" class="form-control"/>
                            </div>
                            <div class="col-sm-6">
                                <input type="number" placeholder="Month" v-model="month" max="11" id="month" class="form-control"/>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="capacity">Have you received any capacity building support to develop your employability capacity/skills for salaried or self-employment?</label>
                            <select class="form-control" required v-model="form.capacity" id="capacity">
                                <option disabled selected value="">Select yes/no</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div> 
                   
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="training">Are you interested to attend any online training and mentorship support for salaried job and self-employment?</label>
                            <select class="form-control" required v-model="form.training" id="training">
                                <option disabled selected value="">Select yes/no</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div> 
                   
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="training_titme">What time is most favourable for you to attend online training?</label>
                            <select class="form-control" required v-model="form.training_time" id="training_titme">
                                <option disabled selected value="">Select Time</option>
                                <option value="Between 09:00 - 11:00 AM">Between 09:00 - 11:00 AM</option>
                                <option value="Between 12:00 - 02:00 PM">Between 12:00 - 02:00 PM</option>
                                <option value="Between 03:00 - 5:00 PM">Between 03:00 - 5:00 PM</option>
                                <option value="Others">Others</option>
                            </select>
                            <input required v-if="this.form.training_time == 'Others'" class="form-control" placeholder="specify.." type="text" v-model="this.training_time_yes" id="">
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="disability">Do you have any form of disabilities?</label>
                            <select class="form-control" required v-model="form.disability" id="disability">
                                <option disabled selected value="">Select yes/no</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            <input required v-if="this.form.disability == 'Yes'" class="form-control" placeholder="specify.." type="text" v-model="this.disability_yes" id="">
                        </div>
                    </div> 

                </div>
                
                
                <div class="btn-section mt-3">
                    <button  class="btn btn-solid btn-lg">Submit</button>
                </div>
            </form>
           
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  components: {
    
  },
  data() {
    return {
      loged: true,
      user: {},
      obstako:[],
      s_obstako:"",
      o_obstako:"",
      o_obstako_show:false,
      errors: [],
      year:"",
      month:"",
      engaged_other:'',
      disability_yes:'',
      training_time_yes:'',
      form:{
        obstacles:"removed",
        carrier_path:"",
        engaged:"",
        income:"",
        job_seeker:"removed",
        activity:"removed",
        enterprise:"",//now is also called bussiness
        enterprise_challenge:"removed",
        job_applied:"removed",
        interviews:"removed",
        business_type:"",
        business_time:"",
        capacity:"",
        training:"",
        training_time:"",
        disability:""
      },
      
    };
  },
  methods: {
    levelSelected(){
        if(this.s_level == "other"){
            this.o_level_show = true;
        }else{
            this.o_level_show = false;
            this.o_level = ""
        }
    },
    selectObstako(){
        
    },
    
    async studentEmployment(){

            //this.form.obstacles = this.obstako.toString()

            if(this.form.engaged == 'other'){
                this.form.engaged = this.engaged_other
            }
            if(this.form.disability == 'Yes'){
            this.form.disability = this.form.disability+", "+this.disability_yes
            }
            if(this.form.disability == 'Others'){
            this.form.training_time = this.form.training_time+", "+this.training_time_yes
            }
            this.form.business_time = this.year+' Year and '+this.month+' Month';

            if(this.year == "" || this.month == ""){
                this.form.business_time = 'not info'
            }
            if(this.form.enterprise == "" || this.form.enterprise == null || this.form.enterprise == undefined){
                this.form.enterprise = 'not info'
            }

            if(this.form.business_type == "" || this.form.business_type == null || this.form.business_type == undefined){
                this.form.business_type = 'not info'
            }

           
            
            /*console.log(this.form)*/
            var response = await axios
          .post(this.$store.state.api_url + "/student-employment-form", this.form)
          .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
          });
            if (response.data.success) {
              var message = response.data.message;
              this.$toast.success(message,{duration: 7000,dismissible: true,})
              localStorage.removeItem("user")
              localStorage.setItem('user',JSON.stringify(response.data.user))
              //window.location.replace('/');
                setTimeout(function(){
                    //alert('after waiting')
                    window.location.replace('/');
                },2000);
             
            } else {
                var message = response.data.message;
                this.$toast.error(message,{duration: 7000,dismissible: true,})
                this.errors = response.data.errors;
            }
      
        
    }
  },
  created() {
   
  }
};
</script>