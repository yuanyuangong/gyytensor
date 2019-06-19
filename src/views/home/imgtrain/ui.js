import echarts from 'echarts'

export function showTestResults(batch, predictions, labels) {
  const imagesElement = document.getElementById('images');
  const testExamples = batch.xs.shape[0];
  imagesElement.innerHTML = '';
  for (let i = 0; i < testExamples; i++) {

    const image = batch.xs.slice([i, 0], [1, batch.xs.shape[1]]);

    const div = document.createElement('div');
    div.className = "fl"

    const canvas = document.createElement('canvas');
  
    draw(image.flatten(), canvas);

    const pred = document.createElement('div');

    const prediction = predictions[i];
    const label = labels[i];
    const correct = prediction === label;

    pred.className = `${(correct ? 'pred-correct' : 'pred-incorrect')}`;
    pred.innerText = `${prediction}`;

    div.appendChild(pred);
    div.appendChild(canvas);

    imagesElement.appendChild(div);
 
    // return canvas
  }
}

export function draw(image, canvas) {
  const [width, height] = [28, 28];
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const imageData = new ImageData(width, height);
  const data = image.dataSync();
  for (let i = 0; i < height * width; ++i) {
    const j = i * 4;
    imageData.data[j + 0] = data[i] * 255;
    imageData.data[j + 1] = data[i] * 255;
    imageData.data[j + 2] = data[i] * 255;
    imageData.data[j + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);
}



const lossValues = [[],[]];
export function plotLoss(batch, loss, set) {

  const series = set === 'train' ? 0 : 1;

  lossValues[series].push( [batch,loss])

  const lossContainer = document.getElementById('loss-canvas');
  var lossChart = echarts.init(lossContainer);
  const option ={
    title: {
      text: '损失曲线',
      subtext:'损失率：'+loss.toFixed(3),
      textStyle:{
        fontSize:18,
      }
    },
    legend: {
      data:['训练','验证']
    },
    xAxis: {
    },
    yAxis: {},
    series: [{
        name:'训练',
        symbol: 'none',
        type: 'line',
        smooth: true,
        data:lossValues[0],
        animationEasing: name,
        animationDuration: 1000

    },
    {
      name:'验证',
      symbol: 'none',
      type: 'line',
      smooth: true,
      data:lossValues[1],
      animationEasing: name,
        animationDuration: 1000
    }]
  }
  lossChart.setOption(option)

}

const accuracyValues = [[], []];
export function plotAccuracy(batch, accuracy, set) {
 
  const series = set === 'train' ? 0 : 1;
  accuracyValues[series].push([ batch, accuracy]);
  
  const accuracyContainer = document.getElementById('accuracy-canvas');
  var accuracyChart = echarts.init(accuracyContainer);
  const option ={
    title: {
      text: '精确度曲线',
      subtext:'精确度：'+accuracy.toFixed(3),
      textStyle:{
        fontSize:18,
      }
    },
    legend: {
      data:['训练','验证']
    },
    xAxis: {
    },
    yAxis: {},
    series: [{
        name:'训练',
        symbol: 'none',
        type: 'line',
        smooth: true,
        data:accuracyValues[0],
        animationEasing: name,
        animationDuration: 1000

    },
    {
      name:'验证',
      symbol: 'none',
      type: 'line',
      smooth: true,
      data:accuracyValues[1],
      animationEasing: name,
        animationDuration: 1000
    }]
  }
  accuracyChart.setOption(option)

}
