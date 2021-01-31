const {api} = require('../../utils/ajax')
const article = {
  state: {
    articleList: [],
    totalCount: 0,
    listQuery: {
      pageNum: 1,//页码
      pageRow: 50,//每页条数
      name: ''
    },
  },
  mutations: {
    setArticle (state, data) {
      state.articleList = data.list
      state.totalCount = data.totalCount
    },
  },
  actions: {
    getArticleList ({state, commit}) {
      return api('GET', '/article/listArticle', state.listQuery)
        .then(data => {
            commit('setArticle', data)
          }
        )
    }
  }
}
export {article}
