<template>
  <div class="container">
    <h2>{{ status }}</h2>
    <h2>{{ message }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      default: '',
      type: String
    },
    status: Number
  },
  state: {
    default: {},
    type: Object
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
</style>
