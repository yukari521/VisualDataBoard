<template>
    <div id="sexPie"></div>
</template>

<script>
export default {
    name:'sexPie',
    data () {
      return {
          pieChart:null,
          options:{
                title:{
                    text:'男女比例',
                    textStyle:{
                        color:'#fff'
                    },
                    left:'30%',
                    top:10
                },
                legend:{
                    orient: 'vertical',
                    top:'50%',
                    right:10,
                    textStyle:{
                        color:'#fff'
                    },
                    data:['男性','女性']
                },
                color:['#1699e5','#fb106e'],
                series:[{
                    type: 'pie',
                    radius:[0,'60%'],
                    center: ['40%', '60%'],
                    data:[
                        {value:580, name:'男性'},
                        {value:420, name:'女性'}
                    ],
                    label:{
                        normal:{
                            show:true,
                            position:'inside',
                            formatter:'{b} \n{d}%'
                        }                      
                    },
                    labelLine:{
                        normal:{
                            show:false
                        }
                    }
                }]
          } 
      }
    },
    mounted(){
        this.pieChart = this.$echarts.init(document.getElementById('sexPie'))
        this.pieChart.setOption(this.options)  
    }
}
</script>

<style>
#sexPie{
    width: 24.323vw;
    height: 19.583vw;
}
</style>

