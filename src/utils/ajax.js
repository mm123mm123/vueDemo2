import {getToken, removeToken, setToken} from '@/utils/auth'

const api = function (method, path, data) {
  if (method === 'GET') {
    return new Promise((resolve, reject) => {
        const httpRequest = new XMLHttpRequest()
        httpRequest.onreadystatechange = () => {
          try {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
              if (httpRequest.status === 200) {
                const httpRes = JSON.parse(httpRequest.response)
                if (httpRes.code = '100') {
                  resolve(httpRes.info)
                }
              } else {
                alert('There was a problem with the request.')
              }
            }
          } catch (e) {
            alert('Caught Exception: ' + e.description)
          }
        }
        // if (method === 'POST') {
        //   httpRequest.open(method, process.env.BASE_URL + path)
        //   httpRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        //   if (data) {
        //     httpRequest.send(JSON.stringify(data))
        //   } else {
        //     httpRequest.send()
        //   }
        // } else if (method === 'GET') {
        const params = Object.keys(data).map(key => key + '=' + data[key]).join('&')
        httpRequest.open(method, process.env.BASE_URL + path + '?' + params)
        httpRequest.setRequestHeader('Accept', 'application/json, text/plain, */*')
        httpRequest.send(null)
        // }
      }
    )
  } else if (method === 'POST') {
    return fetch(process.env.BASE_URL + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Cookie': getToken(),
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
  }
}
export {api}
