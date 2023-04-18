<template>
<adminHeaderComp subHeaderName="Admin Details"/>

<div class="grid grid-cols-4 gap-1" style="grid-auto-rows: minmax(10px, auto); grid-auto-columns: max-content;">
    <div class="userDetailsHeader">Admin ID:</div>
    <div class="border p-2">{{ userID }}</div>
    <div class="userDetailsHeader">Full Name:</div>
    <div class="border p-2">{{ fullName }}</div>
    <div class="userDetailsHeader">Age:</div>
    <div class="border p-2">{{ age }}</div>
    <div class="userDetailsHeader">Email:</div>
    <div class="border p-2">{{ email }}</div>
</div>
<br><br><hr>

<div class="grid grid-cols-2 gap-2" style="grid-auto-rows: minmax(10px, auto); grid-auto-columns: max-content;">
    <div class="grid grid-cols-2 gap-1">
    <div class="userDetailsHeader bg-purple-400 flex justify-center items-center">Total number of students:</div>
        <div class="border p-2 flex justify-center items-center">{{ totalStudentCount }}</div>
        <div class="userDetailsHeader bg-red-400 flex justify-center items-center">Total universities:</div>
        <div class="border p-2 flex justify-center items-center">{{ totalUniveristyCount }}</div>
</div>
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
            email: '',
            totalStudentCount: 0,
            totalUniveristyCount: 0

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
                    let overallData = res.data.data;
                    let responseData = overallData[0];
                    this.totalStudentCount = overallData[1][0].studentCount;
                    this.totalUniveristyCount = overallData[2][0].universityCount;
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
        let userName =localStorage.getItem('user-name');
        if(!userName){
            return this.$router.push({name:'homePage'})
        }
        this.loadAdminDetails();
    }
}
</script>

<style>
</style>
