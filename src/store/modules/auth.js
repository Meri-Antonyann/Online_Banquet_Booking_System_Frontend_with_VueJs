import axios from "axios";

export default {
  state: {
    logged_user: {},
    token: '',
    role:''
   },
  mutations: {
    setUserData(state, data) {
      return state.logged_user = data;
    },
    setToken(state, data){
      state.token = data;
  localStorage.setItem('access_token', data);
    },
    setRole(state, data){
      state.role = data;
      localStorage.setItem('role', data);
    },

  },
  getters: {
    getUser(state) {
      return state.logged_user
    },
    getToken(state){
      return state.token
    }
  },
  actions: {
    LOGIN_USER(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/login', data)
          .then(result => {
            context.commit('setToken', result.data.token)
             resolve(true)
          }).catch(error => {
            reject(error)
        })
      })
    },
    REGISTRATION(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/register', data)
          .then(res => {
            context.commit('setToken', res.data.token)
            context.commit('setRole', res.data.role)
            console.log(res)
          })
      })
    },
    VERIFY(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/verify', data)
          .then(res => {
            if (res.status === 200) {
              resolve(true);
            }
          }).catch(error => {
          reject(error)
        })
      })
    },
    GET_USER_DATA(context){
      return new Promise((resolve, reject) => {
        axios.get('/me')
          .then((res) => {
            if (res.status === 200){
              context.commit('setUserData', res.data.user)
              context.commit('setRole', res.data.user.role)
              return resolve(true);
            }
          })
          .catch((error) => {
            return reject(error)
          })
      })
    }
  },
}
