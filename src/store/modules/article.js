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
  actions: {
    getArticleList ({state}) {
      api('GET', '/article/listArticle', state.listQuery).then(data => {
        this.state.articleList = data.list
        this.state.totalCount = data.totalCount
      })
    }
  }
}
export {article}
