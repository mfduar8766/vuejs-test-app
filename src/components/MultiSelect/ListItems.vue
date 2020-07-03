<template>
  <ul>
    <li
      v-for="(item, index) in listOfValues"
      :key="index"
      :value="value"
      :class="[
        currentIndex.includes(index) || value.includes(item.label) || value.includes(item.value) ? 'drop-down' : 'list'
      ]"
      @click="addRemoveData(item, index)"
      style="display: flex; align-items: center; cursor: pointer"
    >
      <div style="text-align: center;" class="check-box">
        <i
          :class="[
            currentIndex.includes(index) || value.includes(item.label) || value.includes(item.value)
              ? 'fa fa-check black'
              : ''
          ]"
        ></i>
      </div>
      <div>{{ item.label }}</div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    listOfValues: {
      type: Array,
      default: () => []
    },
    currentIndex: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    },
    addRemoveData: {
      type: Function
    }
  }
};
</script>

<style scoped lang="scss">
.check-box {
  -webkit-appearance: none;
  width: 25px;
  height: 25px;
  background: white;
  border-radius: 5px;
  border: 2px solid #555;
  margin-right: 10px;
  margin-bottom: 0.2rem;
}

.list {
  list-style: none;
  padding: 0.5rem;
  text-align: left;
}

.list:hover {
  background-color: #dddd;
  cursor: pointer;
}

.drop-down {
  background-color: #007ad9;
  color: white;
  padding: 0.5rem;
  text-align: left;
}

.drop-down:hover {
  cursor: pointer;
}

.black {
  color: black;
}
</style>
