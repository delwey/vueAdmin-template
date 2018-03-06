import request from '@/utils/request'

export function getTree() {
  return request.get('/acl/role/getTree?rootId=0000')
}

export function add(form) {
  return request.post('/acl/role/add', form)
}

export function update(form) {
  return request.post('/acl/role/update', form)
}

export function remove(orgId) {
  return request.post('/acl/role/delete?id=' + orgId)
}

export function getResources(id) {
  return request.get('/acl/role/getResources?id=' + id)
}

export function saveResources(id, resourceIds) {
  return request.post('/acl/role/saveResources?id=' + id + '&resourceIds=' + resourceIds)
}

