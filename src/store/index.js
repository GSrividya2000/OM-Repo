import {createStore} from 'vuex';
import { auth } from "./auth.module";
import {account} from "./account.module";


const store = createStore({
  modules: {
    auth,
    account
  },
});

export default store;
