<template>
    <div class="login-discription text-center ">
        <h1>Mentor's Required Information</h1>
    </div>
    <div class="form-sec mt-3">
        <div>
            <form @submit.prevent="mentorProfileForm" class="theme-form">
                <p v-for="error in errors" :key="error" class="text-danger">
                    {{ error[0] }}
                  </p>
                <div class="row">
                    
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="mob1">Age</label>
                            <input type="number" minlength="2" min="18" maxlength="2" required class="form-control" v-model="form.age" id="mob1"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="sex">Gender</label>
                            <select class="form-control" required v-model="form.sex" id="sex">
                                <option disabled selected value="">Select Sex</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" required class="form-control" v-model="contact_email" id="email"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="mob1">Mobile No1</label>
                            <input type="text" minlength="10" maxlength="10" required class="form-control" v-model="contact_mob1" id="mob1"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="mob2">Mobile No2</label>
                            <input type="text" minlength="10" maxlength="10" class="form-control" v-model="contact_mob2" id="mob2"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="region">Current Residence</label>
                            <select class="form-control" required v-model="contact_region" id="region">
                                <option disabled selected value="">Choose Region</option>
                                <option value="Arusha">Arusha</option>
                                <option value="Dar es Salaam"> Dar es Salaam</option>
                                <option value="Dodoma">Dodoma</option> 
                                <option value="Geita">Geita</option> 
                                <option value="Iringa">Iringa</option> 
                                <option value="Kagera">Kagera</option> 
                                <option value="Katavi">Katavi</option> 
                                <option value="Kigoma">Kigoma</option>
                                <option value="Kilimanjaro">Kilimanjaro</option> 
                                <option value="Lindi">Lindi</option> 
                                <option value="Manyara">Manyara</option> 
                                <option value="Mara">Mara</option> 
                                <option value="Mbeya">Mbeya</option> 
                                <option value="Morogoro">Morogoro</option> 
                                <option value="Mtwara">Mtwara</option> 
                                <option value="Mwanza">Mwanza</option> 
                                <option value="Njombe">Njombe</option>
                                <option value="Pemba">Pemba</option>
                                <option value="Pwani">Pwani</option>
                                <option value="Rukwa">Rukwa</option>
                                <option value="Ruvuma">Ruvuma</option>
                                <option value="Shinyanga">Shinyanga</option>
                                <option value="Simiyu">Simiyu</option>
                                <option value="Singida">Singida</option>
                                <option value="Tabora">Tabora</option>
                                <option value="Tanga">Tanga</option> 
                                <option value="Zanzibar">Zanzibar</option> 
                                
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="district">District</label>
                            <input type="text" required class="form-control" v-model="contact_district" id="district"/>
                        </div>
                    </div>

                    <!--EDUCATION LEVEL-->
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="Level">Highest Education</label>
                            <select class="form-control" v-on:change="levelSelected()" required v-model="s_level" id="Level">
                                <option disabled selected value="">Choose Level</option>
                                <option value="Certificate">Certificate</option>
                                <option value="Diploma">Diploma</option>
                                <option value="Bachelor">Bachelor</option>
                                <option value="Post Graduate">Post Graduate</option>
                                <option value="Master">Master</option>
                                <option value="other">Other, specify</option>
                            </select>
                            <input v-if="this.o_level_show" class="form-control" placeholder="Specify Highest level" type="text" v-model="this.o_level" id="">
                        </div>
                    </div>
                   
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="skills">Coaching and Mentorship Skills</label>
                            <textarea required class="form-control" v-model="form.skills" id="skills"></textarea>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="interest">Major Area of interest in coaching and mentorship</label>
                            <select class="form-control" required v-model="form.interest" id="interest">
                                <option disabled selected value="">Choose Below</option>
                                <option value="Business Development and Entrepreneurship">Business Development and Entrepreneurship</option>
                                <option value="Early Career Development and Counselling">Early Career Development and Counselling</option>
                                <option value="Both areas">Both areas</option>
                            </select>
                           
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="college">Specific areas  of expertise (Tick all that apply)</label><br>
                            <label class="label-2" for="areas1">
                                <input type="checkbox" v-model="this.areas" id="areas1" value="Entrepreneurship development "> Entrepreneurship development  
                            </label><br>
                            <label class="label-2" for="areas2">
                                <input type="checkbox" v-model="this.areas" id="areas2" value="Financial management and literacy "> Financial management and literacy   
                            </label><br>
                            <label class="label-2" for="areas3">
                                <input type="checkbox" v-model="this.areas" id="areas3" value="Investor readiness "> Investor readiness   
                            </label><br>
                            <label class="label-2" for="areas4">
                                <input type="checkbox" v-model="this.areas" id="areas4" value="Business Management Strategy and Governance"> Business Management Strategy and Governance
                            </label><br>
                            <label class="label-2" for="areas5">
                                <input type="checkbox" v-model="this.areas" id="areas5" value="Business Modelling and Design thinking"> Business Modelling and Design thinking 
                            </label><br>
                            <label class="label-2" for="areas6">
                                <input type="checkbox" v-model="this.areas" id="areas6" value="Job searching skills"> Job searching skills 
                            </label><br>
                            <label class="label-2" for="areas7">
                                <input type="checkbox" v-model="this.areas" id="areas7" value="Marketing and selling skills">Marketing and selling skills
                            </label><br>
                            <label class="label-2" for="areas8">
                                <input type="checkbox" v-model="this.areas" id="areas8" value="Online Gigs and Remote jobs">Online Gigs and Remote jobs 
                            </label><br>
                            <label class="label-2" for="areas9">
                                <input type="checkbox" v-model="this.areas" id="areas9" value="Communication and Relationship building"> Communication and Relationship building   
                            </label><br>
                            <label class="label-2" for="areas10">
                                <input type="checkbox" v-model="this.areas" id="areas10" value="Fundraising and resource mobilization"> Fundraising and resource mobilization   
                            </label><br>
                            <label class="label-2" for="areas11">
                                <input type="checkbox" v-model="this.areas" id="areas11" value="Digital Skills"> Digital Skills  
                            </label><br>
                            <label class="label-2" for="areas12">
                                <input type="checkbox" v-model="this.areas" id="areas12" value="Innovation Management"> Innovation Management  
                            </label><br>
                            <label class="label-2" for="areas13">
                                <input type="checkbox" v-model="this.areas" id="areas13" value="Others"> Others  
                            </label><br>
                        </div> 
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="experience">Experience in business or career coaching</label>
                            <select class="form-control" required v-model="form.experience" id="experience">
                                <option disabled selected value="">Choose Below</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="mentees">Optimal number of mentees you can handle</label>
                            <input type="number" min="0" required class="form-control" v-model="form.mentees" id="mentees"/>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="time">Time your prefer</label>
                            <select class="form-control" required v-model="form.time" id="time">
                                <option disabled selected value="">Choose Timing</option>
                                <option value="Anytime during working hours">Anytime during working hours</option>
                                <option value="Weekdays Morning">Weekdays Morning</option>
                                <option value="Weekdays Afternoon">Weekdays Afternoon</option>
                                <option value="Weekdays Evening">Weekdays Evening</option>
                                <option value="Weekends Morning">Weekends Morning</option>
                                <option value="Weekends Afternoon">Weekends Afternoon</option>
                                <option value="Weekends Evening">Weekends Evening</option>
                            </select>
                        </div>
                    </div>
                   
                </div>
                
                
                <div class="btn-section mt-3">
                    <button class="btn btn-solid btn-lg">Submit</button>
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
  props:{user:Object},
  data() {
    return {
      loged: true,
      user: {},
      contact_mob1:this.user.phone,
      contact_mob2:"",
      contact_email:"",
      contact_region:"",
      contact_district:"",
      s_level:"",
      o_level:"",
      o_level_show:false,
      yearz:[],
      errors: [],
      areas:[],
      form:{
        sex:"",
        education_level:"",
        contact:"",
        skills:"",
        interest:"",
        expertise:"",
        experience:"",
        time:"",
        mentees:"",
        age:""
      },
      
    };
  },
  methods: {
   
    letSee(){
        alert('its works just fine')
    },
    levelSelected(){
        if(this.s_level == "other"){
            this.o_level_show = true;
        }else{
            this.o_level_show = false;
            this.o_level = ""
        }
    },
    sectorSelected(){
        if(this.s_sector == "other"){
            this.o_sector_show = true;
        }else{
            this.o_sector_show = false;
            this.o_sector = ""
        }
    },
    yearArray(){
        var y = new Date().getFullYear()
        var years = []

        for (let index = 0; index <= 20; index++) {
            years.push({'year':y - index})  
        }
        this.yearz = years

        console.log(years);
    },
    async mentorProfileForm(){
        this.errors = [];

        if(this.s_level == "other"){
            this.form.education_level = this.o_level;
        }else{
            this.form.education_level = this.s_level;
        }
        
        this.form.contact = this.contact_mob1+", "+this.contact_mob2+", "+this.contact_email+", "+this.contact_region+", "+this.contact_district

        if(this.areas.length == 0){
            alert('Check Areas of your Expertise')
        }{
            this.form.expertise = this.areas.toString()

            var response = await axios
          .post(this.$store.state.api_url + "/mentor-profile-form", this.form)
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
        
    }
  },
  created() {
    this.yearArray()
  }
};
</script>