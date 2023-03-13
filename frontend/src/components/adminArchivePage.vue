<template>
<adminHeaderComp subHeaderName="Archived Data"/>

<div class="workingStuList">
    <table>
        <thead>
            <tr>
                <th>User ID</th>
                <th>Full Name</th>
                <th>University</th>
                <th>Company Name</th>
                <th>Type of Work</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Working Status</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(workingStu, i) in workingStudentsList" :key="i">
                <td>{{workingStu.user_id}}</td>
                <td>{{ workingStu.fullName }}</td>
                <td>{{ workingStu.university }}</td>
                <td>{{ workingStu.company_name}}</td>
                <td>{{ workingStu.type_of_work}}</td>
                <td>{{ (workingStu.start_date).substring(0, (workingStu.start_date).indexOf('T')) }}</td>
                <td>{{ (workingStu.end_date).substring(0, (workingStu.end_date).indexOf('T')) }}</td>
                <td>{{ workingStu.working_status}}</td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import adminHeaderComp from './adminHeader.vue';
import axios from 'axios';
export default {
    name: 'adminArchiveComp',
    data() {
        return {
            workingStudentsList: {}
        }
    },
    components:{
        adminHeaderComp
    },
    mounted(){
        this.getArchivedWorkingStuList();
    },
    methods: {
        async getArchivedWorkingStuList() {
            await axios.get("/api/getArchivedWorkingStuList")
                .then((res) => {
                    this.workingStudentsList = res.data.data;
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
