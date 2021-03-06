import Vue from 'vue'
import App from './App.vue'
import Game from './Game.vue'

Vue.component('game', Game);

new Vue({
  el: '#app',
  render: h => h(App)
})
