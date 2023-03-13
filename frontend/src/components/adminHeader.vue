<template>
<div class="header">
    <div class="sub-header-one">
        <div style="text-align: center;"><h1>{{ subHeaderName }}</h1></div>
        <div style="text-align: end; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;"><h1>Working Student App </h1></div>
    </div>

    <div class="header-right">
        <button type="button" v-on:click="logout()">Log out</button>
        <button type="button" v-on:click="getAdminDetails()">{{ adminName}}</button>
        <button type="button" v-on:click="getArchiveData()">Archived Data</button>
        <button type="button" v-on:click="backToMainPage()">Main</button>
    </div>
</div>
</template>

<script>
export default {
    name: 'adminHeaderComp',
    data() {
        return {
            adminName: ''
        }
    },
    props: {
        subHeaderName: String
    },
    methods: {
        backToMainPage() {
            this.$router.push({
                name: 'adminPage'
            })
        },
        getAdminDetails() {
            this.$router.push({
                name: 'adminDetailsPage'
            })
        },
        logout() {
            localStorage.clear();
            this.$router.push({
                name: 'loginPage'
            })
        },
        getArchiveData() {
            this.$router.push({
                name: 'adminArchivePage'
            })
        }
    },
    mounted() {
        let admin_name = localStorage.getItem("user-name");
        if (admin_name != null) {
            admin_name = admin_name.substring(1, (admin_name.length - 1));
            this.adminName = admin_name;
        }
    }
}
</script>

<style scoped>
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
    padding: 8px;
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

    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
}
</style>
