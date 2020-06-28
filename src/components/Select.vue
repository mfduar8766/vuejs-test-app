<template>
  <div class="select-container">
    <div style="width: 170px;" @click="toggleList()" class="dropdown">
      <div v-if="value">{{ value }}</div>
      <div style="width: 170px;" v-else>
        <div>Choose</div>
      </div>
      <div style="width: 10px;">
        <i style="color: gray;" class="cursor-pointer fa fa-chevron-down"></i>
      </div>
    </div>
    <div style="border: 1px solid rgb(118, 118, 11); width: 200px; border-width: thin;"></div>
    <ul v-if="isListDisplayed" class="list-container">
      <li :value="value" @click="setOption(option.value)" class="list" v-for="option in options" :key="option.value">
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Number],
      default: () => ''
    }
  },
  data: () => ({
    isListDisplayed: false,
    selected: ''
  }),
  methods: {
    setOption(option) {
      this.$emit('input', option);
      this.selected = option;
      this.isListDisplayed = !this.isListDisplayed;
    },
    toggleList() {
      this.isListDisplayed = !this.isListDisplayed;
    }
  }
};
</script>

<style scoped lang="scss">
.select-container {
  display: flex;
  flex-direction: column;
  width: 190px;
  box-sizing: border-box;
}

.dropdown {
  display: flex;
  justify-content: space-between;
  color: gray;
  border: none;
  outline: none;
  text-transform: capitalize;
  transition: all 0.3s ease-out;
  background-color: transparent;
  width: 190px;

  &:hover {
    cursor: pointer;
  }

  &:focus,
  &:active {
    outline: none;
  }
}

.list-container {
  position: fixed;
  height: auto;
  background: white;
  padding: 0;
  margin: 25px 0 0 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  overflow-y: scroll;
  height: 200px;
  width: 190px;
  z-index: 99;
}

.list {
  list-style: none;
  padding: 0.5rem;
  text-align: left;
  width: 190px;
}

.list-disabled {
  color: gray;
  text-align: left;
}

.list:hover {
  background-color: #dddd;
  cursor: pointer;
}
</style>
