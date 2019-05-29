<template>
    <div>
       
        <div class="row">
            <div class="col-2">
                <div class="gy-card">
                    <button class="btn btn-block btn-lg btn-inverse" :disabled="!hasData" @click="getTrainData">获取训练数据</button>
                    <button class="btn btn-block btn-lg btn-inverse" :disabled="hasData" @click="train">拟合</button>
                </div>
            </div>
            <div class="col-10">
                <div class="gy-card">
                    预测模型：y = a*x^3+b*x^2+c ; <br/>初始参数：{{inintEle}}
                </div>
                <div class="palette palette-wet-asphalt">
                    训练参数：{{inintEletrain}}
                </div>
                <div class="gy-card">
                    <div id="main" class="gy-echart-card"> </div>
                </div>
               
            </div>
        </div>
       
    </div>
</template>
<script>
import * as tf from '@tensorflow/tfjs'
import echarts from 'echarts'

import {generateData} from './data.js'
// import { setInterval, clearInterval } from 'timers';

//设置初始参数
const a = tf.variable(tf.scalar(Math.random()));
const b = tf.variable(tf.scalar(Math.random()));
const c = tf.variable(tf.scalar(Math.random()));
const d = tf.variable(tf.scalar(Math.random()));

//创建模型
function predict(x) {
        // y = a * x ^ 3 + b * x ^ 2 + c * x + d
    return tf.tidy(() => {
        return a.mul(x.pow(tf.scalar(3))) // a * x^3
        .add(b.mul(x.square())) // + b * x ^ 2
        .add(c.mul(x)) // + c * x
        .add(d); // + d
    });
}

// console.log(a,b,c,d)
export default {
    computed:{
        //echarts图标参数
        option(){
            return{
                title: {
                    text: '拟合回归',
                    subtext:'三次'
                },
                tooltip: {},
                xAxis: {
                    max:1,//x轴 固定长度
                    min:-1,
                    type: 'value',
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    },//那些虚线，估计你看不到
                    splitNumber: 20
                },
                yAxis: {
                    max:1,
                    min:0,
                    type: 'value',
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    }
                },
                series: [
                    //绘制点
                    {
                        data: this.dotData,
                        name: '点',
                        type: 'scatter',
                        label: {
                            emphasis: {
                                show: true,
                                position: 'left',
                                textStyle: {
                                    color: 'blue',
                                    fontSize: 16
                                }
                            }
                        },//lable 用来 当鼠标放到点上面显示 具体的值
                    },
                    {
                        name: '线',
                        type: 'line',
                        showSymbol: false,
                        smooth: true,//使线连贯地绘制
                        data: this.lineData,
                      
                    }
                
                ]
            }
        }
    },
    data(){
        return{
            hasData:true,
            trainingData:[],
            inintEle:'',
            inintEletrain:'请点击拟合训练模型',
            dotData:[
             
            ],
            lineData:[],
            xData:[],
            yData:[]
        }
    },
    created(){
        this.inintEle= {
            a:a.dataSync()[0],
            b:b.dataSync()[0],
            c:c.dataSync()[0],
            d:d.dataSync()[0]
        }
        // a是tensorflow 的数据，需要 dataSync() 一下才能得到 在页面显示的 数值
    },
    mounted (){

    },
    methods:{
        //画图
        randerUi(){
            let vue = this
            
            var myChart = echarts.init(document.getElementById('main'));
            myChart.setOption(vue.option);

        },
        
        getTrainData(){
            let vue = this
            vue.hasData = !vue.hasData//不让还没获取数据就拟合--按钮的 disabled
            
            //获取初始数据，可以不用管
            const trueCoefficients = {a: -.8, b: -.2, c: .9, d: .5};
            vue.trainingData = generateData(100, trueCoefficients);


            vue.xData = vue.trainingData.xs
            vue.yData = vue.trainingData.ys
            //悄悄地分别把训练数分别 保存起来，后面有用

            let lineDatax = [...vue.xData.dataSync()] //等同 push 貌似用深copy的作用
            
            lineDatax.sort(function(a,b){
                return a - b
            })//从大到小排序
            
            
            let lineDatay = predict(tf.tensor(lineDatax)).dataSync()
            //用预测模型 预测 获得 y

            let xs = [...vue.trainingData.xs.dataSync()]
            let ys = [...vue.trainingData.ys.dataSync()]
            //深copy一下，vue.trainingData 后面还有用 不能下面操作改变其值
            
            vue.dotData = []//画点的数据
            vue.lineData = []//画线的数据

            for(let index in xs){   
                vue.dotData.push([xs[index],ys[index]]) 

                vue.lineData.push([lineDatax[index],lineDatay[index]])
            }
            
      
            vue.randerUi() //点的数据有了，线的数据有了 就 画图了
        },

        loss(predictions, labels) {
        // 将labels（实际的值）进行抽象
        // 然后获取平均数.
            const meanSquareError = predictions.sub(labels).square().mean()
           
            return meanSquareError
        },
        //训练迭代器
        train() {
             
            let vue = this
          
            vue.lineData = []

            //优化器
            const learningRate = 0.5;
            const optimizer = tf.train.sgd(learningRate);
            //tensorfloww 自带，目前记住即可。用来改变 a,b,c的值,至于是如何改变a,b,c就不要管了

           
            for (let iter = 0; iter < 400; iter++) {
                optimizer.minimize(() => {
                    const predsYs = predict(vue.xData);
                    return vue.loss(predsYs, vue.yData);
                });
            }
            //optimizer 搞400次，通过不断减少 loss 返回的值 去执行 优化


            //搞了400次 参数调整得参不多了，该把曲线重新绘制了。把获取到的 数据x 带入 训练好的 预测模型里，
            //就是 predict()这个函数

            let lineDatax = [...vue.xData.dataSync()]
            
            lineDatax.sort(function(a,b){
                return a - b
            })//排下序
        
            let lineDatay = predict(tf.tensor(lineDatax)).dataSync()
           
            for(let index in lineDatax){   
            
                vue.lineData.push([lineDatax[index],lineDatay[index]])
            }

            vue.inintEletrain= {

                a:a.dataSync()[0],
                b:b.dataSync()[0],
                c:c.dataSync()[0],
                d:d.dataSync()[0]
                
            }//显示新的参数
            
            vue.randerUi()

          
        }  

    }
}
</script>
<style>
    .gy-echart-card{
        width: 100%;
        height: 640px
    }
</style>
