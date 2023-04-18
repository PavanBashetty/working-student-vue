<template>
<adminHeaderComp subHeaderName="Admin Home" />

<!--FILTER-->
<!-- <div class="grid grid-cols-4 gap-2"> -->
<div class="grid mb-2 md:grid-cols-4">
    <div class="bg-gray-150 p-2 grid-auto-cols">
        <h3>Filters: </h3>
    </div>
    <div class="bg-gray-150 p-2 grid-auto-cols">
        <select class="block py-2 w-40 border border-gray-300 bg-white rounded-md shadow-sm sm:text-sm" v-model="searchby">
            <option value="" disabled selected>Select an Header</option>
            <option value="user_id">User ID</option>
            <option value="university">University</option>
            <option value="company_name">Company Name</option>
        </select>
    </div>
    <div class="bg-gray-150 p-2 grid-auto-cols">
        <input type="text" class="w-full max-w-md block py-2  border border-gray-300 bg-white rounded-md shadow-sm placeholder-black sm:text-sm gap-4" placeholder="Enter a value.." v-model="searchValue" />
    </div>
    <div class="bg-gray-150 p-2 grid-auto-cols">
        <button class="text-blue-700 font-semibold  py-1 px-4 border border-gray-500 rounded-full" type="button" ref="submit">Apply</button>
        <button class="text-blue-700 font-semibold  py-1 px-4 border border-gray-500 rounded-full" type="button" v-on:click="resetData()">Reset</button>
    </div>
</div>


<!--DETAILED TABLE-->
<div class="conatiner mx-auto h-64 overflow-y-auto">
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100 sticky top-0 z-10">
            <tr>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">User ID</th>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Full Name</th>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">University</th>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Company Name</th>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Type of Work</th>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Start Date</th>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Working Status</th>
                <th class="px- py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Working Hours Left</th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 ">
            <tr v-for="(workingStu, i) in workingStudentsList" :key="i">
                <td class="px-1 py-1 text-left whitespace-nowrap">{{workingStu.user_id}}</td>
                <td>{{ workingStu.fullName }}</td>
                <td>{{ workingStu.university }}</td>
                <td>{{ workingStu.company_name}}</td>
                <td>{{ workingStu.type_of_work}}</td>
                <td>{{ (workingStu.start_date).substring(0, (workingStu.start_date).indexOf('T')) }}</td>
                <td><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{{ workingStu.working_status}}</span></td>
                <td>{{ workingStu.working_hours}}</td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import adminHeaderComp from './adminHeader.vue';
import axios from 'axios';
export default {
    name: 'adminComp',
    data() {
        return {
            workingStudentsList: {},
            searchby: '',
            searchValue: '',
            workingStatus: 'Active'
        }
    },
    components: {
        adminHeaderComp
    },
    mounted() {
        let userName =localStorage.getItem('user-name');
        if(!userName){
            return this.$router.push({name:'homePage'})
        }
        this.getAllWorkingStuList();
    },
    methods: {
        async getAllWorkingStuList() {
            await axios.get("/api/workingStudentsList")
                .then((res) => {
                    this.workingStudentsList = res.data.data;
                })
                .catch(() => {
                    console.log("Data could not be retreived");
                })
        },
        async getFilteredData() {
            await axios.get("/api/getFilteredData/" + this.searchby + "/" + this.searchValue + "/" + this.workingStatus)
                .then((res) => {
                    this.workingStudentsList = res.data.data;
                })
                .catch(() => {
                    console.log("Filtered data could not be retreived");
                })
        },
        resetData() {
            this.searchValue = '';
            this.searchby = '';
            this.getAllWorkingStuList()
        }
    },
    updated() {
        // Add an if condition to make sure both searchby and searchValue are filled
        this.$refs.submit.addEventListener('click', this.getFilteredData);
    }
}
</script>

<style scoped>
</style>
