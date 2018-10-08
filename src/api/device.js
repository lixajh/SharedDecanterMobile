import { post } from '@/common/request/post'


export function getDeviceDetailByCode(code) {
  
    return post('/device/detailByCode',{'code':code})
}

export function getPayInfo(productId,deviceId) {
  
  return post('/pay/getPayInfo',{'fkProductId':productId,'fkDeviceId':deviceId})
}