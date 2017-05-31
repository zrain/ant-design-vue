import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './routers/app.vue';

import Antd from '../src/components';

import '../src/components/style/index.less';

Vue.use(VueRouter);

Vue.use(Antd);

const routes = [
	{
		path: '/button',
		component: require('./routers/button.demo.vue'),
	},
	{
		path: '/grid',
		component: require('./routers/grid.demo.vue'),
	},
]

const router = new VueRouter({
	mode: 'history',
	routes: routes
});


// 创建和挂载根实例。
new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});