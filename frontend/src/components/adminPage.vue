<template>
<adminHeaderComp subHeaderName="Admin Home" />

<div class="grid grid-flow-col">
    <div><h3>Filters: </h3></div>

    <div class="py-2 w-40">
        <select class="block py-2 w-40 border border-gray-300 bg-white rounded-md shadow-sm sm:text-sm" v-model="searchby">
            <option value="" disabled selected>Select an Header</option>
            <option value="user_id">User ID</option>
            <option value="university">University</option>
            <option value="company_name">Company Name</option>
        </select>
    </div>
    <div class="py-2 w-45">
        <input type="text" class="w-full max-w-md block py-2  border border-gray-300 bg-white rounded-md shadow-sm placeholder-black sm:text-sm gap-4" placeholder="Enter a value.." v-model="searchValue" />
    </div>
    <div>
        <button class="text-blue-700 font-semibold  py-1 px-4 border border-gray-500 rounded-full" type="button" ref="submit">Apply</button>
        <button class="text-blue-700 font-semibold  py-1 px-4 border border-gray-500 rounded-full" type="button" v-on:click="resetData()">Reset</button>
    </div>
</div>

<div class="conatiner mx-auto h-64 overflow-y-auto">
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
            <tr class="sticky top-0">
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
            searchValue: ''
        }
    },
    components: {
        adminHeaderComp
    },
    mounted() {
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
            await axios.get("/api/getFilteredData/" + this.searchby + "/" + this.searchValue)
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
.search {
    border: 1px solid grey;
    border-radius: 5px;
    height: 20px;
    width: 25%;
    padding: 2px 8px 2px 10px;
    outline: 0;
    background-color: #f5f5f5;
}

/* button {
    background-color: beige;
    border: none;
    color: black;
    padding: 4px 6px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
} */
</style>
