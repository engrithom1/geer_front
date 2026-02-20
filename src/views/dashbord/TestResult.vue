<template>
    
    <!--news feeds-->
    <div class="content-center">
        <h2>Module Test Results</h2>
        <div class="row">
            <div class="col-md-3 col-sm-6 form-group">
                <label>Start Date</label>
                <input type="date" name="sdate" class="form-control"/>
            </div>
            <div class="col-md-3 col-sm-6 form-group">
                <label>End Date</label>
                <input type="date" name="edate" class="form-control"/>
            </div>
            <div class="col-md-3 col-sm-6 form-group">
                <label for="Level">Choose Modules</label>
                <select required v-model="this.module_id"  class="form-control">
                    <option value="" selected>All Modules</option>
                    <option v-for="group in groups" :value="group.id">{{ group.name }}</option>
                </select>
            </div>
            <div class="col-md-3 col-sm-6 form-group">
                <button type="button" v-on:click="this.filterResults()" name="sdate" style="color:white;margin-top:30px;" class="form-control btn btn-primary btn-lg">Filter Results</button>
            </div>

        </div>
        <table class="table table-triped mt-5">
            <thead>
                <th>No</th>
                <th>Name</th>
                <th>Module</th>
                <th>Duration</th>
                <th>Scored</th>
            </thead>
            <tbody v-if="!this.groups_loading">
                <div v-if="results.length == 0">
                    <h4>No Module Found</h4>
                </div>
                <tr v-for="(result, index) in results">
                    <td>{{ index+1 }}</td>
                    <td>{{ result.student }}</td>
                    <td>{{ result.module }}</td>
                    <td>{{ timeDuration((result.end_time - result.start_time)/60)+" min" }}</td>
                    <td>{{ result.scores+"/ "+result.qns }}</td>
                </tr>
            </tbody>
        </table>
       
        <div v-if="this.groups_loading" class="row">
             
             <div class="loading-img container-fluid">
                <div  class="friend-list friend-page-list">
                    <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
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
            groups:[],
            results:[],
            user: {},
            module_id:"",
            secrete:"",
            secrete2:"",
            groups_loading:true,
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
        filterResults(){
            alert('nothing to filter')
        },
        timeDuration(num){
           return parseFloat(num).toFixed(1)
        },
        async myModules() {
            var response = await axios.post(this.$store.state.api_url + "/my-groups")
            .catch((errors) => {
            var message = "Network or Request Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 
              this.groups = response.data.dataz
              console.log(response.data.dataz)
            } else {
                 var sms = response.data.message;
                this.$toast.error(sms,{duration: 5000,dismissible: true,})
                console.log(response.data.errors)
            }
        
        },
        async testResults() {
            var response = await axios.get(this.$store.state.api_url + "/get-test-results")
            .catch((errors) => {
                this.groups_loading = false
                var message = "Network or Request Errors";
                this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 
              this.results = response.data.results
              console.log(response.data.results)
            } else {
                 var sms = response.data.message;
                this.$toast.error(sms,{duration: 5000,dismissible: true,})
                console.log(response.data.errors)
            }
            this.groups_loading = false
        
        }
    },
    created() {
        this.isAuth()
        this.myModules()
        this.testResults()
        this.secrete = Math.floor(1000 + Math.random()*9000)
        this.secrete2 = Math.floor(10 + Math.random()*90)

        //console.log('sec4 -'+this.secrete+" -- sec2 -"+this.secrete2)
    }
};
</script>