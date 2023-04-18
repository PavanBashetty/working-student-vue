<template>
<headerComp subHeaderName="Company Details" />

<!--TABLE TO DISPLAY ACTIVE COMPANY DETAILS-->
<div class="conatiner mx-auto h-64 overflow-y-auto">
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100 sticky top-0 z-10 text-left">
            <tr>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">User ID</th>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Company Name</th>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Type of Work</th>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Start Date</th>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">End Date</th>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Working Status</th>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Total Worked Hours</th>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">No longer Work here?</th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 ">
            <tr v-for="(compName,i) in currentCompanyList" :key="compName.company_name">
                <td class="px-1 py-1 text-left whitespace-nowrap">{{ compName.user_id }}</td>
                <td>{{ compName.company_name }}</td>
                <td>{{ compName.type_of_work }}</td>
                <td>{{ (compName.start_date).substring(0, (compName.start_date).indexOf('T')) }}</td>
                <td>
                    <input type="date" ref="endDateInput" class="bg-gray-100" :disabled="editableIndex !== i" @input="addEndDate(i,$event.target.value)" />
                </td>
                <td><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{{ compName.working_status }}</span></td>
                <td>{{compName.hours_worked}}</td>
                <td><button class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-small rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" type="button" v-on:click="setEditable(i)">Enter End Date</button></td>
            </tr>
        </tbody>
    </table>
</div>
<br />
<hr />

<!--ENTER A NEW COMPANY DETAIL-->
<div class="text-center">
    <button class="text-white bg-blue-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" v-on:click="showComponent = true">Enter new company details</button>
    <button class="text-white bg-blue-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" v-show="showComponent" v-on:click="showComponent = false">Close below form</button>
</div>

<form v-show="showComponent">
    <div class="grid gap-6 mb-6 md:grid-cols-3">
        <div>
            <label for="userid" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User ID:</label>
            <input type="text" id="userid" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="userID" :disabled="true">
        </div>
        <div>
            <label for="companyName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Name:</label>
            <input type="text" id="companyName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Company Name" v-model="companyName">
        </div>
        <div>
            <label for="startDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date:</label>
            <input type="date" id="startDate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="startDate" required>
        </div>
        <div>
            <label for="grossSalary" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gross Salary<i>(per hr)</i>:</label>
            <input type="number" id="grossSalary" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Hourly Salary" v-model="grossSalary" required>
        </div>
        <div>
            <label for="typeOfWork" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type of Work:</label>
            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="typeOfWork" v-model="typeOfWork">
                <option value="" disabled selected>Select the work type</option>
                <option value="Working Student">Working Student</option>
                <option value="Part Time">Part Time</option>
                <option value="Internship">Internship</option>
            </select>
        </div>
    </div>
    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" v-on:click="submitNewEntry()">Submit</button>
</form>
</template>

<script>
import headerComp from '../components/header.vue';
import axios from 'axios';
export default {
    name: 'companyDetailsComp',
    components: {
        headerComp
    },
    data() {
        return {
            showComponent: false,
            userID: '',
            editableIndex: -1,
            currentCompanyList: {},
            companyName: '',
            typeOfWork: '',
            startDate: '',
            grossSalary: ''
        }
    },
    mounted() {
        let userName =localStorage.getItem('user-name');
        if(!userName){
            return this.$router.push({name:'homePage'})
        }
        this.userID = localStorage.getItem("user-id");
        this.getCurrentCompList();
        // this.$nextTick(() => {
        //     if (this.$refs.endDateInput) {
        //         setTimeout(() => {
        //             this.$refs.submit.addEventListener('input', this.addEndDate);
        //         }, 1000);
        //     }
        // });
        //alert(new Date().toLocaleDateString())
    },
    methods: {
        async getCurrentCompList() {
            await axios.get("/api/currentCompList/" + this.userID)
                .then((res) => {
                    this.currentCompanyList = res.data.data;
                })
                .catch(() => {
                    console.log("Data could not be retreived");
                })
        },
        setEditable(i) {
            this.editableIndex = i
        },
        async addEndDate(i, value) {
            let compName = this.currentCompanyList[i].company_name;
            let endDate = value;
            await axios.post("/api/addEndDate", {
                    user_id: this.userID,
                    end_date: endDate,
                    company_name: compName
                })
                .then((res) => {
                    if (res.data.msg == "End date added successfully!") {
                        alert("End Date added");
                        this.getCurrentCompList();
                        this.editableIndex = -1;
                    } else {
                        alert("End Date could not be added, try later");
                        this.getCurrentCompList();
                    }
                })
                .catch(() => {
                    console.log("Something else went wrong, please try later");
                    this.editableIndex = -1;
                })

        },
        async submitNewEntry() {
            await axios.post("/api/newCompanyEntry", {
                    user_id: this.userID,
                    company_name: this.companyName,
                    type_of_work: this.typeOfWork,
                    start_date: this.startDate,
                    gross_salary: this.grossSalary
                })
                .then((res) => {
                    if (res.data.msg == "New company details added successfully!") {
                        alert('New company details are added!');
                        this.showComponent = false;
                        this.clearedEnteredData();
                        this.getCurrentCompList();
                    } else {
                        alert('Entry did not happen. Please try again');
                        this.clearedEnteredData();
                    }
                })
                .catch(() => {
                    alert('New Entry failed. Try Later!');
                    this.clearedEnteredData();
                    this.showComponent = false;
                })
        },
        clearedEnteredData() {
            this.companyName = '',
                this.typeOfWork = '',
                this.startDate = '',
                this.grossSalary = ''
        }
    }
}
</script>

<style>
</style>
