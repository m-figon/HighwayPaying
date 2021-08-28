// store/index.js

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            logedEmail: ''
        }
    },
    getters: {
        getUser: state => {
            return state.user.logedEmail;
        }
    },
    mutations: {
        changeEmail(state, payload) {
            state.user.logedEmail = payload;
        }
    },
    actions: {}
});