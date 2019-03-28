const getOptions = function() {
    let options = {
        title: {
          text: '',
          textStyle: {
            color: '#fff',
            fontSize: 16
          },
          left: '30%',
          top: 8
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '16%'
        },
        legend: {
          show: true,
          data: [{ name: '', icon: 'rect' }],
          itemWidth: 14,
          textStyle: {
            color: '#fff'
          },
          right: '10%',
          top: '10%'
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#fff'
          },
          axisLine: {
            show: false
          },
          axisTick: { show: false },
          splitLine: {
            show: false
          },
          data: []
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff'
          },
          axisLine: {
            show: false
          },
          axisTick: { show: false },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['rgba(179,227,255,0.2)']
            }
          }
        },
        color: ['#fb106e'],
        series: [
          {
            data: [],
            name: '',
            type: 'line',
            smooth: true,
            markPoint: {
              symbolSize: 40,
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            }
            // markLine: {
            //     data: [
            //         {type: 'average', name: '平均值'}
            //     ]
            // }
          }
        ]
      };
    return JSON.parse(JSON.stringify(options));
};
export default getOptions;