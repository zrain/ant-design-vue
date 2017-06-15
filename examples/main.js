import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './container/app.container.vue';

import Ant_Design_Vue from '../src/components';

import '../src/components/style/index.less';

import './assets/css/common.less';

Vue.use(VueRouter);

Vue.use(Ant_Design_Vue);

const routes = [
	{
		path: '/components',
		component: require('./container/component.container.vue'),
		children: [
			{
				path: 'button',
				component: require('./routers/button.demo.vue'),
			},
			{
				path: 'grid',
				component: require('./routers/grid.demo.vue'),
			},
			{
				path: 'input',
				component: require('./routers/input.demo.vue'),
			},
			{
				path: 'layout',
				component: require('./routers/layout.demo.vue'),
			},
			{
				path: 'menu',
				component: require('./routers/menu.demo.vue'),
			},
			{
				path: 'domalign',
				component: require('./routers/domAlign.demo.vue'),
			},
		]
	},
	{
		path: '*',
		redirect: '/components' 
	},
	
]

const router = new VueRouter({
	routes: routes
});


// 创建和挂载根实例。
new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});