import Vue from 'vue';
import store from '../store/index';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Profile from '../views/Profile.vue';
import Schedule from '../views/Schedule.vue';

import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/login',
		name: 'login',
		component: Login,
		meta: {
			requiresGuest: true
		}
	},
	{
		path: '/',
		name: 'home',
		component: Home,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/profile',
		name: 'profile',
		component: Profile,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/schedule',
		name: 'schedule',
		component: Schedule,
		meta: {
			requiresAuth: true
		}
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
	
		if (store.getters.isLoggedIn) {
			
			next();
		} else {
			
			next({
				path: '/login'
			});
		}
	} else if (to.matched.some((record) => record.meta.requiresGuest)) {
		if (store.getters.isLoggedIn) {
			
			next({
				path: from.fullPath
			});
		} else {
			next();
		}
	} else {
		// Proceed to route
		next();
	}
});

export default router;
