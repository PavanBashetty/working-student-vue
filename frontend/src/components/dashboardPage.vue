<template>
<headerComp subHeaderName="Dashboard" />

<div class="w-full text-center">
    <canvas ref="myChart" class="mx-auto w-1/2 h-1/2 object-contain"></canvas>
</div>
</template>

<script>
import headerComp from '../components/header.vue'
import axios from 'axios'
import {
    ref,
    onMounted
} from 'vue'
import { useRouter } from 'vue-router'
import Chart from 'chart.js/auto'

export default {
    name: 'dashboardComp',
    components: {
        headerComp
    },
    setup() {
        const myChart = ref(null)
        const router = useRouter();
        onMounted(async () => {
            try {
                let userName = localStorage.getItem('user-name');
                if (!userName) {
                    router.push('/')
                }
                const userID = localStorage.getItem("user-id");
                const response = await axios.get("/api/dataForGraphs/" + userID)
                const data = response.data.data
                const labels = data.map(item => item.worked_month)
                const values = data.map(item => item.hours_worked)
                const ctx = myChart.value.getContext('2d')
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Monthly Worked Hours',
                            data: values,
                            backgroundColor: '#3f51b5',
                        }, ],
                    },
                    options: {
                        responsive: false,
                        // scales: {
                        //     yAxes: [{
                        //         ticks: {
                        //             beginAtZero: true,
                        //         },
                        //     }, ],
                        // },
                    },
                })
            } catch (error) {
                console.error(error)
            }
        })
        return {
            myChart
        }
    }
}
</script>

<style>
</style>
