import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const requireFix = (fileName) => {
  let component = null
  try {
    component = require('@/pages/' + fileName).default
  } catch (error) {
    component = {
      template: `
        <div>
        该文件不存在或解析错误：/pages/${fileName}.vue
        </div>
      `
    }
  }
  return component
}

/**
 * 自动配置组件
 *
 * @param {any} path 路径
 * @param {any} [fileName] 文件名，不填写则使用路径同名文件
 * @returns
 */
const makeRoute = (path, fileName = path) => {
  return {
    path: '/' + path,
    name: fileName.replace(/\//g, '_'),
    component: requireFix(fileName)
  }
}

// 火车票
const tickets = [
  makeRoute('ticket', 'ticket/home'), // 100%
  makeRoute('ticket/cities'), // 100%
  makeRoute('ticket/date') // 100%
]

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/ticket'
    },
    ...tickets,
    {
      path: '*',
      name: 'NotFound',
      component: {
        template: `
          <div class="NotFoundPage">
            <h1>404</h1>
            <p>抱歉，此处尚无铁轨</p>
          </div>
        `
      }
    }
  ]
})

router.afterEach(() => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
})

export default router
