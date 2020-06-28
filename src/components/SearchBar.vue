<template>
  <div :style="stylesClass" class="search-container">
    <Input
      :disabled="isDisabled"
      :class="[isDisabled ? 'disabled-class search' : 'search']"
      :style="stylesClass"
      v-model="searchQuery"
      :placeholder="placeholder"
      :name="'searchQuery'"
    />
    <ul :style="stylesClass" v-if="searchQuery.length > 0" class="cursor-pointer list-container">
      <li
        @click="sendSearchResult(result)"
        class="no-bullets list"
        style="text-transform: capitalize;"
        v-for="result in searchResults"
        :key="result.value"
      >
        {{ result.value }}
      </li>
    </ul>
  </div>
</template>

<script>
import Input from './Input';

export default {
  components: {
    Input
  },
  props: {
    stylesClass: {
      type: Object
    },
    placeholder: String,
    isDisabled: Boolean,
    searchArray: {
      default: []
    }
  },
  data() {
    return {
      searchQuery: '',
      searchResults: null
    };
  },
  methods: {
    handleSearch(searchQuery) {
      const lowerCaseQueryString = searchQuery.toLowerCase().trim();
      if (lowerCaseQueryString.length === 0) {
        this.searchQuery = '';
      } else if (lowerCaseQueryString.length > 0) {
        this.searchQuery = lowerCaseQueryString;
        this.checkSearchResults();
      }
    },
    checkSearchResults() {
      const searchResults = this.getSearchResults();
      this.searchResults = searchResults;
      this.$emit(
        'onChange',
        this.getSearchResults().map(data => data.value)
      );
    },
    getSearchResults() {
      const arrayKeys = this.searchArray.map(element => Object.keys(element))[0];
      const searchResult = [];
      let errorMessage = null;
      this.searchArray.forEach(element => {
        arrayKeys.forEach(key => {
          const lowerCaseElement = element[key]
            .toString()
            .toLowerCase()
            .trim();
          if (!lowerCaseElement.includes(this.searchQuery)) {
            errorMessage = [{ value: 'No Records found,' }];
          } else if (lowerCaseElement.includes(this.searchQuery)) {
            searchResult.push({ ...element, value: element[key] });
          }
        });
      });
      return searchResult && searchResult.length ? searchResult : errorMessage;
    },
    sendSearchResult(result) {
      this.searchQuery = result.value || '';
      this.$emit('selectedResult', result);
      this.searchQuery = '';
    }
  },
  watch: {
    searchQuery: {
      handler(data) {
        this.handleSearch(data);
      }
    }
  }
};
</script>

<style scoped>
.search {
  padding: 0.2rem;
  width: 500px;
}

.search-container {
  width: 500px;
  height: 100%;
  box-sizing: border-box;
  padding: 1rem;
}

.input-styles {
  width: 500px;
}

.list-container {
  position: absolute;
  background: white;
  padding: 0;
  margin: 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  overflow-y: scroll;
  height: 200px;
  width: 500px;
  z-index: 99;
}

.list {
  list-style: none;
  padding: 0.5rem;
  text-align: left;
}

.list-disabled {
  color: gray;
  padding: 0.5rem;
  text-align: left;
}

.list:hover {
  background-color: #dddd;
  cursor: pointer;
}

.disabled-class {
  background-color: lightgray;
}
</style>
