import Vue from 'vue'
import Vuex from 'vuex'
import HttpRequest from '@/assets/scripts/http'
var http = new HttpRequest() 

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
    GET_MINST:async ({commit,state},data)=>{

      let response = await http.request({
          url: '/tensor/mnist',
          method: 'get'
      })
      return response
    },
    ADD_ERROR:({commit,state},data)=>{

    }
  }
})
