<template>
    <!--  event cover start -->
    <div class="event-cover light-cover mb-5">
        <div class="event-img bg-size blur-up lazyloaded event-dashbord">
            <div class="event-content">
                <h1>Notes Course</h1>
            </div>
        </div>
    </div>
    <!--  event cover end -->
    <!--news feeds-->
    <div class="content-center">
        <PDFViewer
            :source="this.url"
            style="height: 100vh; width: 100vw"
            
        />
    </div>

   
</template>

<script>
import axios from "axios";
import PDFViewer from 'pdf-viewer-vue'
import * as CryptoJS from 'crypto-js';

export default {
    components: {
        PDFViewer,
    },
    data() {
        return {
            title:"",
            url:"",
            loading:true,
            user: {},
            audio:{},
            post_id:''
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
        async getDataQuery(){
            this.title = this.$route.query.title;
            this.post_id = this.$route.query.id;
            //this.url = this.$store.state.pdf_url+this.$route.query.url;
            this.url = '/assets/pdf/'+this.$route.query.url;

            var data = {
            post_id:this.$route.query.id,
            item_id:this.$route.query.id,
            type:"book"
           }

           //console.log(data)
           var response = await axios.post(this.$store.state.api_url + "/send-lean-tracker",data)
            .catch((errors) => {
            var message = "Network or Request Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });

            console.log(response)
           
        }
    },
    created() {
        this.isAuth()
        this.getDataQuery()
    }
};
</script>