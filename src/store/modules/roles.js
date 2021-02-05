import {api} from '../../utils/ajax'

const roles = {
  state: {
    rolesList: [],
    roleTable: [],
    permissionList: []
  },
  mutations: {
    setRoles (state, data) {
      state.rolesList = data.list
    },
    setRoleTable (state, data) {
      state.roleTable = data.list
    },
    setPermissionList (state, data) {
      state.permissionList = data.list
    }
  },
  actions: {
    getRoles () {
      return api('GET', '/user/getAllRoles')
    },
    getRoleTable () {
      return api('GET', '/user/listRole')
    },
    getPermissionList () {
      return api('GET', '/user/listAllPermission')
    },
    addRole ({}, params) {
       api('POST', '/user/addRole', params.roleInfo)
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
    updateRole ({}, params) {
      api('POST', '/user/updateRole', params.roleInfo)
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
    deleteRole({},params){
      api('POST', '/user/deleteRole', params.roleInfo)
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
export {roles}
