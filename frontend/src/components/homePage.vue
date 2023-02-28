<template>
<div style="background-color:brown; padding: 10px">
    <h1 style="text-align:center">Welcome to Working Student App</h1>
</div>

<div>
    <button class="signup" type="button" v-on:click="signUpPage()"><b>SignUp</b></button><br />
    <button class="login" type="button" v-on:click="loginPage()"><b>Login</b></button><br />
</div>

<footer>
    <button type="button" v-on:click="aboutUs()">About Us</button>
</footer>

</template>

<script>
export default {
    name: 'homePageComp',
    methods:{
        signUpPage(){
            return this.$router.push({
                name:'signUpPage'
            })
        },
        loginPage(){
            return this.$router.push({
                name:'loginPage'
            })
        },
        aboutUs(){
            return this.$router.push({
                name:'aboutUsPage'
            })
        }
    }
}
</script>

<style>
footer {
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    padding: 10px;
    background-color: DarkSalmon;
    color: white;
}
.signup, .login{
    background-color:bisque;
    border:1px;
    color: black;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    position: absolute;
    top: 25%;
    left: 46%;
}
.login{
    top: 35%;
    left: 46%;
}
</style>
