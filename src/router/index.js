import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/dataMgr',
    component: Layout,
    redirect: '/data/upload',
    name: 'DataMgr',
    meta: { title: '数据管理', icon: 'example' },
    children: [
      {
        path: 'upload',
        name: 'Upload',
        component: () => import('@/views/med/coder/upload'),
        meta: { title: '上传管理', icon: 'tree' }
      },
      {
        hidden: true,
        path: 'mapping',
        name: 'Mapping',
        component: () => import('@/views/med/coder/mapping'),
        meta: { title: 'mapping', icon: 'tree' }
      },
      {
        path: 'data',
        name: 'Data',
        component: () => import('@/views/med/data/data'),
        meta: { title: '数据查询', icon: 'tree' }
      },
      {
        hidden: true,
        path: 'detail',
        name: 'Detail',
        component: () => import('@/views/med/data/detail'),
        meta: { title: 'detail', icon: 'tree' }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '权限管理', icon: 'example' },
    children: [
      {
        hidden: true,
        path: 'userAdd',
        name: 'UserAdd',
        component: () => import('@/views/acl/user/userAdd')
      },
      {
        path: 'userList',
        name: 'UserList',
        component: () => import('@/views/acl/user/userList'),
        meta: { title: '用户管理', icon: 'tree' }
      },
      {
        path: 'organize',
        name: 'Organize',
        component: () => import('@/views/acl/organize/index'),
        meta: { title: '机构管理', icon: 'tree' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/acl/role/index'),
        meta: { title: '角色管理', icon: 'tree' }
      },
      {
        path: 'resource',
        name: 'Resource',
        component: () => import('@/views/acl/resource/index'),
        meta: { title: '资源管理', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

