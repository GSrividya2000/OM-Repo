<template>
    <div class="container">
      <header class="jumbotron">
        <h3>{{ content }}</h3>
      </header>
    </div>
  </template>
  
  <script>
  
  export default {
    name: "HomeComp",
    data() {
      return {
        content: "",
      };
    },
}
</script>