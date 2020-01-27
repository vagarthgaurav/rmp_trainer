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
				event: '#820263',
				eventHover: '#FF5376',
				loader: '#2E86AB'
			}
		}
	}
});
