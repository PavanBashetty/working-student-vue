<template>
<headerComp subHeaderName="Dashboard" />

<Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
import headerComp from '../components/header.vue'
import axios from 'axios'
export default {
    name: 'dashboardComp',
    components: {
        headerComp,
        Bar
    },
    data() {
        return {
            userID:'',
            dataForGraphs:{},
            workedMonths:[],
            hoursWorked:[],
            chartData: {
                labels: [],
                datasets: [{
                    data: []
                }]
            },
            chartOptions: {
                responsive: false,
                //maintainAspectRatio: true,
                height: 40,
                width: 60
            }
        }
    },
    mounted(){
        this.userID = localStorage.getItem("user-id");
        this.getDataforGraphs();
    },
    methods:{
        async getDataforGraphs(){
            await axios.get("/api/dataForGraphs/"+this.userID)
            .then((res)=>{
                this.dataForGraphs = res.data.data;
                this.chartData.datasets[0].data = []
                for(const a of this.dataForGraphs){
                   this.workedMonths.push(a.worked_month)
                   this.chartData.labels.push(a.worked_month)
                   this.hoursWorked.push(a.hours_worked)
                   this.chartData.datasets[0].data.push(a.hours_worked)
                }

                console.log(this.chartData.labels);
                //this.chartData.datasets[0].data = []
                console.log(this.chartData.datasets[0].data);

            })
            .catch(()=>{
                console.log("Data for graphs couldn't be retreived");
            })
        }
    }
}
</script>

<style>
</style>
