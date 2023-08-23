import axios from 'axios';

const API_URL = ' http://localhost:3000/';

class AccountService{

    accountDetails(user){
        return axios.get(API_URL + `accountdetails?email=${user.email}`)
          .then(response => {
            return response.data;
          })
          .catch(error => {
            console.error('Error fetching account details:', error);
            throw error; 
          });
    }

    createAccount(accuser){
        return axios.post(API_URL + `accountdetails`,{
            firstname:accuser.firstname,
            email:accuser.email,
            accounttype:accuser.accounttype,
            pan:accuser.pan,
            initialdeposit:accuser.savings,
            pin:accuser.pin
        });

    }

    updateAccountDetails(accuser){
        return axios.put(API_URL + `accountdetails/${accuser.email}`,{
            firstname:accuser.firstname,
            email:accuser.email,
            accounttype:accuser.accounttype,
            pan:accuser.pan,
            savings:accuser.savings,
            pin:accuser.pin
        });
    }
}

export default new AccountService();