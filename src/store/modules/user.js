import {api} from '../../utils/ajax'

const user = {
  state: {
    listQuery: {
      pageNum: 1,//页码
      pageRow: 50,//每页条数
    },
    totalCount: 0,
    userList: [],
    roles: []
  },
  mutations: {
    setUserList (state, data) {
      state.userList = data.list
    },
    setTotalCount (state, data) {
      state.totalCount = data.totalCount
    },
    setRoles (state, data) {
      state.roles = data.list
    }
  },
  actions: {
    login ({state, commit}, loginInfo) {
      return api('POST', '/login/auth', loginInfo)
    },
    getInfo () {
      return api('POST', '/login/getInfo')
    },
    getUserList ({state}) {
      return api('GET', '/user/list', state.listQuery)
    },
    getRoles () {
      return api('GET', '/user/getAllRoles')
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
      api('POST', '/user/updateUser',  params.editUserInfo)
        .then(res => {
          if (res.code === '100') {
            params.success()
          } else {
            throw new Error(res.msg)
          }
        }).catch(err => {
        params.fail(err)
      })
    }
  }
}
export {user}
