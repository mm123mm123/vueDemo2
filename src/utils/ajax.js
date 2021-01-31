import {getToken, removeToken, setToken} from '@/utils/auth'

const api = function (method, path, data) {
  if (method === 'GET') {
    const params = Object.keys(data).map(key => key + '=' + data[key]).join('&')
    return fetch(process.env.BASE_URL + path + '?' + params, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Cookie': getToken(),
      },
      credentials: 'include',
    }).then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.code === '100') {
          return jsonRes.info
        }
      })
  } else if (method === 'POST') {
    return fetch(process.env.BASE_URL + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Cookie': getToken(),
      },
      credentials: 'include',
      body: JSON.stringify(data),
    }).then(res => res.json())
  }
}
export {api}
