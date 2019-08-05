<template>
    <div>
        {{test}}
    </div>
</template>
<script>
function text1(dsa){
    let data = dsa
    this.data = data
    
    return this.data
}
text1.prototype.sss=function(){
    console.log(this.data)
}
export default {
    name:'test',
    data(){
        return{
            test:'测试'
        }
    },
    mounted(){
     
        let test2 = new text1("2432")
        console.log(test2.data)
        test2.sss("131")
    }
}
</script>
