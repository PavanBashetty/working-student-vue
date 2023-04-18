<template>
<div style="background-color:brown; padding: 1px">
    <h1 style="text-align:center">Log in Page</h1>
</div>
<div class="form-center">
    <input type="email" placeholder="Enter your email" id="email" v-model="email" /><br /><br />
    <input type="text" placeholder="Enter your password" id="password" v-model="password" /><br /><br />
    <button class="login" type="button" v-on:click="login()">Login</button>
</div>

<div>
    <button class="back" type="button" v-on:click="homePage()">Back</button>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'loginComp',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async login() {
            let emailID = this.email;
            let pword = this.password;
            await axios.get("/api/login/" + emailID)
                .then((res) => {
                    let result = res.data.data;
                    if (result.length > 0) {
                        if ((result[0].user_password == pword) && (res.status == 200)) {
                            localStorage.setItem("user-name", JSON.stringify(result[0].first_name));
                            localStorage.setItem("user-id", JSON.stringify(result[0].user_id));
                            localStorage.setItem("isAdmin", JSON.stringify(result[0].isAdmin));
                            alert('Login Successfull');
                            if(result[0].isAdmin == 'true'){
                                this.$router.push({
                                    name:'adminPage'
                                })
                            }else{
                                this.$router.push({
                                    name:'dashboardPage'
                                })
                            }
                        } else {
                            alert("Incorrect password");
                            this.password = '';
                        }
                    } else {
                        alert("Account doesn't exist. Please enter proper details");
                        this.email = '';
                        this.password = '';
                    }
                })
        },
        homePage() {
            return this.$router.push({
                name: 'homePage'
            })
        }
    },
    mounted(){
        let isAdmin = localStorage.getItem('isAdmin');
        if (isAdmin != null) {
            isAdmin = isAdmin.substring(1, (isAdmin.length - 1));
            if (isAdmin == 'true') {
                return this.$router.push({
                    name: 'adminPage'
                })
            } else {
                return this.$router.push({
                    name: 'dashboardPage'
                })
            }
        }
    }
}
</script>

<style scoped>
.form-center {
    text-align: center;
    font-size: large;
    padding-top: 40px;
}

input {
    width: 20%;
    height: 30%;
    padding: 12px 20px;
    border: 1px solid #ccc;
}

.login,
.back {
    background-color: bisque;
    border: 1px;
    color: black;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    position: absolute;
    top: 40%;
    left: 46%;
}

.back {
    background-color: rgb(120, 113, 126);
    padding: 10px 22px;
    top: 80%;
    left: 46%;
}
</style>
