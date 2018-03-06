import request from '@/utils/request'

export function getById(userId) {
  return request.get('/acl/user/getById?userId=' + userId)
}

export function list(key, currentPage, pageSize) {
  return request.get('/acl/user/list?key=' + key + '&currentPage=' + currentPage + '&pageSize=' + pageSize)
}

export function add(form) {
  return request.post('/acl/user/add', form)
}

export function update(form) {
  return request.post('/acl/user/update', form)
}

export function remove(orgId) {
  return request.post('/acl/user/delete?id=' + orgId)
}

export function getRoles(id) {
  return request.get('/acl/user/getRoles?id=' + id)
}

export function saveRoles(id, roleIds) {
  return request.post('/acl/user/saveRoles?id=' + id + '&roleIds=' + roleIds)
}

