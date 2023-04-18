<template>
<div style="background-color:brown; padding: 1px">
    <h1 style="text-align:center">Sign Up Page</h1>
</div>

<div class="form-center">

    <input type="text" placeholder="Enter First Name" id="firstName" v-model="firstName" /><br /><br />
    <input type="text" placeholder="Enter Last Name" id="lastName" v-model="lastName" /><br /><br />
    <input type="number" placeholder="Enter Age" id="age" v-model="age" /><br /><br />
    <input type="text" placeholder="Enter University" id="university" v-model="university" /><br /><br />
    <input type="email" placeholder="Enter Email ID" id="email" v-model="email" /><br /><br />
    <input type="text" placeholder="Enter Password" id="password" v-model="password" /><br /><br />
    <button class="submit" type="button" v-on:click="submitData()">Submit</button>
</div>

<!-- <form >
    <div class="grid gap-6 mb-6 md:grid-cols-1">
        <div>
            <input type="text" class="bg-gray-100 border border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter First Name" v-model="firstName">
        </div>
        <div>
            <input type="text" class="bg-gray-100 border border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Last Name" v-model="lastName">
        </div>
        <div>
            <input type="number" class="bg-gray-100 border border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Age" v-model="age">
        </div>
        <div>
            <input type="text" class="bg-gray-100 border border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter University" v-model="university">
        </div>
        <div>
            <input type="email" class="bg-gray-100 border border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Email" v-model="email">
        </div>
        <div>
            <input type="text" class="bg-gray-100 border border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Password" v-model="password">
        </div>
    </div>
    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" v-on:click="submitData()">Submit</button>
</form> -->

<div>
    <button class="back" type="button" v-on:click="homePage()">Back</button>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'signUpComp',
    data() {
        return {
            firstName: '',
            lastName: '',
            age: '',
            university: '',
            email: '',
            password: ''
        }
    },
    methods: {
        async submitData() {
            await axios.post("/api/signup", {
                firstName: this.firstName,
                lastName: this.lastName,
                age: this.age,
                university: this.university,
                email: this.email,
                password: this.password
            }).then((res) => {
                if (res.data.msg == "user registered successfully!") {
                    alert("Registration successfull!");
                    this.$router.push({
                        name: 'loginPage'
                    })
                } else {
                    alert("Registration did not happen. Please try again!");
                    this.firstName = '',
                        this.lastName = '',
                        this.age = '',
                        this.university = '',
                        this.email = '',
                        this.password = ''
                }
            }).catch(() => {
                alert("Registration failed. Please try after sometime");
                this.firstName = '',
                    this.lastName = '',
                    this.age = '',
                    this.university = '',
                    this.email = '',
                    this.password = ''
            })
        },
        homePage() {
            return this.$router.push({
                name: 'homePage'
            })
        }
    },
    mounted() {
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
    padding-top: 30px;
}

input {
    width: 20%;

    padding: 12px 20px;
    border: 1px solid #ccc;
}

.submit,
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
    top: 80%;
    left: 46%;
}

.back {
    background-color: rgb(120, 113, 126);
    padding: 10px 22px;
    top: 90%;
    left: 46%;
}
</style>
