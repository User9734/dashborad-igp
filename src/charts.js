import VueChartJs from 'vue-chartjs'
import Vue from 'vue'
import axios from 'axios'
import store from './store'
import {URL_COMMERCE_API} from '@/config'

Vue.component('line-chart', {
  extends: VueChartJs.Bar,
  mounted () {
    var periode = store.state.periode
    var bests = []
     /*  */
     /*  */
    
    function axio() {
      axios.post(URL_COMMERCE_API+'bestproduct', periode)
            .then(function (reponse){
                console.log('reponse', reponse.data);
              bests = reponse.data
              console.log('chart.js',bests);
            })
            console.log('periode_chartjs',periode);
            return bests.length
            
    }
    this.renderChart({
      labels: ['1', '2', '3', '4'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          barThickness : 5,
          data: [40, axio('2021-10-01','2021-10-31'), axio('2021-11-01','2021-11-31'), axio('2021-12-01','2021-12-31'),100]
        },
        {
          label: 'Data Two',
          backgroundColor: '#f99979',
          barThickness : 5,
          data: [100,23,14,33,100]
        }
      ],
      options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
    }, {responsive: true, maintainAspectRatio: false})
  }
  
})