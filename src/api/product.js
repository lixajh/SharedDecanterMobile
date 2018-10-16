import { post } from '@/common/request/post'


export function getProductList() {
  
    return post('/product/list',{})
}

// export function getPayInfo(productId,deviceId) {
  
//   return post('/pay/getPayInfo',{'fkProductId':productId,'fkDeviceId':deviceId})
// }