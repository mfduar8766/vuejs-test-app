<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  props: {
    role: Object
  },
  mounted() {
    console.log('ROUTE', this.role);
  }
};
</script>
