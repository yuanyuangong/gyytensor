import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/assets/scripts/http'
import { async } from 'q';
// var http = new HttpRequest() 

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
    GET_MINST:async ({commit,state},data)=>{

      let response = await http({
          url: '/tensor/mnist',
          method: 'get'
      })
      return response
    },
    ADD_ERROR:({commit,state},data)=>{

    },
    GET_CRAWLER_DATA:async({commit,state},data)=>{
      console.log(data)
      let response = await http({
        url: '/getCrawlerData',
        method:'post',
        data
      })
      return response
    }
  }
})
