import Vue from 'vue';
import Vuetify from 'vuetify/lib';



Vue.use(Vuetify);

export default new Vuetify({
	icons: {
		iconfont: 'mdiSvg' // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
	},
	theme: {
		themes: {
			light: {
				primary: '#4B3F72',
				secondary: '#88498F',
				button: '#E9F7CA'
			}
		}
	}
});
