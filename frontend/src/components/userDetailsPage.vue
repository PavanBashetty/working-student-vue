<template>
<headerComp subHeaderName="User Details" />

<div>
    <p><b>User ID: </b>{{ userID }}</p>
    <p><b>Full Name: </b>{{ fullName }}</p>
    <p><b>Age: </b>{{ age }}</p>
    <p><b>Email: </b>{{ email }}</p>
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
            email: ''
        }
    },
    mounted() {
        this.userID = localStorage.getItem("user-id");
        this.loaduserDetails();
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
        }
    }
}
</script>

<style>
</style>
