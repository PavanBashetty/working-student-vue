<template>
<headerComp subHeaderName="User Details" />

<!--USER BASIC INFO DETAILS-->
<div class="grid grid-cols-4 gap-1" style="grid-auto-rows: minmax(10px, auto); grid-auto-columns: max-content;">
    <div class="userDetailsHeader">User ID:</div>
    <div class="border p-2">{{ userID }}</div>
    <div class="userDetailsHeader">Full Name:</div>
    <div class="border p-2">{{ fullName }}</div>
    <div class="userDetailsHeader">Age:</div>
    <div class="border p-2">{{ age }}</div>
    <div class="userDetailsHeader">Email:</div>
    <div class="border p-2">{{ email }}</div>
</div>
<br>
<!--USER'S work related info-->
<div class="grid grid-cols-2 gap-2" style="grid-auto-rows: minmax(10px, auto); grid-auto-columns: max-content;">
    <div class="grid grid-cols-2 gap-1">
        <div class="userDetailsHeader bg-green-400 flex justify-center items-center">Active Companies:</div>
        <div class="border p-2 flex justify-center items-center">{{ activeCompanyCount }}</div>
        <div class="userDetailsHeader bg-red-400 flex justify-center items-center">Inactive Companies:</div>
        <div class="border p-2 flex justify-center items-center">{{ inactiveCompanyCount }}</div>
    </div>
    <div class="grid grid-cols-2 gap-1">
        <div class="userDetailsHeader bg-green-400">Total Hours Worked [Active]</div>
        <div class="border p-2 flex justify-center items-center bg-green-100">{{ hoursWorkedAtCurrActiveCompanies}}</div>
        <div class="userDetailsHeader bg-red-400">Total Hours Worked [Inctive]</div>
        <div class="border p-2 flex justify-center items-center bg-red-100">{{ hoursWorkedAtInactiveCompanies }}</div>
        <div class="userDetailsHeader bg-blue-400">Remaining Work Hours:</div>
        <div class="border p-2 flex justify-center items-center bg-blue-100">{{ remainingWorkHours }}</div>
    </div>
</div>
<br><br>
<hr>

<!--TABLE TO DISPLAY PAYMENT-->
<!-- <h3 class="text-xl font-bold text-justify">Payment:</h3> -->
<div class="grid grid-cols-5" v-show="paymentTable">
    <div v-for="company in companies" :key="company">
        <table class="border-collapse border border-solid">
            <thead>
                <tr>
                    <th colspan="3" class="border p-2 bg-orange-300">{{company}}</th>
                </tr>
                <tr class="bg-red-100">
                    <th class="border p-2">Month</th>
                    <th class="border p-2">Gross Sal</th>
                    <th class="border p-2">Net Sal</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="month in months" :key="month">
                    <td class="border p-2 font-bold bg-orange-50">{{month}}</td>
                    <td class="border p-2">1000</td>
                    <td class="border p-2">800</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
import headerComp from '../components/header.vue'
import axios from 'axios';
export default {
    name: 'userDetailComp',
    components: {
        headerComp
    },
    data() {
        return {
            userID: '',
            fullName: '',
            age: '',
            email: '',
            companies: [],
            activeCompanyCount: 0,
            inactiveCompanyCount: 0,
            hoursWorkedAtCurrActiveCompanies: 0,
            hoursWorkedAtInactiveCompanies: 0,
            remainingWorkHours: 0,
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            paymentTable: false
        }
    },
    mounted() {
        let userName =localStorage.getItem('user-name');
        if(!userName){
            return this.$router.push({name:'homePage'})
        }
        this.userID = localStorage.getItem("user-id");
        this.loaduserDetails();
        this.getCompanyActivityDetails();
    },
    methods: {
        async loaduserDetails() {
            await axios.get("/api/userdetails/" + this.userID)
                .then((res) => {
                    let responseData = res.data.data;
                    this.fullName = (responseData[0].first_name).concat(" ", responseData[0].last_name);
                    this.age = responseData[0].age;
                    this.email = responseData[0].email;
                })
                .catch(() => {
                    console.log("Data could not be retreived");
                })
        },
        async getCompanyActivityDetails(){
            await axios.get("/api/getcompanyactivitydetails/"+this.userID)
            .then((res)=>{
                let responseData = res.data.data;
                for(let i=0; i<responseData.length;i++){
                    //console.log(responseData[i]);
                    this.companies.push(responseData[i].company_name)
                    if(responseData[i].working_status == "Active"){
                        this.activeCompanyCount++;
                        this.hoursWorkedAtCurrActiveCompanies += parseFloat(responseData[i].hours_worked)
                    }else{
                        this.inactiveCompanyCount++;
                        this.hoursWorkedAtInactiveCompanies += parseFloat(responseData[i].hours_worked)
                    }
                }
                this.remainingWorkHours = 960 - (this.hoursWorkedAtCurrActiveCompanies + this.hoursWorkedAtInactiveCompanies)
            })
            .catch(()=>{
                console.log("Data could not be retreived");
            })
        }
    }
}
</script>

<style>
.userDetailsHeader {
    @apply font-bold border p-2 bg-gray-300 text-gray-700
}
</style>
