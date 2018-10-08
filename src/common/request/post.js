import request from '@/common/request/request'
import qs from 'qs';

export function post(url,data){
    // alert(JSON.stringify(data))
    return request({
      url: url,
      method: 'post',
      data: qs.stringify(data)
      // qs.stringify({'params':JSON.stringify(data)})
    })
  }