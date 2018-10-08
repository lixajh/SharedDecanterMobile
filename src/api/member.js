import { post } from '@/common/request/post'

export function getMemberDetail() {
  
    return post('/member/detail')
  }