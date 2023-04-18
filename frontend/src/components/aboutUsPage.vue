<template>
    About Us

<footer>
    <button type="button" v-on:click="backToMain()">Back</button>
</footer>
</template>

<script>
export default{
    name:'aboutUsComp',
    methods:{
        backToMain(){
            return this.$router.push({
                name:'homePage'
            })
        }
    }
}
</script>

<style>
</style>