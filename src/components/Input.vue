<template>
  <input
    class="no-outline"
    :disabled="disabled"
    :type="type"
    :value="value"
    :placeholder="placeholder"
    @input="$emit('input', $event.target.value)"
    required
    :name="name"
  />
</template>

<script>
export default {
  props: {
    value: { type: String, required: false, default: '' },
    label: { type: String, required: false, default: '' },
    placeholder: { type: String, required: false, default: '' },
    disabled: { type: Boolean, required: false },
    type: { type: String, required: false, default: 'text' },
    name: { type: String, required: false, default: '' }
  }
};
</script>

<style scoped lang="scss">
input {
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  width: auto;
  text-align: left;
}

.no-outline:focus {
  outline: none;
}
</style>
