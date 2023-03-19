<template>
<headerComp subHeaderName="Working Hours" />
<!--FILTER DIV-->
<div>Filters:</div>

<!--TABLE TO DISPLAY WORKED HOURS DETAILS FOR EACH COMPANY-->
<div class="conatiner mx-auto h-64 overflow-y-auto">
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100 sticky top-0 z-10 text-left">
            <tr>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">User ID</th>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Company Name</th>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Worked Date</th>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Worked Week</th>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Worked Month</th>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Hours Worked</th>
                <th class="px-1 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Working Status</th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 ">
            <tr v-for="(workedHour,i) in enteredWorkHoursList" :key="i">
                <td class="px-1 py-1 text-left whitespace-nowrap">{{ workedHour.user_id }}</td>
                <td>{{ workedHour.company_name }}</td>
                <td>{{ (workedHour.worked_date).substring(0, (workedHour.worked_date).indexOf('T')) }}</td>
                <td>{{ workedHour.worked_week }}</td>
                <td>{{ workedHour.worked_month }}</td>
                <td>{{ workedHour.hours_worked }}</td>
                <td><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{{ workedHour.working_status }}</span></td>
            </tr>
        </tbody>
    </table>
</div>
<br />
<hr />

<!--ENTER LATEST WORKED HOUR DETAILS-->
<div class="text-center">
    <button class="text-white bg-blue-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" v-on:click="showComponent = true">Enter Latest Work Hours</button>
    <button class="text-white bg-blue-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" v-show="showComponent" v-on:click="showComponent = false">Close Below Form</button>
</div>

<form v-show="showComponent">
    <div class="grid gap-6 mb-6 md:grid-cols-4">
        <div>
            <label for="userid" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User ID:</label>
            <input type="text" id="userid" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="userID" :disabled="true">
        </div>
        <div>
            <label for="companyName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Name:</label>
            <select id="companyName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="companyName">
                <option value="" disabled selected>Select the company name</option>
                <option :value="compName.company_name" v-for="(compName, i) in activeCompanyList" :key="i">{{compName.company_name}}</option>
            </select>
        </div>
        <div>
            <label for="workHours" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hours Worked:</label>
            <input type="number" id="workHours" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="hoursWorked">
        </div>
        <div>
            <label for="workDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Worked Date:</label>
            <input type="date" id="workDate" min="0" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="workDate" required>
        </div>
    </div>
    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" v-on:click="submitNewWorkEntry()">Submit</button>
</form>
</template>

<script>
import headerComp from '../components/header.vue'
import axios from 'axios';
export default {
    name: 'workingHoursComp',
    components: {
        headerComp
    },
    data() {
        return {
            activeCompanyList: {},
            enteredWorkHoursList: {},
            userID: '',
            companyName: '',
            workDate: '',
            hoursWorked: '',
            showComponent: false
        }
    },
    mounted() {
        this.userID = localStorage.getItem("user-id");
        this.getEnteredWorkHourDetails();
        this.getActiveCompanyList();
    },
    methods: {
       async submitNewWorkEntry() {
            await axios.post("/api/addNewWorkHourEntry",{
                user_id: this.userID,
                company_name: this.companyName,
                worked_date: this.workDate,
                hours_worked: this.hoursWorked
            })
            .then((res)=>{
                if(res.data.msg == "New worked hour entry is successfull!"){
                    alert("New Worked hour details are added");
                this.showComponent = false;
                this.clearedEnteredData();
                this.getEnteredWorkHourDetails();
                }else{
                    alert('Work hour entry did not happen. Please try again');
                    this.clearedEnteredData();
                }
            })
            .catch(()=>{
                alert("New entry failed. Try later!");
                this.clearedEnteredData();
            })
        },
        async getEnteredWorkHourDetails() {
            await axios.get("/api/enteredWorkHours/" + this.userID)
                .then((res) => {
                    this.enteredWorkHoursList = res.data.data;
                })
                .catch(() => {
                    console.log("Data could not be retrived");
                })
        },
        async getActiveCompanyList(){
            await axios.get("/api/activeComapanies/"+this.userID)
            .then((res)=>{
                //console.log(res.data.data);
                this.activeCompanyList = res.data.data;
            })
            .catch(()=>{
                console.log("Data could not be retreived");
            })
        },
        clearedEnteredData(){
            this.companyName = '',
            this.workDate = '',
            this.hoursWorked = ''
        }
    }
}
</script>

<style >

</style>
