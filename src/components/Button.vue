<template>
  <button
    :class="[isDisabled ? 'disabled' : '']"
    :style="{ 'background-color': backgroundColor }"
    :type="buttonType"
    @click="$emit('onClick')"
    :disabled="isDisabled"
  >
    <div style="display: flex; justify-conternt: space-between; align-items: center;">
      <div v-if="buttonText">{{ buttonText }}</div>
      <i style="margin-left: 1rem;" v-if="icon" :class="iconClass"></i>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    buttonText: String,
    buttonType: {
      default: 'button',
      type: String
    },
    isDisabled: {
      default: false,
      type: Boolean
    },
    icon: {
      type: Boolean,
      default: false
    },
    iconClass: {
      type: String
    },
    backgroundColor: String
  },
  name: 'Button'
};
</script>

<style lang="scss">
button {
  padding: 0.5rem 2rem;
  margin: 0.5rem;
  font-size: 1rem;
  color: white;
  border: 0.1rem solid;
  border-radius: 0.5rem;
  text-transform: capitalize;
  transition: all 0.3s ease-out;
  cursor: pointer;
  background-color: green;

  &:focus,
  &:active {
    outline: none;
  }
}
.primary {
  border-color: var(--primary);
  color: var(--primary);

  &:hover,
  &:active {
    background-color: var(--primary);
    color: white;
  }
}

.gray {
  background-color: gray;
}

.disabled {
  color: lightgray;
  pointer-events: none;
}
</style>
