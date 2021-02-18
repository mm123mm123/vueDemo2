const getters = {
  articleList: state => state.article.articleList,
  userList: state => state.user.userList,
  roles: state => state.roles.rolesList,
  roleTable: state=> state.roles.roleTable,
  allPermissionList: state=> state.roles.allPermissionList,
  userNickName: state=>state.user.userNickName,
  userMenuList: state=>state.user.userMenuList,
  userPermissionList:state=>state.user.userPermissionList,
}
export {getters}
