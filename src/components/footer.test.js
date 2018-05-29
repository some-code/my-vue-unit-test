const mount = require('@vue/test-utils').mount
const createLocalVue = require('@vue/test-utils').createLocalVue
const Footer = require('./Footer.vue').default
const VueRouter = require('vue-router')

// 行覆盖率（line coverage）：是否每一行都执行了？
// 函数覆盖率（function coverage）：是否每个函数都调用了？
// 分支覆盖率（branch coverage）：是否每个if代码块都执行了？
// 语句覆盖率（statement coverage）：是否每个语句都执行了？

describe('is render', () => {
  test('正确渲染', () => {
    const instance = mount(Footer)
    expect(instance.findAll('.page-footer--cell').length).toBe(5)
  })
})

describe('is active', () => {
  test('能够选中', () => {
    const instance = mount(Footer, {
      propsData: {
        active: 1
      }
    })
    instance.findAll('.page-footer--cell').at(1)
    expect(instance.html()).toContain(`<div class="page-footer--cell flex flex-v flex-align-center flex-pack-center active"><div icon="/reservation" class="icon"></div> <div class="label">网约车</div></div>`)
  })
})

describe('is route', () => {

  const paths = [
    '/ticket',
    '/reservation',
    '/waitingHall',
    '/more',
    '/user',
  ]

  test('能够跳转', () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter()
    const instance = mount(Footer, {
      localVue,
      router
    })

    const links = instance.findAll('.page-footer--cell')

    for(let i = 0, size = links.length;i < size;i++){
      links.at(i).trigger('click');
      expect(instance.vm.$route.path).toBe(paths[i])
    }

  })
})
