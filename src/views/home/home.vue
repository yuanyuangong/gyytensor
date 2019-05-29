<template>
    <div class="row">
       <div class="col-4">
           <div class="palette palette-peter-river">
               加入前端界的深度学习 ：
               qq群 <a style="cursor:pointer; color:" id="qqnumber" @click="copy"> 660357555 </a>
           </div>
           <div class="gy-card">
            需要的技能：

           </div>
       </div>
       <div class="col-8">
            <div class="palette palette-turquoise">
               <img src="../../assets/images/icons/clocks.svg" alt="Watches" style="height:20px;margin-right:4px"> 时之回廊
            </div>
            <div class="gy-card shaft">
                 <timeLine :points="points"></timeLine>
            </div>
       </div>
    </div>
</template>
<script>
import timeLine from '../../components/timeline.vue'
export default {
    components:{
        timeLine
    },
    data(){
        return {
            points:[
                 {
                    pointColor: 'red', // important! the color of every time point and you can use red yellow or green *关键点颜色 可选red yellow green
                    img: '../../assets/images/icons/clocks.svg', // img url for every time point 图片地址 可留空
                    title: '手写字识别', // important! title *时间点标题
                    text: '学习图片卷积原理', // important! the content you want show *时间点内容
                    linkUrl: '', // url for read more 链接url 留空则不显示按钮
                    linkText: 'Read detail', // show what in read for more button 按钮显示内容 默认为Read more
                    date: '2019-5-29' // time of the point 时间点
                },
                {
                    pointColor: 'green', // important! the color of every time point and you can use red yellow or green *关键点颜色 可选red yellow green
                    img: '../../assets/images/icons/clocks.svg', // img url for every time point 图片地址 可留空
                    title: '线性回归', // important! title *时间点标题
                    text: '学习演示', // important! the content you want show *时间点内容
                    linkUrl: '', // url for read more 链接url 留空则不显示按钮
                    linkText: 'Read detail', // show what in read for more button 按钮显示内容 默认为Read more
                    date: '2019-5-20' // time of the point 时间点
                },
               
            ]
        }
    },
    methods:{
        copy() {  
            var input = document.createElement("input");     // 直接构建input
            input.value = "660357555";   // 设置内容
            document.body.appendChild(input);        // 添加临时实例
            input.select();      // 选择实例内容
            document.execCommand("Copy");     // 执行复制
            document.body.removeChild(input);  // 删除临时实例
            alert("复制成功")
        }
    }
}
</script>

<style>
  .shaft .line{
      width: 1px;
      height: 100%;
      margin: 0 auto;
      background-color: dimgrey
  }
 
  
</style>