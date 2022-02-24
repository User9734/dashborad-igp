import VueChartJs from 'vue-chartjs'
import Vue from 'vue'
//import axios from 'axios'
//import store from './store'
//import {URL_COMMERCE_API} from '@/config'

Vue.component('line-chart', {
  extends: VueChartJs.Bar,
  props: {
    periode: {
      type: Object,
      default: null
    },
    drawy: {
      type: Function,
    }, 
    length: {
      type: Number,
    }, 
  },
  mounted () {
    
     /*  */
     /*  */
    this.drawy
    
    this.renderChart({
      labels: ['1', '2', '3', '4'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          barThickness : 5,
          data: [40, this.length, 65, 89, 100]
        },
        {
          label: 'Data Two',
          backgroundColor: '#999999',
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