<template>
    <div>
      <div class="row">
            <div class="col-2">
                <div class="gy-card">
                    <button class="btn btn-block btn-lg btn-inverse" @click="startTrain" :disabled="isDisabled">获取数据</button>
                </div>
            </div>
            <div class="col-7">
              <div class="palette palette-turquoise">状态：{{ status }}</div>
              <div class="palette palette-green-sea" style="padding:8px">
            
                <div class="progress">
                  <div class="progress-bar" v-bind:class="progressClass" 
                    :style="{width:progress}">
                  </div>
                </div>

              </div>
              <div class="row" >

                  <div class="col-6">

                    <div id="loss-canvas" class="gy-card" style="min-width:200px;height:400px;margin-top:32px"></div>
                  </div>
                  <div class="col-6">
                    <div id="accuracy-canvas" class="gy-card" style="min-width:200px;height:400px;margin-top:32px"></div>
                  </div>
                
              </div>
              
            </div>
            <div class="col-3">
              <div class="palette palette-peter-river">预测结果显示</div>
              <div id="images" class="gy-flow-img"></div>
            </div>
      </div>     
      
    </div>
</template>
<script>
import * as tf from '@tensorflow/tfjs'

import {IMAGE_H, IMAGE_W, MnistData} from './data'

// This is a helper class for drawing loss graphs and MNIST images to the
// window. For the purposes of understanding the machine learning bits, you can
// largely ignore it
import * as ui from './ui';

function createConvModel() {

  const model = tf.sequential();//简单的堆叠模型，不要问为社么，这就是 tensorflow 里的模型，用就行了

  //我们先默认 一次 输入一张 28*28（28像素*28像素） 的图片。深度不用管（每个像素颜色数量，这里只用黑 那就是 1。白？不是透明吗，）

  model.add(tf.layers.conv2d({   // tf.layers.conv2d 2维卷积层 
    inputShape: [IMAGE_H, IMAGE_W, 1],//inputShape为 高 宽 深度1 的 图片
    kernelSize: 5, //5*5的卷积窗口 （24*24）
    filters: 8, //8个过滤器（8个特征矩阵）
    strides: 1,//步进为1
    activation: 'relu', //激活函数 添加非线性
    kernelInitializer: 'VarianceScaling' //初始模型的权重
  }));
  //产出 （24*24）*8（8（过滤器）可以理解为8图层，想想ps的图层吧） 
  //如果步进为2,那就是（12*12） 具体自己去百度， 图片卷积原理，有更专业的知识

   
  model.add(tf.layers.maxPooling2d({poolSize: 2, strides: 2}));//最大池化（在矩阵2*2）中去最大值 （6*6）
  //目前是 嫌卷积过后的 信息太多，进一步提取信息。

  // Our third layer is another convolution, this time with 32 filters.
  model.add(tf.layers.conv2d({kernelSize: 3, filters: 32, activation: 'relu'}));
  //再次卷积，目的？

  // Max pooling again.
  model.add(tf.layers.maxPooling2d({poolSize: 2, strides: 2}));
  //再次池化，目的？

  // Add another conv2d layer.
  model.add(tf.layers.conv2d({kernelSize: 3, filters: 32, activation: 'relu'}));
  //第三次卷积，可以理解，我们学习不都是这样吗，反反复复，用不同的方法去深化学习

  // Now we flatten the output from the 2D filters into a 1D vector to prepare
  // it for input into our last layer. This is common practice when feeding
  // higher dimensional data to a final classification output layer.
  model.add(tf.layers.flatten({}));//多维输出 一维化 （多维数组转成一维数组）

  model.add(tf.layers.dense({
      units: 64, //神经元数量
      // kernelInitializer: 'VarianceScaling',//权重初始化策略 
      activation: 'relu',//添加非线性
  }));

  //全链接层 执行最终的分类，搞了这么，就要对图片分类啊，刚开始有点蒙，先分成 64 类，下面在 规整一下分成 0-9 10类

  // Our last layer is a dense layer which has 10 output units, one for each
  // output class (i.e. 0, 1, 2, 3, 4, 5, 6, 7, 8, 9). Here the classes actually
  // represent numbers, but it's the same idea if you had classes that
  // represented other entities like dogs and cats (two output classes: 0, 1).
  // We use the softmax function as the activation for the output layer as it
  // creates a probability distribution over our 10 classes so their output
  // values sum to 1.
  model.add(tf.layers.dense({units: 10, activation: 'softmax'})); //多个分类

  return model;
}

//这个是训练完了 直接用来 测试的，记住 tf.sequential(); 已经改变了，不再是刚开始的 婴儿了，现在可以区分 你给的手写字了。
function createDenseModel() {
  const model = tf.sequential();
  model.add(tf.layers.flatten({inputShape: [IMAGE_H, IMAGE_W, 1]}));
  model.add(tf.layers.dense({units: 42, activation: 'relu'}));
  model.add(tf.layers.dense({units: 10, activation: 'softmax'}));
  return model;
}

