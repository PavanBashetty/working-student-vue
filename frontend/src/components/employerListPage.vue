<template>
<headerComp />
<h2 style="text-align:center; color: rebeccapurple;">Current Employer Details</h2>
<table style="width:60%">
    <thead>
        <tr>
            <th>Company Name</th>
            <th>Type Of Work</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Gross Salary (€/hr)</th>
            <th>Total Worked Hours</th>
            <th>Action</th>

        </tr>
    </thead>
    <tbody>
        <tr>
            <td>NA</td>
            <td>NA</td>
            <td>NA</td>
            <td>NA</td>
            <td>NA</td>
            <td>NA</td>
            <td><button type="button">Edit End Date</button></td>
        </tr>
    </tbody>
</table>
</template>

<script>
import headerComp from '../components/header.vue'
export default {
    name: 'employerListComp',
    components: {
        headerComp
    }
}
</script>

<style scoped>
tbody {
    height: 100px;
    overflow-y: auto;
    overflow-x: hidden;
}
table,
th,
td {
    border: 1px solid black;
    border-collapse: collapse;
}
th,
td {
    padding: 15px;
}
th {
    background-color: #04AA6D;
    color: white;
}
</style>
