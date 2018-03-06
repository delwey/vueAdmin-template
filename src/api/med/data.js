import request from '@/utils/request'

export function download() {
  return request.get('/med/data/download')
}

export function list(param) {
  return request({ url: '/med/data/list', method: 'post', data: param })
}

export function uploadList(uploadId) {
  return request.get('/med/data/uploadList')
}

export function ruleList(uploadId) {
  return request({
    url: '/med/data/ruleList',
    method: 'get',
    params: { uploadId: uploadId }
  })
}

export function update(form) {
  return request.post('/med/data/update', form)
}

export function detail(recordId) {
  return request.get('/med/data/detail?recordId=' + recordId)
}

export function dxDatas(recordId) {
  return request.get('/med/data/dxDatas?recordId=' + recordId)
}

export function procDatas(recordId) {
  return request.get('/med/data/procDatas?recordId=' + recordId)
}
