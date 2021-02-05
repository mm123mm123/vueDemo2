import Vue from 'vue'
import Vuex from 'vuex'
import {article} from './modules/article'
import {getters} from './getters'
import {user} from './modules/user'
import {roles} from './modules/roles'


Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
      user,
      roles,
      article
    },
    getters
  }
)
export {store}
