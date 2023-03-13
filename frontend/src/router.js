import {createRouter, createWebHistory} from "vue-router"
import homePageComp from './components/homePage.vue'
import signUpComp from './components/signUpPage.vue'
import loginComp from './components/loginPage.vue'
import aboutUsComp from './components/aboutUsPage.vue'
import dashboardComp from './components/dashboardPage.vue'
import companyDetailsComp from './components/companyDetailsPage.vue'
import workingHoursComp from './components/workingHoursPage.vue'
import userDetailComp from './components/userDetailsPage.vue'
import employerListComp from './components/employerListPage.vue'
import adminComp from './components/adminPage.vue'
import adminDetailsComp from './components/adminDetailsPage.vue'
import adminArchiveComp from './components/adminArchivePage.vue'
import adminHeaderComp from './components/adminHeader.vue'


const routes = [
    {
        name:'homePage',
        path:'/',
        component:homePageComp
    },
    {
        name:'signUpPage',
        path:'/signup',
        component:signUpComp
    },
    {
        name:'loginPage',
        path:'/login',
        component:loginComp
    },
    {
        name:'aboutUsPage',
        path:'/aboutus',
        component:aboutUsComp
    },
    {
        name:'dashboardPage',
        path:'/dashboard',
        component: dashboardComp
    },
    {
        name:'companyDetailsPage',
        path:'/companydetails',
        component: companyDetailsComp
    },
    {
        name:'workingHoursPage',
        path:'/workinghours',
        component: workingHoursComp
    },
    {
        name:'userDetailPage',
        path:'/userdetails',
        component: userDetailComp
    },
    {
        name:'employerListPage',
        path:'/employerlist',
        component: employerListComp
    },
    {
        name:'adminPage',
        path:'/admin',
        component: adminComp
    },
    {
        name:'adminDetailsPage',
        path: '/admindetails',
        component: adminDetailsComp
    },
    {
        name:'adminArchivePage',
        path:'/adminarchive',
        component: adminArchiveComp
    },
    {
        name:'adminHeaderPage',
        path:'/adminheader',
        component: adminHeaderComp
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;