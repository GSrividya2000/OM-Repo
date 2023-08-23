import AccountService from '../services/account.service';

const user = JSON.parse(localStorage.getItem('user'));

let accuser = null;
const initialState = {accuser,user};

export const account = {
    namespaced: true,
    state: initialState,
    actions: {

        createAcc({ commit }, accuser) {
            return AccountService.createAccount(accuser).then(
              response => {
                commit('createAccSuccess');
                return Promise.resolve(response.data);
              },
              error => {
                commit('createAccFailure');
                return Promise.reject(error);
              }
            );
        },

        accDetails({commit},user){
            return AccountService.accountDetails(user).then(
                response =>{
                    commit('foundAcc',response);
                    return Promise.resolve(response.data);
                },
                error =>{
                    commit('accNotFound',error);
                    return Promise.reject(error);
                }
            )
        },
      
    },
    mutations: {
        createAccSuccess(state, accuserData) {
            state.accuser = accuserData;
          },
          createAccFailure(state, error) {
            console.error('Failed to create account:', error);
          },
          foundAcc(state,accountDetails){
            state.accuser=accountDetails;
          },
          accNotFound(error){
            console.error('No Account user found',error);
          }

        

    }
}