export default {
    computed:{
      progressClass(){
        let progress = this.progress
        return {
          'progress-bar-warning':progress >'50%',
          'progress-bar-danger':progress >'60%',
          'progress-bar-info':progress >'70%',
          'progress-bar-success':progress >'80%'
        }
      }
    },
    data(){
        return {
          isDisabled:false,
          canvesData:[],
          imgsrc:'',
          status:'未开始',
          modelType:'ConvNet',
          progress:'0%',
          datas:[]
        }
    },
    destroyed(){
      // alert("dsfs")
      // trainData.dispose
      // testData.dispose
      // x.dispose
    },
    async mounted (){

  
    },
    methods:{
    
      async startTrain(){
        
        let vue =this 
        vue.isDisabled = true
        vue.status = "正在加载数据"
        vue.datas = new MnistData();
      
        await vue.datas.load();

        vue.status = "创建模型中"
     
          var model
        if (vue.modelType === 'ConvNet') {
           model = createConvModel();
        } else if (vue.modelType === 'DenseNet') {
           model = createDenseModel();
        } else {
          throw new Error(`Invalid model type: ${vue.modelType}`);
        }
    
        model.summary();
        vue.status  = "开始训练模型"

        await vue.train(model, () => vue.showPredictions(model));
        //showPredictions()显示 手写字图片和 预测的结果值

      },
      async train(model, onIteration) { //onIteration 是可视化生成器
        let vue = this
        const optimizer = 'rmsprop';

        model.compile({
          optimizer, //优化器
          loss: 'categoricalCrossentropy',//损失函数
          metrics: ['accuracy'],//?
        });

        //批量大小是另一个重要的超参数。它定义了
        //在对模型的更新之间，我们将示例分组或批处理
        //训练时的重量。太低的值将使用更新权重
        //例子太少，泛化不好。需要更大的批大小
        //内存资源更多，但不能保证性能更好。

        const batchSize = 640; //批处理大小
        // Leave out the last 15% of the training data for validation, to monitor
        // overfitting during training.
        const validationSplit = 0.15;//取15%的训练数据做验证测试
        // Get number of training epochs from the UI.
        const trainEpochs = 100;//训练轮数

        // We'll keep a buffer of loss and accuracy values over time.
        let trainBatchCount = 0;
        const trainData = vue.datas.getTrainData();
        const testData = vue.datas.getTestData();
        const totalNumBatches =Math.ceil(trainData.xs.shape[0] * (1 - validationSplit) / batchSize) * trainEpochs; //总共要训练的次数
        //四舍五入
        let valAcc;
         // fit 知道怎么用就行
        await model.fit(trainData.xs, trainData.labels, {
          batchSize,//每经过多少个例子更新权重
          validationSplit,//取15%的训练数据做验证测试
          epochs: trainEpochs,//训练的轮数
          callbacks: {
            onBatchEnd: async (batch, logs) => {
               //logs很重要 里面有测试结果，损失率，精确值
              trainBatchCount++;
              console.log(batch)
              vue.progress = `${(trainBatchCount / totalNumBatches * 100).toFixed(1)}%`
              ui.plotLoss(trainBatchCount, logs.loss, 'train');//绘制损失曲线
              ui.plotAccuracy(trainBatchCount, logs.acc, 'train');//绘制精准值曲线

              //每10个数据验证一次模型
              if (onIteration && batch % 10 === 0) {
                // console.log("验证")
                onIteration('onBatchEnd', batch, logs); //onIteration 就是 传入的 showPredictions显示预测值
              }

              await tf.nextFrame();//进入下一个循环。
            },
            onEpochEnd: async (epoch, logs) => {
              valAcc = logs.val_acc;//返回验证 结果 
              ui.plotLoss(trainBatchCount, logs.val_loss, 'validation');
              ui.plotAccuracy(trainBatchCount, logs.val_acc, 'validation');
              if (onIteration) {
                onIteration('onEpochEnd', epoch, logs);
              }
              await tf.nextFrame();
            }
          }
        });

        const testResult = model.evaluate(testData.xs, testData.labels);
        const testAccPercent = testResult[1].dataSync()[0] * 100;
        const finalValAccPercent = valAcc * 100;

        // vue.progress =
        //   `Final validation accuracy: ${finalValAccPercent.toFixed(1)}%; ` +
        //   `Final test accuracy: ${testAccPercent.toFixed(1)}%`;
      },

          
      async showPredictions(model) {
        let vue = this
        const testExamples = 100;
        const examples = vue.datas.getTestData(testExamples);

        // Code wrapped in a tf.tidy() function callback will have their tensors freed
        // from GPU memory after execution without having to call dispose().
        // The tf.tidy callback runs synchronously.
        tf.tidy(() => {
          const output = model.predict(examples.xs);
          // console.log("预测")
          // tf.argMax() returns the indices of the maximum values in the tensor along
          //返回最大值所在的小标；

          //一个特定的轴。像这样的分类任务很常见
          //将类表示为一个热向量。一个热向量是一维向量
          //每个输出类对应一个元素。向量中的所有值都是0
          //除了1，它的值为1(例如[0,0,0,1,0])。的
          // model.predict()的输出将是一个概率分布，因此我们使用
          // argMax获取向量元素中索引值最高的元素
          //概率。这是我们的预测。
          //(例如argmax ([0.07, 0.1, 0.03, 0.75, 0.05)) == 3)
          // dataSync()同步下载tf。从GPU中得到张量值
          //我们可以在普通的CPU JavaScript代码中使用它们
          //(对于这个函数的非阻塞版本，使用data())。

          const axis = 1;
          const labels = Array.from(examples.labels.argMax(axis).dataSync());
          const predictions = Array.from(output.argMax(axis).dataSync());

          ui.showTestResults(examples, predictions, labels)
          // vue.canvesData.push(img_ )
          // console.log(img_)
        });

        
      }
    }
}
</script>
<style>
    .gy-flow-img{
      max-height: 640px;
      overflow: auto;
    }
    .gy-flow-img .fl{
      float: left;
      margin: 8px;
      text-align: center
    }
    .pred-correct{
      color: green
    }
    .pred-incorrect{
      color: red
    }
</style>
