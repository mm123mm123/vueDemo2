import {api} from '../../utils/ajax'

const user = {
  actions: {
    login ({state,commit},loginInfo) {
      return api('POST', '/login/auth', loginInfo)
    },
    getInfo () {
      return api('POST', '/login/getInfo')
    }
  }
}
export {user}
