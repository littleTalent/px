import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  }, {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: {
      title: '首页',
      icon: 'el-icon-s-home'
    },
    children: [{
      path: 'home',
      component: () => import('@/views/home'),
      meta: {
        title: '首页',
        icon: 'el-icon-s-home'
      }
    }]
  },
  {
    path: '/network-params',
    component: Layout,
    redirect: '/network-params/basic-setting',
    meta: {
      title: '网络参数',
      icon: 'el-icon-s-home'
    },
    children: [{
        path: 'basic-setting',
        component: () => import('@/views/network-params/basic-setting'),
        meta: {
          title: '基本设置',
        }
      },
      {
        path: 'multi-ipconf',
        component: () => import('@/views/network-params/multi-ipconf'),
        meta: {
          title: '多IP配置',
        }
      }
    ]
  },
  {
    path: "/access-gateway-conf/warn-page/review/default",
    component: () => import('@/views/access-gateway-conf/warn-page-default'),
    name:"defaultWarnPage",
    meta: {
      title: '默认警告页面',
    },
    hidden:true,
    
  },
  {
    path: '/access-gateway-conf',
    component: Layout,
    meta: {
      title: '准入网关配置',
      icon: 'el-icon-s-home'
    },
    children: [{
        path: 'manage-range',
        component: () => import('@/views/access-gateway-conf/manage-range'),
        meta: {
          title: '管理范围'
        }
      },
      {
        path: 'ctrl-range',
        component: () => import('@/views/access-gateway-conf/ctrl-range'),
        meta: {
          title: '控制范围'
        }
      },
      {
        path: 'exclude-rule',
        component: () => import('@/views/access-gateway-conf/exclude-rule'),
        meta: {
          title: '例外规则'
        }
      },
      {
        path: 'warn-page',
        component: () => import('@/views/access-gateway-conf/warn-page'),
        meta: {
          title: '警告页面'
        }
      },
      {
        path: 'initiative-auth',
        component: () => import('@/views/access-gateway-conf/initiative-auth'),
        meta: {
          title: '主动认证'
        }
      },
      {
        path: 'white-list',
        component: () => import('@/views/access-gateway-conf/white-list'),
        meta: {
          title: '白名单'
        }
      },
      {
        path: 'black-list',
        component: () => import('@/views/access-gateway-conf/black-list'),
        meta: {
          title: '黑名单'
        }
      }
    ]
  },
  {
    path: '/server-manage',
    component: Layout,
    meta: {
      title: '服务器管理',
      icon: 'el-icon-s-home'
    },
    children: [{
      path: '',
      component: () => import('@/views/server-manage'),
      meta: {
        title: '服务器管理'
      }
    }]
  },
  {
    path: '/visitor-login-manage',
    component: Layout,
    meta: {
      title: '访客登录管理',
      icon: 'el-icon-s-home'
    },
    children: [{
        path: 'account-manage',
        component: () => import('@/views/visitor-login-manage/account-manage'),
        meta: {
          title: '账号管理'
        }
      },
      {
        path: 'visit-range',
        component: () => import('@/views/visitor-login-manage/visit-range'),
        meta: {
          title: '访问范围'
        }
      },
      {
        path: 'visitor-setting',
        component: () => import('@/views/visitor-login-manage/visitor-setting'),
        meta: {
          title: '访客设置'
        }
      },
      {
        path: 'visitor-log',
        component: () => import('@/views/visitor-login-manage/visit-log'),
        meta: {
          title: '访问日志'
        }
      }
    ]
  },
  {
    path: '/status-info',
    component: Layout,
    meta: {
      title: '状态信息',
      icon: 'el-icon-s-home'
    },
    children: [{
        path: 'ip-info',
        component: () => import('@/views/status-info/ip-info'),
        meta: {
          title: 'IP信息'
        }
      },
      {
        path: 'device-flow-info',
        component: () => import('@/views/status-info/device-flow-info'),
        meta: {
          title: '设备流量信息'
        }
      },
      {
        path: 'cpu-usage-info',
        component: () => import('@/views/status-info/cpu-usage-info'),
        meta: {
          title: 'cpu使用率信息'
        }
      },
      {
        path: 'memory-usage-info',
        component: () => import('@/views/status-info/memory-usage-info'),
        meta: {
          title: '内存使用率信息'
        }
      },
      {
        path: 'disk-usage-info',
        component: () => import('@/views/status-info/disk-usage-info'),
        meta: {
          title: '内存使用率信息'
        }
      }
    ]
  },
  {
    path: '/sys-manage',
    component: Layout,
    meta: {
      title: '系统管理',
      icon: 'el-icon-s-home'
    },
    children: [{
        path: 'sys-conf',
        component: () => import('@/views/sys-manage/sys-conf'),
        meta: {
          title: '系统配置'
        }
      },
      {
        path: 'sys-tool',
        component: () => import('@/views/sys-manage/sys-tool'),
        meta: {
          title: '系统工具'
        }
      },
      {
        path: 'sys-log',
        component: () => import('@/views/sys-manage/sys-log'),
        meta: {
          title: '系统日志'
        }
      }
    ]
  }, // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
