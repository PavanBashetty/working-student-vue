<template>
<div class="text-center" style="background-color:brown; padding: 30px">
    <h1 class="self-center text-2xl font-bold whitespace-nowrap dark:text-blue">Welcome to Working Student App</h1>
</div>

<div class="flex h-screen items-center justify-center">
    <button class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-1 mb-1" type="button" v-on:click="signUpPage()"><b>SignUp</b></button>
    <button class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-1 mb-1" type="button" v-on:click="loginPage()"><b>Login</b></button>
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
</style>
