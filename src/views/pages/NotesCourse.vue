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
            audio:{}
        };
    },
    methods: {
        isAuth() {
            var user = localStorage.getItem("user");
            var token = localStorage.getItem("user_token");
            if (user && token) {
                this.user = JSON.parse(user);
            } 
        },
        getDataQuery(){
            this.title = this.$route.query.title;
            //this.url = this.$store.state.pdf_url+this.$route.query.url;
            this.url = '/assets/pdf/'+this.$route.query.url;
           
        }
    },
    created() {
        this.isAuth()
        this.getDataQuery()
    }
};
</script>