<template>
    <div class="login-discription text-center ">
        <h3>(Form 1 of 3)</h3>
        <h1>Personal Information</h1>
    </div>
    <div class="form-sec mt-3">
        <div>
            <form @submit.prevent="studentProfile" class="theme-form">
                <p v-for="error in errors" :key="error" class="text-danger">
                    {{ error[0] }}
                  </p>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="age">Age</label>
                            <select class="form-control" required v-model="form.age" id="age">
                                <option disabled selected value="">Select Age</option>
                                <option value="Below 18">Below 18</option>
                                <option value="18 to 24">18 to 24</option>
                                <option value="25 to 30">25 to 30</option>
                                <option value="31 to 35">31 to 35</option>
                                <option value="Above 35">Above 35</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="sex">Sex</label>
                            <select class="form-control" required v-model="form.sex" id="sex">
                                <option disabled selected value="">Select Sex</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="marital">Marital Status</label>
                            <select class="form-control" required v-model="form.marital" id="marital">
                                <option disabled selected value="">Choose Status</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option> 
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
                            <input type="text" required class="form-control" v-model="contact_mob1" id="mob1"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="mob2">Mobile No1</label>
                            <input type="text" required class="form-control" v-model="contact_mob2" id="mob2"/>
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
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="marital">Completion Year</label>
                            <select class="form-control" required v-model="form.graduate_year" id="marital">
                                <option disabled selected value="">Select Year</option>
                                <option v-for="year in yearz" :value="year.year" :key="year.year">{{ year.year }}</option> 
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="college">Institution/College</label>
                            <input type="text" required class="form-control" v-model="form.college" id="college"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="course">Course you Pursue</label>
                            <input type="text" required class="form-control" v-model="form.course" id="course"/>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="Sector">Sector you Prefer</label>
                            <select class="form-control" v-on:change="sectorSelected()" required v-model="s_sector" id="Sector">
                                <option disabled selected value="">Choose Sector</option>
                                <option value="Agriculture, Agribusiness or Agro processing">Agriculture, Agribusiness or Agro processing</option>
                                <option value="Transport and Logistics">Transport and Logistics</option>
                                <option value="Tourism and Hospitality">Tourism and Hospitality</option>
                                <option value="Construction">Construction</option>
                                <option value="Information and communication Technology">Information and communication Technology</option>
                                <option value="Energy">Energy</option>
                                <option value="other">Other, specify</option>
                            </select>
                            <input v-if="this.o_sector_show" class="form-control" placeholder="Specify Sector you prefer" type="text" v-model="this.o_sector" id="">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="Device">Device you use</label>
                            <select class="form-control" required v-model="form.device" id="Device">
                                <option disabled selected value="">Choose Device</option>
                                <option value="Smart Phone">Smart Phone</option>
                                <option value="Laptop Computer">Laptop Computer</option>
                                <option value="Tablet">Tablet</option>
                                <option value="Smart TV">Smart TV</option>
                                <option value="None">None</option>
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
  data() {
    return {
      loged: true,
      user: {},
      contact_mob1:"",
      contact_mob2:"",
      contact_email:"",
      contact_region:"",
      contact_district:"",
      device_other:"",
      sector_other:"",
      s_level:"",
      o_level:"",
      o_level_show:false,
      s_sector:"",
      o_sector:"",
      o_sector_show:false,
      yearz:[],
      errors: [],
      form:{
        age:"",
        sex:"",
        marital:"",
        education_level:"",
        graduate_year:"",
        college:"",
        course:"",
        device:"",
        contact:"",
        sector:"",
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
    async studentProfile(){
        this.errors = [];

        if(this.s_level == "other"){
            this.form.education_level = this.o_level;
        }else{
            this.form.education_level = this.s_level;
        }

        if(this.s_sector == "other"){
            this.form.sector = this.o_sector;
        }else{
            this.form.sector = this.s_sector;
        }

        this.form.contact = this.contact_mob1+", "+this.contact_mob2+", "+this.contact_email+", "+this.contact_region+", "+this.contact_district

        //console.log(this.form); /student-profile-form
        var response = await axios
          .post(this.$store.state.api_url + "/student-profile-form", this.form)
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
    this.yearArray()
  }
};
</script>