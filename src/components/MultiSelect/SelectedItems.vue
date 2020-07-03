<template>
  <div v-if="selected && selected.length" class="list-of-selected-itens">
    <div style="display: flex; justify-content: space-between; align-items: center;" v-if="selected.length >= 3">
      <div class="cursor-pointer" @click="toggleList()" style="width: 250px;">{{ selected.length }} items selected</div>
      <i @click="toggleList()" style="color: gray;" class="cursor-pointer fa fa-chevron-down"></i>
    </div>
    <template v-else>
      <div
        style="display:flex; justify-content: space-between; align-items: center; width: 200px;"
        v-for="(item, index) in selected"
        :key="index"
      >
        <div>{{ item }}</div>
      </div>
      <i @click="toggleList()" style="color: gray; position: relative;;" class="cursor-pointer fa fa-chevron-down"></i>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    selected: {
      type: Array,
      default: () => []
    },
    toggleList: {
      type: Function
    }
  }
};
</script>

<style scoped lang="scss">
.list-of-selected-itens {
  display: flex;
  padding: 0.5rem 0.5rem;
  margin: 0.5rem;
  font-size: 1rem;
  color: gray;
  border: 0.1rem solid;
  border-radius: 0.5rem;
  transition: all 0.3s ease-out;
  background-color: transparent;
  width: 230px;
  box-sizing: border-box;
}
</style>
