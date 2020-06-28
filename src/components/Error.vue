<template>
  <small style="color: red; margin: 1rem;">{{ errorMessage }}</small>
</template>

<script>
export default {
  props: ['errorMessage']
};
</script>
