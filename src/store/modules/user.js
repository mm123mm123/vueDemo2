import {api} from '../../utils/ajax'
import {router, childrenRoutes} from '../../router'

const user = {
  state: {
    listQuery: {
      pageNum: 1,//页码
      pageRow: 50,//每页条数
    },
    totalCount: 0,
    userList: [],
    userNickName: '',
    userMenuList: []
  },
  mutations: {
    setUserList (state, data) {
      state.userList = data.list
    },
    setTotalCount (state, data) {
      state.totalCount = data.totalCount
    },
    setUserNickName (state, data) {
      state.userNickName = data.nickname
    },
    setUserMenuList (state, data) {
      state.userMenuList = data.menuList
    }
  },
  actions: {
    login ({state, commit}, loginInfo) {
      return api('POST', '/login/auth', loginInfo)
    },
    getInfo ({state, commit}) {
      return api('POST', '/login/getInfo')
        .then(res => {
          if (res.code === '100') {
            console.log(res)
            commit('setUserNickName', res.info.userPermission)
            commit('setUserMenuList', res.info.userPermission)
          }
        })
    },
    getUserList ({state, commit}) {
      return api('GET', '/user/list', state.listQuery)
        .then(data => {
          commit('setUserList', data)
          commit('setTotalCount', data)
        })
    },
    addUser ({}, params) {
      api('POST', '/user/addUser', params.userInfo)
        .then(res => {
          if (res.code === '100') {
            params.success()
          } else {
            throw new Error(res.msg)
          }
        }).catch(err => {
        params.fail(err)
      })
    },
    editUser ({}, params) {
      api('POST', '/user/updateUser', params.editUserInfo)
        .then(res => {
          if (res.code === '100') {
            params.success()
          } else {
            throw new Error(res.msg)
          }
        }).catch(err => {
        params.fail(err)
      })
    },
    deleteUser () {
      api()
    }
  }
}
export {user}
