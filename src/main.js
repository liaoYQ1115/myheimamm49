import Vue from 'vue'
import App from './App.vue'
//导入饿了么插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//注册饿了么
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
