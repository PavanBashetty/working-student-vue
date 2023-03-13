<template>
<adminHeaderComp subHeaderName="Admin Details"/>

<div>
    <p><b>Admin ID: </b>{{userID }}</p>
    <p><b>Full Name: </b>{{ fullName}}</p>
    <p><b>Age: </b>{{age }}</p>
    <p><b>Email: </b>{{email }}</p>
</div>
</template>

<script>
import adminHeaderComp from './adminHeader.vue';
import axios from 'axios';
export default {
    name: 'adminDetailsComp',
    data() {
        return {
            userName: 'Admin',
            userID: '',
            fullName: '',
            age: '',
            email: ''
        }
    },
    components:{
        adminHeaderComp
    },
    methods: {
        async loadAdminDetails() {
            this.userID = localStorage.getItem("user-id");
            await axios.get("/api/admindetails/" + this.userID)
                .then((res) => {
                    let responseData = res.data.data;
                    this.userID = responseData[0].user_id;
                    this.fullName = (responseData[0].first_name).concat(" ", responseData[0].last_name);
                    this.age = responseData[0].age;
                    this.email = responseData[0].email;
                })
                .catch(() => {
                    console.log("Data could not be retrieved");
                })
        }
    },
    mounted() {
        this.loadAdminDetails();
    }
}
</script>

<style>
</style>
