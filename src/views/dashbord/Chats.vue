<style>
.user-img-group{
    position:absolute;
    top:-20px;
    left:-30px;
    width:100%
}
.user-img-group img{
    width: 35px !important;
    height: 35px !important;
}
.user-img-group h6{
    color:#555;
}
</style>
<template>
    
    <div class="container-fluid section-t-space px-0 layout-default">
        <div class="page-center w-100">

        <!--  event cover start -->
        <div class="event-cover light-cover mb-5" style="display:none;">
            <div class="event-img">
                <img src="assets/images/77.jpg" class="img-fluid blur-up lazyload bg-img" alt="">
                <div class="event-content">
                    <h1 class="text-white">Chats</h1>
                </div>
            </div>
        </div>
        <!--other content-->
        <div>
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li v-if="user.roles_id <= 2" class="nav-item">
                    <a class="nav-link active" id="home-tab" data-bs-toggle="tab" href="#uploaded" role="tab"
                        aria-selected="true">Chats</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="profile-tab" data-bs-toggle="tab" href="#album" role="tab"
                        aria-selected="false">Group Chats</a>
                </li>
                <li v-if="user.roles_id > 1" class="nav-item">
                    <a class="nav-link" id="add-group-tab" data-bs-toggle="tab" href="#add-group" role="tab"
                        aria-selected="false">Add Group</a>
                </li>
                <li v-if="user.roles_id > 1" class="nav-item">
                    <a class="nav-link" id="add-member-tab" data-bs-toggle="tab" href="#add-member" role="tab"
                        aria-selected="false">Add Member</a>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div v-if="user.roles_id <= 2" class="tab-pane fade show active" id="uploaded" role="tabpanel" aria-labelledby="home-tab">
                    <!-- messanger section start -->
                    <section class="messanger-section mt-0">
                        
                        <!--student list-->
                        <div v-if="user.roles_id == 2" class="chat-users">
                            <div class="user-header">
                               <h4>{{this.students.length}} Participants</h4>
                            </div>
                            <div v-if="this.load_members" class="loading-img container-fluid">
                                <img class="img-gif" width="300" src="/assets/images/loading/cupertino.gif" alt="#" />
                            </div>
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                
                                <li v-for="stds in students" class="nav-item" role="presentation">
                                    <a class="nav-link" v-on:click="individualMember(stds)" data-bs-toggle="tab" href="#user1" role="tab"
                                        aria-controls="user1" aria-selected="true">
                                        <div class="media list-media">
                                            <div class="story-img">
                                                <div class="user-img">
                                                    <img :src="this.$store.state.img_url+stds.avatar"
                                                        class="img-fluid blur-up lazyload bg-img" alt="user">
                                                </div>
                                            </div>
                                            <div class="media-body">
                                                <h5>{{ stds.name }} </h5>
                                                <h6>{{stds.phone}}</h6>
                                            </div>
                                        </div>
                    
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <!--mentor list-->
                        <div v-if="user.roles_id == 1" class="chat-users">
                            <div class="user-header">
                               <h4>{{this.mentors.length}} My Mentors</h4>
                            </div>
                            <div v-if="this.load_members" class="loading-img container-fluid">
                                <img class="img-gif" width="300" src="/assets/images/loading/cupertino.gif" alt="#" />
                            </div>
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                
                                <li v-for="stds in mentors" class="nav-item" role="presentation">
                                    <a class="nav-link" v-on:click="individualMember(stds)" data-bs-toggle="tab" href="#user1" role="tab"
                                        aria-controls="user1" aria-selected="true">
                                        <div class="media list-media">
                                            <div class="story-img">
                                                <div class="user-img">
                                                    <img :src="this.$store.state.img_url+stds.avatar"
                                                        class="img-fluid blur-up lazyload bg-img" alt="user">
                                                </div>
                                            </div>
                                            <div class="media-body">
                                                <h5>{{ stds.name }} </h5>
                                                <h6>{{stds.phone}}</h6>
                                            </div>
                                        </div>
                    
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <!--ends here-->

                        <div class="chat-content">
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="user1" role="tabpanel" aria-labelledby="user1">
                                    <div class="tab-box">
                                        <div class="user-chat">
                                            <div class="user-title">
                                                <div class="back-btn d-block d-sm-none">
                                                    <i data-feather="arrow-left"></i>
                                                </div>
                                                <div v-if="active_member.id > 0" class="media list-media">
                                                    <div class="story-img">
                                                        <div class="user-img">
                                                            <img :src="this.$store.state.img_url+active_member.avatar"
                                                                class="img-fluid blur-up lazyload bg-img"
                                                                alt="user">
                                                        </div>
                                                    </div>
                                                    <div class="media-body">
                                                        <h5>{{ active_member.name }} </h5>
                                                        <h6>{{ active_member.phone }}</h6>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div class="chat-history w-100">
                                                <div class="avenue-messenger">
                                                    <div class="chat">
                                                        <div v-if="this.load_ind_chats" class="loading-img container-fluid">
                                                            <img class="img-gif" width="300" src="/assets/images/loading/cupertino.gif" alt="#" />
                                                        </div>
                                                        <div v-if="this.individual_chats.length > 0" class="messages-content">
                                                
                                                            <div v-for="ind_chats in this.individual_chats" :class="messageClass(ind_chats.sender_id)" style="padding-bottom:0px !important; margin-top: 0px !important; margin-bottom: 15px !important">
                                                                {{ ind_chats.message }}
                                                                <div class="timestamp">{{sentTime(ind_chats.created_at,ind_chats.time_sec)}}</div>
                                                            </div>
                                                            
                                                        </div>
                                                        <h3 class="p-3" v-if="this.individual_chats.length == 0">No chat messages</h3>
                                                        <div class="message-box">
                                                            <textarea v-model="this.individual_sms" class="message-input emojiPicker"
                                                                :placeholder="'write to '+active_member.name "></textarea>
                                                            <!--div class="add-extent">
                                                                <i class="fas fa-plus animated-btn"></i>
                                                                <div class="options">
                                                                    <ul>
                                                                        <li><img src="assets/svg/image.svg"
                                                                                alt=""></li>
                                                                        <li><img src="assets/svg/paperclip.svg"
                                                                                alt=""></li>
                                                                        <li><img src="assets/svg/camera.svg"
                                                                                alt=""></li>
                                                                    </ul>
                                                                </div>
                                                            </div-->
                                                            <button v-on:click="sendToIndividual()" class="message-submit"><i
                                                                   class="fa fa-send"></i>send</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <!-- messanger section end -->
                </div>
                <div :class="activeForAdmin()" id="album" role="tabpanel" aria-labelledby="profile-tab">
                   <!-- messanger section start -->
                   <section class="messanger-section mt-0">
                        
                        <!--student list-->
                        <div class="chat-users">
                            <div class="user-header">
                               <h4>{{this.chat_groups.length}} Groups</h4>
                            </div>
                            <div v-if="this.load_groups" class="loading-img container-fluid">
                                <img class="img-gif" width="300" src="/assets/images/loading/cupertino.gif" alt="#" />
                            </div>
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                
                                <li v-for="chatg in chat_groups" class="nav-item" role="presentation">
                                    <a class="nav-link" v-on:click="activeGroup(chatg)" data-bs-toggle="tab" href="#user1" role="tab"
                                        aria-controls="user1" aria-selected="true">
                                        <div class="media list-media">
                                            <div class="story-img">
                                                <div class="user-img">
                                                    <img :src="this.$store.state.img_url+chatg.avatar"
                                                        class="img-fluid blur-up lazyload bg-img" alt="user">
                                                </div>
                                            </div>
                                            <div class="media-body">
                                                <h5>{{ chatg.name }} </h5>
                                                <h6>{{chatg.created_by}}</h6>
                                            </div>
                                        </div>
                    
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div class="chat-content">
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="user1" role="tabpanel" aria-labelledby="user1">
                                    <div class="tab-box">
                                        <div class="user-chat">
                                            <div class="user-title">
                                                <div class="back-btn d-block d-sm-none">
                                                    <i data-feather="arrow-left"></i>
                                                </div>
                                                <div v-if="active_group.id > 0" class="media list-media">
                                                    <div class="story-img">
                                                        <div class="user-img">
                                                            <img :src="this.$store.state.img_url+active_group.avatar"
                                                                class="img-fluid blur-up lazyload bg-img"
                                                                alt="user">
                                                        </div>
                                                    </div>
                                                    <div class="media-body">
                                                        <h5>{{ active_group.name }} </h5>
                                                        <h6>{{ active_group.created_by }}</h6>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div class="chat-history w-100">
                                                <div class="avenue-messenger">
                                                    <div class="chat">
                                                        <div v-if="this.load_group_chats" class="loading-img container-fluid">
                                                            <img class="img-gif" width="300" src="/assets/images/loading/cupertino.gif" alt="#" />
                                                        </div>
                                                        <div v-if="this.group_messages.length > 0" class="messages-content">
                                                
                                                            <div v-for="g_chats in this.group_messages" :class="messageClass(g_chats.sender_id)" style="padding-bottom:0px !important; margin-top: 15px !important; margin-bottom: 15px !important">
                                                                <div v-if="g_chats.sender_id != this.user.id" class="user-img user-img-group d-flex justify-content-between">
                                                                    <img :src="this.$store.state.img_url+g_chats.avatar"
                                                                        class="img-fluid blur-up lazyload bg-img"
                                                                        alt="user">
                                                                        <h6>{{g_chats.name}}</h6>
                                                                </div>
                                                                {{ g_chats.message }}
                                                                <div class="timestamp">{{sentTime(g_chats.created_at,g_chats.time_sec)}}</div>
                                                            </div>
                                                            
                                                        </div>
                                                        <h3 class="p-3" v-if="this.group_messages.length == 0">No group messages</h3>
                                                        <div class="message-box">
                                                            <textarea v-model="this.group_sms" class="message-input emojiPicker"
                                                                :placeholder="'write to '+active_group.name "></textarea>
                                                            <!--div class="add-extent">
                                                                <i class="fas fa-plus animated-btn"></i>
                                                                <div class="options">
                                                                    <ul>
                                                                        <li><img src="assets/svg/image.svg"
                                                                                alt=""></li>
                                                                        <li><img src="assets/svg/paperclip.svg"
                                                                                alt=""></li>
                                                                        <li><img src="assets/svg/camera.svg"
                                                                                alt=""></li>
                                                                    </ul>
                                                                </div>
                                                            </div-->
                                                            <button :disabled="this.ind_btn_click" v-on:click="sendToGroup()" class="message-submit"><i
                                                                   class="fa fa-send"></i>send</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <!-- messanger section end -->
                </div>
                <div v-if="user.roles_id > 1" class="tab-pane fade bg-white" id="add-group" role="tabpanel" aria-labelledby="add-group-tab">
                    <div class="p-5">
                        <div class="row">
                            <div class="col-md-6">
                                <div v-if="this.btn_click" class="loading-img container-fluid">
                                    <img class="img-gif" width="300" src="/assets/images/loading/cupertino.gif" alt="#" />
                                </div>
                               <form class="form">
                                   <div class="form-group">
                                        <label>Group Name</label>
                                        <input type="text" class="form-control" v-model="this.group_name"/>
                                   </div>
                                   <div class="form-group">
                                        <label>Description (200 char)</label>
                                        <textarea col="30" class="form-control" v-model="this.group_description"></textarea>
                                   </div>
                                   <div class="form-group mt-3">
                                        <button :disabled="this.btn_click" v-on:click="this.createGroup()" class="btn btn-primary">Add Group</button>
                                   </div>
                               </form>
                            </div>
                            <div class="col-md-5">
                                <h3>My Groups</h3>
                                <table class="table table-triped mt-5">
                                    <thead>
                                        <th>No</th>
                                        <th>Name</th>
                                    </thead>
                                    <tbody>
                                        <div v-if="groups.length == 0">
                                            <h4>No Group Found</h4>
                                        </div>
                                        <tr v-for="(group, index) in groups">
                                            <td>{{ index+1 }}</td>
                                            <td>{{ group.name }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="user.roles_id > 1" class="tab-pane fade bg-white" id="add-member" role="tabpanel" aria-labelledby="add-member-tab">
                    <div class="p-5">
                        <div class="row">
                            <div class="col-md-6">
                                <div v-if="this.add_btn_click" class="loading-img container-fluid">
                                    <img class="img-gif" width="300" src="/assets/images/loading/cupertino.gif" alt="#" />
                                </div>
                               <form class="form">
                                   <div class="form-group">
                                        <label>Group Name</label>
                                        <select required v-model="this.group_id" v-on:change="selectedGroup()"  class="form-control">
                                            <option value="" disabled selected>Select Group</option>
                                            <option v-for="group in groups" :value="group.id">{{ group.name }}</option>
                                        </select>
                                   </div>
                               </form>
                               <h3>Remain Participants</h3>
                                <table class="table table-triped mt-5">
                                    <thead>
                                        <th>No</th>
                                        <th>Name</th>
                                        <th></th>
                                    </thead>
                                    <tbody>
                                        <div v-if="studentz.length == 0">
                                            <h4>No Participant Found</h4>
                                        </div>
                                        <tr v-for="(stdz, index) in studentz">
                                            <td>{{ index+1 }}</td>
                                            <td>{{ stdz.name }}</td>
                                            <td>
                                                <button :disabled="this.add_btn_click" v-on:click="this.addGroupMember(stdz)" class="btn btn-success">
                                                    <i class="fa fa-plus"></i>
                                                </button>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                            <div class="col-md-6">
                                <h3>Exist Members</h3>
                                <table class="table table-triped mt-5">
                                    <thead>
                                        <th>No</th>
                                        <th>Name</th>
                                        <th></th>
                                    </thead>
                                    <tbody>
                                        <div v-if="memberz.length == 0">
                                            <h4>No Member Found</h4>
                                        </div>
                                        <tr v-for="(member, index) in memberz">
                                            <td>{{ index+1 }}</td>
                                            <td>{{ member.name }}</td>
                                            <td>
                                                <button :disabled="this.add_btn_click" v-on:click="this.removeGroupMember(member)" class="btn btn-danger">
                                                    <i class="fa fa-empty"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
<!-- end of cotent -->
    </div>
</div>        

</template>

<script>
import axios from "axios";
import moment from "moment";
import * as CryptoJS from 'crypto-js';

export default {
    components: {
    },
    data() {
        return {
            top_posts:[],
            other_posts:[],
            groups:[],
            students:[],
            members:[],
            studentz:[],
            memberz:[],
            mentors:[],
            individual_chats:[],
            group_messages:[],
            chat_groups:[],
            active_member:{},
            active_group:{},
            individual_sms:"",
            group_sms:"",
            loading:true,
            load_members:true,
            load_groups:true,
            btn_click:false,
            add_btn_click:false,
            ind_btn_click:false,
            load_ind_chats:false,
            load_group_chats:false,
            group_name:"",
            group_description:"",
            group_id:"",
            person_id:"",
            user: {},
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
        sentTime(created_at,time_sec){
           var d = new Date()
           var now_sec = Math.round(d.getTime()/1000)
           var secx = now_sec - time_sec

           if((secx) < 60){
            return 'just now'
           }
           if((secx) > 60 && secx < 3600){
            var min =  Math.round(secx/60)
            return min+' min ago'
           }
           if((secx) > 3600){
            return moment(created_at).format('MM/DD/YYYY hh:mm')
           }
        },
        messageClass(sender_id){
           if(sender_id == this.user.id){
            return 'message new'
           }else{
            return 'message message-personal new'
           }
        },
        activeForAdmin(){
           if(this.user.roles_id == 3){
            return 'tab-pane fade show active'
           }else{
            return 'tab-pane fade'
           }
        },
        async activeGroup(group){
            this.active_group = group
            var receiver_id = group.id

            this.load_group_chats = true

            var response = await axios
            .post(this.$store.state.api_url + "/get-group-messages", {receiver_id})
            .catch((errors) => {
                this.load_group_chats = false;
                var message = "Network or Request Errors";
                this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
                if (response.data.success) {
                    this.load_group_chats = false;
                   
                    this.group_messages = response.data.messages;
                    //console.log(this.individual_chats)

                //var message = response.data.message;
                //this.$toast.success(message,{duration: 7000,dismissible: true,})
                
                } else {
                    this.load_group_chats = false;
                    var message = response.data.message;
                    this.$toast.error(message,{duration: 7000,dismissible: true,})
                    //this.errors = response.data.errors;
                }

            
        },
        async individualMember(member){
            this.active_member = member
            var receiver_id = member.id

            this.load_ind_chats = true

            var response = await axios
            .post(this.$store.state.api_url + "/get-individual-chats", {receiver_id})
            .catch((errors) => {
                this.load_ind_chats = false;
                var message = "Network or Request Errors";
                this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
                if (response.data.success) {
                    this.load_ind_chats = false;
                   
                    this.individual_chats = response.data.chats;
                    //console.log(this.individual_chats)

                //var message = response.data.message;
                //this.$toast.success(message,{duration: 7000,dismissible: true,})
                
                } else {
                    this.load_ind_chats = false;
                    var message = response.data.message;
                    this.$toast.error(message,{duration: 7000,dismissible: true,})
                    //this.errors = response.data.errors;
                }

            
        },
        async sendToIndividual(){
           
            var message = this.individual_sms;
            var receiver_id = this.active_member.id
            var chats = this.individual_chats
            
            this.ind_btn_click = true;
            var response = await axios
            .post(this.$store.state.api_url + "/send-to-individual", {message, receiver_id})
            .catch((errors) => {
                this.ind_btn_click = false;
                var message = "Network or Request Errors";
                this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
                if (response.data.success) {
                    var chat = response.data.chat
                    this.ind_btn_click = false;
                    this.individual_sms = "";
                    this.individual_chats = chats.concat(chat);
                    console.log(this.individual_chats)

                //var message = response.data.message;
                //this.$toast.success(message,{duration: 7000,dismissible: true,})
                
                } else {
                    this.ind_btn_click = false;
                    var message = response.data.message;
                    this.$toast.error(message,{duration: 7000,dismissible: true,})
                    this.errors = response.data.errors;
                }

        },
        async sendToGroup(){
           
           var message = this.group_sms;
           var group_id = this.active_group.id
           var group_heading = this.active_group.name
           var chats = this.group_messages
           
           this.ind_btn_click = true;
           var response = await axios
           .post(this.$store.state.api_url + "/send-to-group", {message, group_id, group_heading})
           .catch((errors) => {
               this.ind_btn_click = false;
               var message = "Network or Request Errors";
               this.$toast.error(message,{duration: 7000,dismissible: true,})
           });
               if (response.data.success) {
                   var chat = response.data.chat
                   this.ind_btn_click = false;
                   this.group_sms = "";
                   this.group_messages = chats.concat(chat);
                   console.log(this.group_messages)

               //var message = response.data.message;
               //this.$toast.success(message,{duration: 7000,dismissible: true,})
               
               } else {
                   this.ind_btn_click = false;
                   var message = response.data.message;
                   this.$toast.error(message,{duration: 7000,dismissible: true,})
                   this.errors = response.data.errors;
               }

       },
        selectedGroup(){
            var group_id = this.group_id;
            var members = this.members;
            var students = this.students;

            this.memberz = members.filter((i) => i.group_id == group_id);

            var studentzz = students.filter(i =>{
                return members.filter(t =>{
                    return i.id == t.id
                }).length == 0;
            });

            this.studentz = studentzz
            console.log(students)
            console.log(members)
        },
        async createGroup() {
        this.btn_click = true;
        var response = await axios
          .post(this.$store.state.api_url + "/create-group-chats", {description : this.group_description, name: this.group_name})
          .catch((errors) => {
            this.btn_click = false;
            var message = "Network or Request Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
          });
            if (response.data.success) {
                this.btn_click = false;
              this.groups = response.data.groups;

              console.log(this.groups)

              var message = response.data.message;
              this.$toast.success(message,{duration: 7000,dismissible: true,})
             
            } else {
                this.btn_click = false;
                var message = response.data.message;
                this.$toast.error(message,{duration: 7000,dismissible: true,})
                this.errors = response.data.errors;
            }
        },
        async addGroupMember(member) {
            var user_id = member.id;
            var group_id = this.group_id
            this.add_btn_click = true;

            var response = await axios
            .post(this.$store.state.api_url + "/add-group-member", {user_id, group_id})
            .catch((errors) => {
                this.add_btn_click = false;
                var message = "Network or Request Errors";
                this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
                if (response.data.success) {
                    this.add_btn_click = false;

                   this.memberz.push(member)
                   //this.members.push(member)

                   //this.students = this.students.filter((i) => i.id != user_id);
                   this.studentz = this.studentz.filter((i) => i.id != user_id);

                var message = response.data.message;
                this.$toast.success(message,{duration: 7000,dismissible: true,})
                
                } else {
                    this.add_btn_click = false;
                    var message = response.data.message;
                    this.$toast.error(message,{duration: 7000,dismissible: true,})
                    //this.errors = response.data.errors;
                }
        },
        async removeGroupMember(member) {
            var user_id = member.id;
            var group_id = this.group_id
            this.add_btn_click = true;

            var response = await axios
            .post(this.$store.state.api_url + "/remove-group-member", {user_id, group_id})
            .catch((errors) => {
                this.add_btn_click = false;
                var message = "Network or Request Errors";
                this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
                if (response.data.success) {
                    this.add_btn_click = false;

                   this.studentz.push(member)
                  // this.students.push(member)

                   //this.members = this.members.filter((i) => i.id != user_id);
                   this.memberz = this.memberz.filter((i) => i.id != user_id);

                var message = response.data.message;
                this.$toast.success(message,{duration: 7000,dismissible: true,})
                
                } else {
                    this.add_btn_click = false;
                    var message = response.data.message;
                    this.$toast.error(message,{duration: 7000,dismissible: true,})
                    //this.errors = response.data.errors;
                }
        },
        async getGroups() {
            
            var response = await axios.post(this.$store.state.api_url + "/get-group-chats")
            .catch((errors) => {
                this.load_groups = false
            var message = "Network or Request Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) {
              this.groups = response.data.groups
              this.chat_groups = response.data.chat_groups
              
            } else {
                console.log(response.data.errors)
            }

            this.load_groups = false
        
        },
        async getChatMembers() {
            
            var response = await axios.post(this.$store.state.api_url + "/get-chat-members")
            .catch((errors) => {
                this.load_members = false;
            var message = "Network or Request Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 
                if(response.data.user == 'mentor'){
                    this.students = response.data.students
                    this.members = response.data.members
                }
                if(response.data.user == 'student'){
                    this.mentors = response.data.mentors
                }
                if(response.data.user == 'admin'){
                    //this.groups = response.data.groups
                }

              
            } else {
                console.log(response.data.errors)
            }

            this.load_members = false
        
        }
    },
    created() {
        this.isAuth()
        this.getGroups()
        this.getChatMembers()
        var user_cry = localStorage.getItem("user") || "";
    var user = CryptoJS.AES.decrypt(user_cry, 'user').toString(CryptoJS.enc.Utf8) || null

    user = JSON.parse(user);
    window.Echo.private('private-test-'+user.id).listen('Hello',(e)=>{
       console.log('go private');
       //code for displaying the serve data
       console.log(e); // the data from the server
    })
    },
  mounted(){
    var user_cry = localStorage.getItem("user") || "";
    var user = CryptoJS.AES.decrypt(user_cry, 'user').toString(CryptoJS.enc.Utf8) || null

    user = JSON.parse(user);
    window.Echo.private('private-test-'+user.id).listen('Hello',(e)=>{
       console.log('go private');
       //code for displaying the serve data
       console.log(e); // the data from the server
    })
  }
};
</script>