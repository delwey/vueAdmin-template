import request from '@/utils/request'

export function getTree() {
  return request.get('/acl/organize/getTree?rootId=0000')
}

export function typeList() {
  return request.get('/acl/organize/typeList')
}

export function add(form) {
  return request.post('/acl/organize/add', form)
}

export function update(form) {
  return request.post('/acl/organize/update', form)
}

export function remove(orgId) {
  return request.post('/acl/organize/delete?id=' + orgId)
}
