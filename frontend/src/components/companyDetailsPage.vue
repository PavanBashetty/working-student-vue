<template>
<headerComp subHeaderName="Company Details" />

<!--TABLE TO DISPLAY ACTIVE COMPANY DETAILS-->
<div class="currentCompList">
    <table>
        <thead>
            <tr>
                <th>User ID</th>
                <th>Company Name</th>
                <th>Type of Work</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Working Status</th>
                <th>Total Worked Hours</th>
                <th>No longer Work here?</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(compName,i) in currentCompanyList" :key="compName.company_name">
                <td>{{ compName.user_id }}</td>
                <td>{{ compName.company_name }}</td>
                <td>{{ compName.type_of_work }}</td>
                <td>{{ (compName.start_date).substring(0, (compName.start_date).indexOf('T')) }}</td>
                <td>
                    <input type="date" ref="endDateInput" :disabled="editableIndex !== i" @input="addEndDate(i,$event.target.value)" />
                </td>
                <td>{{ compName.working_status }}</td>
                <td>000</td>
                <td><button type="button" v-on:click="setEditable(i)">Enter End Date</button></td>
            </tr>
        </tbody>
    </table>
</div>
<br /><br />
<hr />


<!--ENTER A NEW COMPANY DETAIL-->
<div>
    <button v-on:click="showComponent = true">Enter new company details</button>
</div>
<div id="newCompanyEntry" v-show="showComponent">
    <label for="userid">User ID: </label>
    <input type="text" id="userid" v-model="userID" :disabled="true" /><br /><br />
    <label for="companyName">Company Name: </label>
    <input type="text" placeholder="Enter Company Name" id="companyName" v-model="companyName" /><br /><br />
    <label for="typeOfWork">Type of Work: </label>
    <select id="typeOfWork" v-model="typeOfWork">
        <option value="Working Student">Working Student</option>
        <option value="Part Time">Part Time</option>
        <option value="Internship">Internship</option>
    </select><br /><br />
    <label for="startDate">Start Date: </label>
    <input type="date" id="startDate" v-model="startDate" /><br /><br />
    <label for="grossSalary">Gross Salary<i>(per hr)</i>:</label>
    <input type="number" id="grossSalary" v-model="grossSalary" /><br /><br />
    <button class="submit" type="button" v-on:click="submitNewEntry()">Submit</button>
</div>


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
        this.userID = localStorage.getItem("user-id");
        this.getCurrentCompList();
        // this.$nextTick(() => {
        //     if (this.$refs.endDateInput) {
        //         setTimeout(() => {
        //             this.$refs.submit.addEventListener('input', this.addEndDate);
        //         }, 1000);
        //     }
        // });

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
                        this.getCurrentCompList();
                    } else {
                        alert('Entry did not happen. Please try again');
                        this.companyName = '',
                            this.typeOfWork = '',
                            this.startDate = '',
                            this.grossSalary = ''
                    }
                })
                .catch(() => {
                    alert('New Entry failed. Try Later!');
                    this.companyName = '',
                        this.typeOfWork = '',
                        this.startDate = '',
                        this.grossSalary = ''
                        this.showComponent = false;
                })
        }
    }
}
</script>

<style>
.form-center {
    text-align: left;
    font-size: large;
    padding-top: 40px;
}
</style>
