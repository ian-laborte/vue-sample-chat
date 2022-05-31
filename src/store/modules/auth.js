import axios from 'axios';

const state = {
    token: null,
    userId: null,
    error: false,
    errorCode: null, 
    errorMessage: null,
    loading: false,
    doneSignUp: false,
    isAuthenticated: false,
    email: null
};

const getters = {
    dispatch: state => {
        return {
            ...state
        }
    }
};

const actions = {
    signUp({ commit }, obj){
        commit('loadingStart');
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDx8ohiY5ir77IO6O_q-MAl57YoDwt0eN8', obj)
        .then((response) => {
            if(response.status === 200){
                commit('doneSignUp');
            }
        })
        .catch((error) => {
            const errorConfig = {
                errorCode :error.response.data.error.code,
                errorMessage:error.response.data.error.message
            }
            commit('authFail', errorConfig);
        });
    },
    cleanUp({ commit }){
        commit('cleanUp');
    },
    signIn({ commit }, obj){
        commit('loadingStart');
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDx8ohiY5ir77IO6O_q-MAl57YoDwt0eN8', obj)
        .then((response) => {
            if(response.status === 200){
                commit('authSuccess', {  token : response.data.idToken, email : response.data.email });
            }
        })
        .catch((error) => {
            const errorConfig = {
                errorCode :error.response.data.error.code,
                errorMessage:error.response.data.error.message
            }
            commit('authFail', errorConfig);
        });
    }
};
const mutations = {
    loadingStart: (state) => {
        state.loading = true;
        state.error = false;
        state.doneSignUp = false;
    },
    doneSignUp: (state) => {
        state.doneSignUp = true;
        state.loading = false;
    },
    authSuccess: (state, logindata) => {
        state.token = logindata.token;
        state.email = logindata.email;
        state.loading = false;
        state.isAuthenticated = true;
    },  
    authFail: (state, errorConfig) => {
        state.error = true;
        state.errorCode = errorConfig.errorCode;
        state.errorMessage = errorConfig.errorMessage;
        state.loading = false;
    },
    cleanUp: (state) => {  
        Object.assign(state, {
            token: null,
            userId: null,
            error: false,
            errorCode: null, 
            errorMessage: null,
            loading: false,
            doneSignUp: false,
            isAuthenticated: false,
            email: null
        });
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}