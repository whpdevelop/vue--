// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入公共样式
import '@/assets/scss/base.css'
// 配置vant ui 组件
import 'vant/lib/vant-css/base.css';
import 'vant/lib/vant-css/button.css';

// 布局组件
import { Row, Col } from 'vant';
Vue.use(Row).use(Col);

// 按钮组件
import { Button } from 'vant';
Vue.use(Button);

// 列表组件(滑到底部加载更多)
import { List, Cell } from 'vant';
Vue.use(List).use(Cell);

// 评分组件
import { Rate } from 'vant';
Vue.use(Rate);

// 配置axios 
import axios from 'axios'
Vue.prototype.axios = axios
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
