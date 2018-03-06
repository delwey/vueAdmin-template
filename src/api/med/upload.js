import request from '@/utils/request'

export function remove(uploadId) {
  return request.post('/med/coder/delete?uploadId=' + uploadId)
}

export function list(key, currentPage, pageSize) {
  return request.get('/med/coder/list?key=' + key + '&currentPage=' + currentPage + '&pageSize=' + pageSize)
}

export function analysis(uploadId) {
  return request.post('/med/coder/analysis?uploadId=' + uploadId)
}

export function getPercent(uploadId) {
  return request.get('/med/coder/getPercent?uploadId=' + uploadId)
}

export function saveMapping(form) {
  return request.post('/med/coder/saveMapping', form)
}

export function selectableDbCols(uploadId) {
  return request.get('/med/coder/selectableDbCols?uploadId=' + uploadId)
}

export function getMapping(uploadId) {
  return request.get('/med/coder/getMapping?uploadId=' + uploadId)
}
