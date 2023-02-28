<template>
<div class="header">
    <h2>Working Student</h2>
    <div class="header-right">
        <button type="button" v-on:click="backToMainPage()">Home</button>
        <button type="button" v-on:click="workingHoursPage()">Enter Working Hrs</button>
        <button type="button" v-on:click="companyDetailsPage()">Company Details</button>
        <button type="button" v-on:click="getUserDetails()">{{userName}}</button>
        <button type="button" v-on:click="logout()">Log out</button>
    </div>
</div>
</template>

<script>
export default{
    name:'headerComp',
    data(){
        return{
            userName:''
        }
    },
    mounted(){
        let userInfo = localStorage.getItem("user-name");
        if(userInfo != null){
            userInfo = userInfo.substring(1, (userInfo.length - 1));
            this.userName = userInfo;
        }
    },
    methods:{
        logout(){
            localStorage.clear();
            this.$router.push({
                name:'loginPage'
            })
        },
        backToMainPage(){
            return this.$router.push({
                path:'/dashboard'
            })
        },
        companyDetailsPage(){
            return this.$router.push({
                name:'companyDetailsPage'
            })
        },
        workingHoursPage(){
            return this.$router.push({
                name:'workingHoursPage'
            })
        },
        getUserDetails(){
            return this.$router.push({
                name:'userDetailPage'
            })
        }
    }
}
</script>

<style>
.header {
    overflow: hidden;
    background-color: #7a0e0e;
    /* padding: 0px 0px; */
}
.header button {
    float: left;
    color: black;
    text-align: center;
    padding: 5px;
    text-decoration: none;
    font-size: 14px;
    line-height: 15px;
    border-radius: 0px;
}
.header button:hover {
    background-color: #ddd;
    color: black;
}
.header-right {
    float: right;
}
@media screen and (max-width: 500px) {
    .header a {
        float: none;
        display: block;
        text-align: left;
    }
    .header-right {
        float: none;
    }
}
button {
    cursor: pointer;
}
</style>