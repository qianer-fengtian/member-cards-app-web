import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#00A6ED',
        secondary: '#F6511D',
        success: '8AC926',
        warning: 'FFCA3A',
        error: '#FF595E',
      }
    }
  }
});
