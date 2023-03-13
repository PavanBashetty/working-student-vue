<template>
<div class="header">
    <div class="sub-header-one">
        <div style="text-align: center;">
            <h1>{{ subHeaderName }}</h1>
        </div>
        <div style="text-align: end; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
            <h1>Working Student App </h1>
        </div>
    </div>

    <div class="header-right">
        <button type="button" v-on:click="logout()">Log out</button>
        <button type="button" v-on:click="getUserDetails()">{{userName}}</button>
        <button type="button" v-on:click="workingHoursPage()">Enter Working Hrs</button>
        <button type="button" v-on:click="companyDetailsPage()">Company Details</button>
        <button type="button" v-on:click="backToMainPage()">Home</button>
    </div>
</div>
</template>

<script>
export default {
    name: 'headerComp',
    data() {
        return {
            userName: ''
        }
    },
    props: {
        subHeaderName: String
    },
    mounted() {
        let userInfo = localStorage.getItem("user-name");
        if (userInfo != null) {
            userInfo = userInfo.substring(1, (userInfo.length - 1));
            this.userName = userInfo;
        }
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push({
                name: 'loginPage'
            })
        },
        backToMainPage() {
            return this.$router.push({
                path: '/dashboard'
            })
        },
        companyDetailsPage() {
            return this.$router.push({
                name: 'companyDetailsPage'
            })
        },
        workingHoursPage() {
            return this.$router.push({
                name: 'workingHoursPage'
            })
        },
        getUserDetails() {
            return this.$router.push({
                name: 'userDetailPage'
            })
        }
    }
}
</script>

<style>
.header {
    display: grid;
    overflow: hidden;
    grid-template-rows: 5em 2.2em;
    background-color: #9ccff3;
    padding: 5px 10px;
}

.sub-header-one{
    display: grid;
    grid-template-columns: 50% 50%;
}

.header button {
    float: right;
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
