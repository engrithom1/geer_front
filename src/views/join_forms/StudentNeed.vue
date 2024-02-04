<template>
    <div class="login-discription text-center ">
        <h3>(Form 3 of 3)</h3>
        <h1>Training Gaps/ Needs</h1>
    </div>
    <div class="form-sec mt-3">
        <div>
            <form  @submit.prevent="studentNeeds" class="theme-form">
                <p v-for="error in errors" :key="error" class="text-danger">
                    {{ error[0] }}
                  </p>
                <div class="row">
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
                            <label for="capacity_inst">If the answer is YES from the question above, what are the names of institutions supported you for employability capacity for salaried job or self-employment?</label>
                            <textarea v-model="form.capacity_institute" maxlength="450" cols="3" id="capacity_inst" class="form-control"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="capacity_type">Complementing your responses from the question above, what capacity building support you have received to develop your employability capacity/skills for salaried job or self-employment?</label>
                            <select class="form-control" required v-model="form.capacity_type" id="capacity_type">
                                <option disabled selected value="">Select Capacity/skill</option>
                                <option value="Job related online training/workshop">Job related online training/workshop</option>
                                <option value="Job related online training/workshop">Job related online training/workshop</option>
                                <option value="Online mentorship and coaching on job related support">Online mentorship and coaching on job related support</option>
                                <option value="Face to face support on mentorship and coaching on job readiness">Face to face support on mentorship and coaching on job readiness</option>
                                <option value="Online entrepreneurship related training/workshop">Online entrepreneurship related training/workshop</option>
                                <option value="Class/physical entrepreneurship related training/workshop">Class/physical entrepreneurship related training/workshop</option>
                                <option value="Face to face support on mentorship and coaching on entrepreneurship issues">Face to face support on mentorship and coaching on entrepreneurship issues</option>
                                <option value="Online mentorship and coaching on entrepreneurship issues">Online mentorship and coaching on entrepreneurship issues</option>
                                <option value="other">Others</option>
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
                            <label for="why_training">If the answer is NO from the above question why?</label>
                            <textarea v-model="form.why_training" maxlength="450" cols="3" id="why_training" class="form-control"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="skill_need">Based on your experience in searching for salaried job employment, name 3 critical skills you need. </label>
                            <textarea required v-model="form.skill_need" maxlength="450" cols="3" id="skill_need" class="form-control"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="critical_skills">What are the 3 critical skills you need to build and succeed in entrepreneurship journey?</label>
                            <textarea required v-model="form.critical_skills" maxlength="450" cols="3" id="critical_skills" class="form-control"></textarea>
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
      errors: [],
      form:{
        capacity:"",
        capacity_institute:"",
        capacity_type:"",
        training:"",
        why_training:"",
        critical_skills:"",
        skill_need:"",
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
    
    async studentNeeds(){

        var response = await axios
          .post(this.$store.state.api_url + "/student-needs-form", this.form)
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
                },5000);
             
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