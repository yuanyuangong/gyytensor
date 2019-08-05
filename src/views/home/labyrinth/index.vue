<template>
    <div>
        <div class="row">
            <div class="col-2">
                <div class="gy-card">
                    <button class="btn btn-block btn-lg " :class="loop?'btn-inverse':'btn-success'" @click="start">{{!loop?'开始':'暂停'}}</button>
                    <button class="btn btn-block btn-lg btn-danger" @click="pause()">结束</button>
                    <button class="btn btn-block btn-lg btn-danger" @click="test()">测试</button>
                    
                </div>
            </div>
            <div class="col-5">
                <div class="palette palette-wet-asphalt">
                    迷宫环境
                </div>
                <div class="gy-card">
                    <div style="width:350px;margin:0 auto;">
                        <canvas id="tutorial" width="350" height="350" style="background-color:#333;">
                        
                        </canvas>
                    </div>
                  
                </div>
            </div>
            <div class="col-5">
                <div class="palette palette-wet-asphalt">
                   q_table表
                </div>
                <div class="gy-card">
                    <div style="width:350px;margin:0 auto;">
                        <canvas id="q_table" width="350" height="350" style="background-color:#f8f8f8;"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as tf from '@tensorflow/tfjs'
import { setTimeout } from 'timers'
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
export default {
    name:'labyrinth',
    data(){
        return{
            i:0,
            type:0,
            loop:false,
            q_table:{},
            location:0,
            action:[0,50],
            arealen:50,
            adventurer:{
                fillStyle:"#1184ee",
                orign:[0,0],
            },
            newlocation:'',
            trap:[
                {
                    fillStyle:'#fd2a56',
                    orign:[150,250]
                },
                {
                    fillStyle:'#fd2a56',
                    orign:[200,150]
                },
            ],
            reward:{
                fillStyle:'#26f52b',
                orign:[150,200]
            }
        }
    },
    async created(){
       
    },
    async mounted(){
      
        let vue =this
        vue.init()
       

    },
    methods:{
        test(){
            let vue = this 
            let value = vue.q_table[vue.adventurer.orign]?Math.max.apply(null, vue.q_table[vue.adventurer.orign]):0
            let aa=[1,2,3,4]
         
        },
        init(){
            // console.log("sdadada")
            this.step_table={}
            this.adventurer={
                fillStyle:"#1184ee",
                orign:[0,0],
            }
            this.draw()
        },
        async start(){

            let vue = this 
            vue.loop = !vue.loop
            while(vue.loop){
                vue.i++
                let action = vue.q_action(vue.adventurer.orign)    
                let reward = vue.predict(action)
                
                reward._action = vue.q_action(vue.adventurer.orign)  
                
                
                vue.step(reward)
                vue.q_learn(reward)
                await sleep(100)
            }
        },
        pause(){
            this.loop = false
            console.log("结束")
        },

        async main(){
            let vue = this
        },
        savelocation(location){
            if(this.q_table[location]){
              
            }else{
                let i=this.i
                // console.log("保存",location)
                this.q_table[location]=[0,0,0,0] 
                this.step_table[location]=[0,0,0,0] 
                var canvas = document.getElementById('q_table');
                var ctx = canvas.getContext('2d');
                ctx.strokeStyle = '#1184ee';
                ctx.strokeRect(location[0],location[1],this.arealen,this.arealen);
            }
        },
        q_action(location){

            let vue = this
           vue.savelocation(location)//保存位置
            let q_table = vue.q_table
            let tablecur = q_table[location]
           
            let lens = tablecur.length
            let maxvalue = Math.max.apply(null, tablecur)
           
            let lable = []
            for(let i=0;i<lens;i++){
                if(tablecur[i] == maxvalue){
                    lable.push(i)
                }
            }
            let action  = lable[Math.floor( Math.random() * lable.length )];
            switch(action){
                case 0:vue.newlocation = vue.adventurer.orign[1] - vue.adventurer.orign[1]>=50?vue.arealen:0;//往上
                break;
                case 1:vue.newlocation = vue.adventurer.orign[0] + vue.adventurer.orign[0]<300?vue.arealen:0;//往左
                break;
                case 2:vue.newlocation = vue.adventurer.orign[1] + vue.adventurer.orign[1]<300?vue.arealen:0;//往下
                break;
                case 3:vue.newlocation = vue.adventurer.orign[0] - vue.adventurer.orign[0]>=50?vue.arealen:0;//往右
                break;
            }
            // console.log(action)
            
            return action
        },
   
        predict(action){
            let vue = this
            let reward = {}
          
            reward.action = action
      
            reward.location = JSON.parse(JSON.stringify(vue.adventurer.orign))
            switch(action){
                case 0:vue.adventurer.orign[1] -= vue.adventurer.orign[1]>=50?vue.arealen:0;//往上
                break;
                case 1:vue.adventurer.orign[0] += vue.adventurer.orign[0]<300?vue.arealen:0;//往左
                break;
                case 2:vue.adventurer.orign[1] += vue.adventurer.orign[1]<300?vue.arealen:0;//往下
                break;
                case 3:vue.adventurer.orign[0] -= vue.adventurer.orign[0]>=50?vue.arealen:0;//往右
                break;
            }
         
            // reward.value= reward.value.toFixed()
            return reward
        },
        step(reward){
            let vue = this
       
            var canvas = document.getElementById('tutorial');
            var ctx = canvas.getContext('2d');
            ctx.fillStyle ="#333" 
          
            ctx.fillRect(reward.location[0],reward.location[1],vue.arealen,vue.arealen)
            ctx.fillStyle =vue.adventurer.fillStyle
            let location =vue.adventurer.orign
            ctx.fillRect (location[0],location[1],vue.arealen,vue.arealen);
            
          
        },
        sarsa_learn(){
  
          
        },
        q_learn(reward){
            let vue =this 

                //   console.log(vue.q_table[vue.adventurer.orign])
            reward.value = vue.q_table[vue.adventurer.orign]?0.8*Math.max.apply(null, vue.q_table[vue.adventurer.orign]):0

            
            // reward.value = vue.q_table[vue.adventurer.orign][_action]?0.8* vue.q_table[vue.adventurer.orign][_action]:0
            console.log(reward.value)

            if(vue.adventurer.orign[0] == vue.trap[0].orign[0]&&vue.adventurer.orign[1] == vue.trap[0].orign[1]){
              
                reward.value = -1
                vue.init()
            }
            if(0<vue.adventurer.orign[0]<350&&0<vue.adventurer.orign[1]<350){

            }else{
                reward.value = -1
                vue.init()
            }
            if(vue.adventurer.orign[0] == vue.trap[1].orign[0]&&vue.adventurer.orign[1] == vue.trap[1].orign[1]){
             
                reward.value = -1
                vue.init()
            }
            if(vue.adventurer.orign[0] == vue.reward.orign[0]&&vue.adventurer.orign[1] == vue.reward.orign[1]){
              
                 reward.value = 1
                 vue.init()
            }
            reward._location = JSON.parse(JSON.stringify(vue.adventurer.orign))

            let location = reward.location
            let action = reward.action
            let _action = reward._action
            let value = reward.value.toFixed(1)
            var canvas = document.getElementById('q_table');
            var ctx = canvas.getContext('2d');
            ctx.font = "12px serif";
            let wid = 12

            function drawtext(x,y){
                ctx.fillStyle ="#f8f8f8";
                ctx.fillRect(location[0]+x,location[1]+y-12,ctx.measureText(value).width,wid);
                ctx.fillStyle = "#333";
                ctx.fillText(value,location[0]+x,location[1]+y);
            }

            //尽管是 一个差值计算，却是一切的核心
            vue.q_table[location][action]+=0.8*(reward.value-vue.q_table[location][action]);

            // this.step_table[location] = [0,0,0,0]
            // this.step_table[location][action] = 0.8*(reward.value-vue.q_table[location][action]);
            // for(let key in this.step_table){
            //     console.log(key)
            //     vue.q_table[key]+= vue.step_table[key]
            //     vue.step_table[key].forEach((item)=>{
            //         return item*=0.8
            //     })
            // }
            //绘制q_table
            switch(action){
                case 0:drawtext(22,15);break;
                case 1:drawtext(35,26);break;
                case 2:drawtext(22,35);break;
                case 3:drawtext(10,25);break;
            }
          
        },

        draw(){
            let vue = this
            let arealen = vue.arealen
            var canvas = document.getElementById('tutorial');

            if (canvas.getContext){

                var ctx = canvas.getContext('2d');
                ctx.fillStyle =vue.adventurer.fillStyle
                let location =vue.adventurer.orign
                ctx.fillRect (location[0],location[1],arealen,arealen);

                vue.trap.forEach(item=>{
                    ctx.fillStyle =item.fillStyle
                    let locationtrap =  item.orign
                    ctx.fillRect (locationtrap[0],locationtrap[1],arealen,arealen);
                })

                ctx.fillStyle =vue.reward.fillStyle;
                let locationreward =  vue.reward.orign
                ctx.fillRect (locationreward[0],locationreward[1],arealen,arealen);
            // drawing code here
            } else {
                alert("浏览器版本太低了")
            }
        }
    }
}
</script>
