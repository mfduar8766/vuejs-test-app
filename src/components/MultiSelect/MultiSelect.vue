<template>
  <div>
    <template v-if="!value.length">
      <button @click="toggleList()">
        <div>Choose</div>
        <i style="color: gray; position: relative; right: 30px;" class="cursor-pointer fa fa-chevron-down"></i>
      </button>
    </template>

    <template v-else>
      <SelectedItemsView v-if="value && value.length" :selected="value" :toggleList="toggleList" />
    </template>

    <div v-if="isListDisplayed" class="list-container" style="display: flex; flex-direction: column">
      <div style="display: flex; align-items: center; justify-content: center; width: 100%;">
        <div
          v-if="showSelectAll"
          style="margin-left: 5px; text-align: center;"
          @click="onSelectAll(!selectAll)"
          class="check-box"
        >
          <i :class="[selectAll ? 'fa fa-check black' : '']"></i>
        </div>
        <Input
          id="searchBox"
          v-model="searchQuery"
          :name="'searchBox'"
          style="padding: 0.3rem; margin-left: 5px; margin-right: 10px;"
        />
        <i @click="clearSelectedItemsOnXclick()" class=" cursor-pointer fa fa-times" style="color:gray;"></i>
      </div>
      <ListItems
        :value="value"
        :listOfValues="listOfValues"
        :currentIndex="currentIndex"
        :addRemoveData="addRemoveData"
      />
    </div>
  </div>
</template>

<script>
import Input from '../Input';
import SelectedItemsView from './SelectedItems';
import ListItems from './ListItems';

export default {
  components: {
    Input,
    SelectedItemsView,
    ListItems
  },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    },
    showSelectAll: {
      type: Boolean,
      default: () => false
    }
  },
  created() {
    this.listOfValues = this.options;
  },
  updated() {
    if (this.isListDisplayed) {
      document.getElementById('searchBox').focus();
    }
  },
  data: () => ({
    listOfValues: [],
    isListDisplayed: false,
    selectedItems: [],
    currentIndex: [],
    selectAll: false,
    selected: [],
    searchQuery: ''
  }),
  methods: {
    checkForPrePopulatedValues(value) {
      const matchedItems = [];
      if (value && value.length) {
        value.forEach(option => {
          this.options.forEach(item => {
            if (item.label === option) {
              matchedItems.push({ label: option, value: item.value });
            }
          });
        });
        this.selectedItems = matchedItems;
      }
    },
    toggleList() {
      this.isListDisplayed = !this.isListDisplayed;
    },
    clearSelectedItemsOnXclick() {
      this.isListDisplayed = false;
      this.selectedItems = [];
      this.selected = [];
      this.$emit('input', this.selected);
    },
    onSearchFilter(value) {
      const lowerCaseValue = value.toLowerCase().trim();
      if (lowerCaseValue === '' || lowerCaseValue.length === 0) {
        this.searchQuery = '';
        this.listOfValues = this.options;
      } else if (lowerCaseValue && lowerCaseValue.length > 0) {
        this.listOfValues = this.listOfValues.filter(item =>
          item.value
            .toLowerCase()
            .trim()
            .includes(lowerCaseValue)
        );
      }
    },
    onSelectAll(event) {
      const isChecked = event;
      if (isChecked) {
        this.selectAll = true;
        this.emitSelectedValues(this.options);
      } else {
        this.selectAll = false;
        this.emitSelectedValues([]);
      }
    },
    addRemoveData(data, index) {
      if (
        this.selectedItems.filter(item => item.value === data.value).length > 0 ||
        this.selectedItems.filter(item => item.label === data.label).length > 0
      ) {
        this.removeSelectedValues(data, index);
      } else if (
        !(this.selectedItems.filter(item => item.value === data.value).length > 0) ||
        !(this.selectedItems.filter(item => item.label === data.label).length > 0)
      ) {
        this.addSelectedValues(data, index);
      }
    },

    emitSelectedValues(selectedItemsArray) {
      this.selectedItems = selectedItemsArray;
      const listOfItems = this.selectedItems.map(item => item.label);
      this.selected = listOfItems.map(item => item.label);
      this.$emit('input', this.selected);
    },
    addSelectedValues(data, index) {
      this.selectedItems.push(data);
      this.currentIndex.push(index);
      this.selected = this.selectedItems.map(item => item.label);
      this.$emit('input', this.selected);
    },
    removeSelectedValues(data, index) {
      this.selectedItems = this.selectedItems.filter(item => item.value !== data.value);
      this.currentIndex = this.currentIndex.filter(i => i !== index);
      this.selected = this.selectedItems.map(item => item.label);
      this.$emit('input', this.selected);
    }
  },
  watch: {
    selected: {
      handler(value) {
        return this.checkForPrePopulatedValues(value);
      }
    },
    searchQuery: {
      handler(value) {
        return this.onSearchFilter(value);
      }
    }
  }
};
</script>

<style scoped lang="scss">
button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  margin: 0;
  font-size: 1rem;
  color: gray;
  border: 0.1rem solid;
  border-radius: 0.5rem;
  text-transform: uppercase;
  transition: all 0.3s ease-out;
  background-color: transparent;
  width: 230px;

  &:hover {
    cursor: pointer;
  }

  &:focus,
  &:active {
    outline: none;
  }
}

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

.black {
  color: black;
}

.list-container {
  position: absolute;
  width: 230px;
  height: 250px;
  background: white;
  padding: 0;
  margin: 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  overflow-y: scroll;
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

.clear {
  border: none;
  color: black;
}
</style>
