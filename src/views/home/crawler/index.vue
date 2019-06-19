<template>
    <div>
        <input placeholder="请输入网址" v-model="url"/>
        <div v-html="crawlerData">

        </div>
        <button @click="getCrawleData">爬取</button>  
    </div>
</template>
<script>
    export default {
        data(){
            return {
                crawlerData:'',
                url:''
            }
        },
        methods:{
            async getCrawleData(){
                let urlData = this.url
                let data = await this.$store.dispatch('GET_CRAWLER_DATA',{urlData})
                this.crawlerData = data.data.data.body
            
            }
        }
    }
</script>
<style scoped>

</style>
