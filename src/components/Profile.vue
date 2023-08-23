<template>
  <div class="container">
    <header class="jumbotron"></header>
    <body>
      <div class="main-container">
        <section class="vh-120" style="background-color: #1d1f22">
          <div class="container py-5 h-100">
            <div
              class="row d-flex justify-content-center align-items-center h-100 card-container"
            >
              <div class="col-md-6">
                <div class="card mb-3 card-size">
                  <div class="row g-0">
                    <div
                      class="col-md-4 gradient-custom text-center text-white gradient-card"
                    >
                      <img
                        id="profile-img"
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        class="profile-img-card"
                      />
                      <h5
                        style="color: #000; font-size: 35px"
                        class="name-display"
                      >
                        {{ currentUser.firstname }}
                      </h5>
                    </div>
                    <div class="col-md-8">
                      <div class="card-body p-4">
                        <h6>Information</h6>
                        <hr class="mt-0 mb-4" />
                        <div class="row pt-1">
                          <div class="col-6 mb-3">
                            <h6>Email</h6>
                            <p class="text-muted">{{ currentUser.email }}</p>
                          </div>
                          <div class="col-6 mb-3">
                            <h6>Phone</h6>
                            <p class="text-muted">{{ currentUser.phoneno }}</p>
                          </div>
                          <div class="col-6 mb-3">
                            <h6>Address</h6>
                            <p class="text-muted">{{ currentUser.address }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 text-center" v-if="accDetails">               
                <h3 style="color: white;">
                  Do not have a bank account?
                </h3>
                <div class="" >
                  <router-link to="/create">
                    <button
                      type="button"
                      class="btn btn-primary btn-rounded btn-lg"
                    >
                      Create Bank Account
                    </button>
                  </router-link>
                </div>
              </div>
              <div class="col-md-6 text-center" v-else>
               <h3 style="color: white; ">
                  Want to withdraw money? 
                </h3>
                <div class="" >
                  <router-link to="/withdraw">
                    <button
                      type="button"
                      class="btn btn-primary btn-rounded btn-lg"
                    >
                      Withdraw 
                    </button>
                  </router-link>
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
export default {
  name: "ProfileComp",
  computed: {
    currentUser() {
      return this.$store.state.auth.user[0];
    },
   
    accDetails(){
       if(this.$store.state.account.accuser==null || this.$store.state.account.accuser==""){
         console.log(this.$store.state.account.accuser+"  if --");
         return true;
       }
       else{
         console.log(this.$store.state.account.accuser[0]);
         return false
       }
       
     }
  },
  mounted() {
    console.log("mounted")
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    else {
      this.$store.dispatch("account/accDetails", this.currentUser).catch((error) => {
        console.error("Error fetching account details:", error);
      });      
    } 
  },
  created() {
      console.log('created');
   },
  methods:{
    

  }
};
</script>

<style scoped>
.main-container {
  padding: 20px;
}

.card-container {
  max-width: 100%;
  height: 100%;
}

.profile-img-card {
  padding: 20px;
  width: 150px;
  height: 150px;
  
}

.gradient-card {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  height: 300px;
}

.gradient-custom {
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
}

.card-size {
  width: 100%;
  height: 300px;
}

.button {
  display: flex;
  justify-content: center; /* Horizontally center the content */
  margin-top: 20px;
  position: relative;
  width: 100vh;
  padding-right: 10vh;
}

@media (max-width: 768px) {
  .card-container {
    flex-direction: column; 
  }
  .card-size {
    max-width: 100%; 
  }

 
}
</style>