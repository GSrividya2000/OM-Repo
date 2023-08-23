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
                  <Form @submit="handleCreate" :validation-schema="schema">
                    <div v-if="!successful">
                      <div
                        class="card mb-3 card-size"
                        style="border-radius: 0.5rem"
                      >
                        <div class="card-body p-4">
                          <h5 class="mb-4">Create Bank Account</h5>
                          <div class="form-group">
                            <label for="firstname">First Name</label>
                            <Field
                              name="firstname"
                              type="text"
                              class="form-control"
                            />
                            <ErrorMessage
                              name="firstname"
                              class="error-feedback"
                            />
                          </div>
                          <div class="form-group">
                            <label for="email">Email</label>
                            <Field
                              name="email"
                              type="email"
                              class="form-control"
                            />
                            <ErrorMessage name="email" class="error-feedback" />
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
                          <div class="form-group">
                            <label for="accounttype">Select an account type</label>
                            <select
                              class="form-control"
                              name="accounttype"
                            >
                              <option>Savings account</option>
                              <option>Current account</option>
                              <option>Salary account</option>
                            </select>
                            <ErrorMessage
                              name="accounttype"
                              class="error-feedback"
                            />
                          </div>
                          <div class="form-group">
                            <label for="pan">PAN Card Number</label>
                            <Field
                              name="pan"
                              type="text"
                              class="form-control"
                            />
                            <ErrorMessage name="pan" class="error-feedback" />
                          </div>
                          <div class="form-group">
                            <label for="initialdeposit">Initial Deposit</label>
                            <Field
                              name="initialdeposit"
                              type="text"
                              class="form-control"
                            />
                            <ErrorMessage
                              name="initialdeposit"
                              class="error-feedback"
                            />
                          </div>
                          <div class="form-group button">
                            <button
                              class="btn btn-primary btn-block"
                              style="border-style: solid"
                            >
                              Create
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

export default {
  name: "CreateComp",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      firstname: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      pin: yup
        .number()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!"),
      accounttype: yup
        .string(),
      pan: yup
        .string()
        .required("PAN Card number is required!"),
      initialdeposit: yup
        .number()
        .min(5000, "Must be at least Rs.5000!"),
    });

    return {
      successful: false,
      message: "",
      schema,
    };
  },
  methods: {
    handleCreate(accuser) {
      this.message = "";
      this.successful = false;

      this.$store
        .dispatch("account/createAcc", accuser)
        .then(
          (data) => {
            this.message = data.message;
            this.successful = true;
          },
          (error) => {
            this.message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            this.successful = false;
          }
        )
        .finally(() => {
          this.$router.push("/profile");
        });
    },
  },
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
  transform: translateX(40%);
  border: #000000;
}

h5 {
  font-size: 24px; 
}
</style>
  