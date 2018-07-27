import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/components/layout'
import index from '@/components/index'

// 测试组件
import test from '@/components/test'

// 公共模板组件
/* 
  电影和图书列表公共模板
*/
import listCommon from '@/components/common/listCommon'

/* 
  电影和图书详情公共模板
*/
import detailCommon from '@/components/common/detailCommon'

// 电影模块
import movie from '@/components/movie/movie'
// import detail from '@/components/movie/subs/detail'

import broadcast from '@/components/broadcast/broadcast'
import book from '@/components/book/book'
import login from '@/components/login/login'
import search from '@/components/search/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: layout,
      children: [
        {
          path: '/',
          name: 'index',
          component: index,
        },
        {
          path: '/movie',
          name: 'movie',
          component: movie,
        },
        {
          path: '/movie/:type',
          name: 'listCommon',
          component: listCommon,
        },
        {
          path: '/book/:type',
          name: 'listCommon',
          component: listCommon,
        },
        {
          path: '/movie/detail/:id',
          name: 'detailCommon',
          component: detailCommon,
        },
        {
          path: '/book/detail/:id',
          name: 'detailCommon',
          component: detailCommon,
        },
        {
          path: '/broadcast',
          name: 'broadcast',
          component: broadcast,
        },
        {
          path: '/book',
          name: 'book',
          component: book,
        },
        {
          path: '/login',
          name: 'login',
          component: login,
        },
        {
          path: '/search',
          name: 'search',
          component: search,
        },
      ]
    },
    {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})
