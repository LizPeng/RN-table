import toString from '../../util/toString';

export default function renderChart(props) {
  const height = `${props.height || 400}px`;
  const width = props.width ? `${props.width}px` : 'auto';
  const yDataSum = JSON.stringify(global.yDataSum || {});
  return `
    var yDataSum = JSON.parse('${yDataSum}');
    document.getElementById('main').style.height = "${height}";
    document.getElementById('main').style.width = "${width}";
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption(${toString(props.option)});
    
    myChart.on('click',function(params){
        window.postMessage(params.name);
    });
  `
}
