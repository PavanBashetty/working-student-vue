<template>
<header>
    <nav class="bg-gray-500 border-gray-200 px-4 lg:px-6 py-4.5 text-white p-5">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <div class="flex items-center">
                <img src="../assets/employee_app.jpg" class="mr-1 h-6 sm:h-9 rounded-full" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-bold whitespace-nowrap dark:text-blue">Working Student App</span>
            </div>
            <div class="flex items-center lg:order-1">
                <h1 class="font-serif text-xl font-extralight text-black-600">{{ subHeaderName }}</h1>

            </div>
            <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-2" id="mobile-menu-2">
                <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-4 lg:mt-0">
                    <li><button class="bg-gray-700 hover:bg-gray-600 text-white py-2 px-1 rounded" type="button" v-on:click="backToMainPage()">Main</button></li>
                    <li><button class="bg-gray-700 hover:bg-gray-600 text-white py-2 px-1 rounded" type="button" v-on:click="getArchiveData()">Archived Data</button></li>
                    <li><button class="bg-gray-700 hover:bg-gray-600 text-white py-2 px-1 rounded" type="button" v-on:click="getAdminDetails()">{{ adminName}}</button></li>
                    <li><button class="bg-gray-700 hover:bg-gray-600 text-white py-2 px-1 rounded" type="button" v-on:click="logout()">Log out</button></li>
                </ul>
            </div>
        </div>
    </nav>
</header>


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
</style>
