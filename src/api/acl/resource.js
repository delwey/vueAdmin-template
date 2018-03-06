import request from '@/utils/request'

export function getTree() {
  return request.get('/acl/resource/getTree?rootId=0000')
}

export function add(form) {
  return request.post('/acl/resource/add', form)
}

export function update(form) {
  return request.post('/acl/resource/update', form)
}

export function remove(orgId) {
  return request.post('/acl/resource/delete?id=' + orgId)
}
