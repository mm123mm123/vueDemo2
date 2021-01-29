import Vue from 'vue'
import Vuex from 'vuex'
import {article} from './modules/article'
import {getters} from './getters'
import {user} from './modules/user'

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
      user,
      article
    },
    getters
  }
)
export {store}
