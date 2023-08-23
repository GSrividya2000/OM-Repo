<template>
    <div class="container">
    <header class="jumbotron"></header>
    <body>
      <div class="main-container">
        <section class="vh-200" style="background-color: #1d1f22">
          <div class="container py-5 h-100">
            <div
              class="row d-flex justify-content-center align-items-center h-100"
            >
              <div class="col-sm-10 col-md-8 col-lg-6 mb-4 mb-lg-0">
                <div class="black-container">
                  <Form @submit="handlewithdraw" :validation-schema="schema">
                    <div v-if="!successful">
                      <div
                        class="card mb-3 card-size"
                        style="border-radius: 0.5rem"
                      >
                        <div class="card-body p-4">
                          <h5 class="mb-4">Withdraw Money</h5>
                          <div class="form-group">
                            <label for="savings">Enter Amount</label>
                            <Field
                              name="savings"
                              type="text"
                              class="form-control"
                            />
                            <ErrorMessage
                              name="savings"
                              class="error-feedback"
                            />
                          </div>
                          <div class="form-group">
                            <label for="pin">Pin</label>
                            <Field
                              name="pin"
                              type="password"
                              class="form-control"
                            />
                            <ErrorMessage name="pin" class="error-feedback" />
                          </div>
                          <div class="form-group button">
                            <button
                              class="btn btn-primary btn-block"
                              style="border-style: solid"
                            >
                              Withdraw
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>

                  <div
                    v-if="message"
                    class="alert"
                    :class="successful ? 'alert-success' : 'alert-danger'"
                  >
                    {{ message }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </body>
  </div>

</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import AccountService from '../services/account.service';

export default {
  name: "CreateComp",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  computed: {
    accountDetails(){
      return this.$store.state.account.accuser;
    }
  },
  data() {
    const schema = yup.object().shape({
      pin: yup
        .number()
        .required("Enter the Pin!"),

      savings: yup
        .number(),
    });

    return {
      successful: false,
      message: "",
      schema,
    };
  },
  mounted(){
    AccountService;
    

  },
  methods: {
    handlewithdraw(accuser) {
    // const accountDetails = this.$store.dispatch("account/accDetails", this.$store.state.auth.user[0]);    
    this.message = "";
    this.successful = false;
    console.log(parseInt(accuser.pin));
    console.log(this.accountDetails);

   
      
      const pinMatch = parseInt(accuser.pin) == this.accountDetails.pin;
      const amountValid = parseInt(accuser.savings) <= this.accountDetails.savings;

      if (pinMatch && amountValid) {
        this.accountDetails.savings -= accuser.savings;
         this.$store.dispatch("account/updateAccountDetails", this.accountDetails);
        this.message = "Money withdrawn successfully";
        this.successful = true;
        this.$router.push("/profile");
      } else if (!pinMatch) {
        this.message = "Incorrect Pin";
      } else {
        this.message = "Amount exceeding savings!";
      }
    } 

  }

};
</script>

<style scoped>
.main-container {
  padding: 20px;
}

.black-container {
  background-color: #1d1f22;
  padding: 10px;
  border-radius: 1rem;
}

.card {
  background: #18db8a;

  background: -webkit-linear-gradient(
    to right bottom,
    rgb(34, 202, 138),
    rgb(4, 61, 23)
  );

  background: linear-gradient(
    to right bottom,
    rgb(95, 228, 177),
    rgba(91, 194, 77, 0.952)
  );
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.card-size {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  font-size: larger;
}
.error-feedback {
  color: red;
}

.button {
  padding: 10px;
  transform: translateX(35%);
  border: #000000;
}

h5 {
  font-size: 24px; 
}
</style>