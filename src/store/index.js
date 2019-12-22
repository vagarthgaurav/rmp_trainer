import Vue from 'vue';
import Vuex from 'vuex';
import VueCookies from 'vue-cookies';
import axios from 'axios';

Vue.use(Vuex);
Vue.use(VueCookies);

let root = 'http://api.formavisioplus.com/v1';

export default new Vuex.Store({
	state: {
		token: VueCookies.get('user_token') || ''
	},
	mutations: {
		saveUser: (state, { user }) => {
			localStorage.setItem('user_data', JSON.stringify(user));
		}
	},
	getters: {
		isLoggedIn: (state) => !!state.token,
		getUser: () => {
			return JSON.parse(localStorage.getItem('user_data'));
		}
	},
	actions: {
		
	},
	modules: {}
});
