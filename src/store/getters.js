const getters = {
  articleList: state => state.article.articleList,
  userList: state => state.user.userList,
  roles: state => state.roles.rolesList,
  roleTable: state=> state.roles.roleTable,
  permissionList: state=> state.roles.permissionList,
  userNickName: state=>state.user.userNickName
}
export {getters}
