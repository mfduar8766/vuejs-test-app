<template>
  <footer>
    <Select v-model="selectedRows" :options="setRowsPerPage" />
    <div>
      <div class="pages-container">
        <Button
          :isDisabled="currentPage <= pagesArray[0]"
          style="font-size: 1.5rem; color: black;"
          :icon="true"
          :iconClass="'fa fa-angle-double-left'"
          @onClick="resetPaginator()"
        />
        <Button
          :isDisabled="currentPage <= pagesArray[0]"
          @onClick="previousPage()"
          style="font-size: 1.5rem; margin-right: 1rem; color: black;"
          :icon="true"
          :iconClass="'fa fa-angle-left'"
        />
        <div v-for="page in pagesArray" :key="page">
          <div @click="changePage(page)" :class="currentPage === page ? 'is-current-page' : 'pages'">{{ page }}</div>
        </div>
        <Button
          :isDisabled="currentPage === pagesArray.length - 1"
          @onClick="nextPage()"
          style="font-size: 1.5rem; color: black;"
          :icon="true"
          :iconClass="'fa fa-angle-right'"
        />
        <Button
          :isDisabled="currentPage === pagesArray.length - 1"
          @onClick="goToLastPage()"
          style="font-size: 1.5rem; color: black;"
          :icon="true"
          :iconClass="'fa fa-angle-double-right'"
        />
      </div>
    </div>
  </footer>
</template>

<script>
import { chunckArray } from '../utils';
import Button from './Button';
import Select from './Select';

export default {
  components: {
    Button,
    Select
  },
  props: {
    rowsPerPageOptions: {
      type: Array,
      default: () => []
    },
    originalTableState: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    this.tableData = this.originalTableState;
    this.callPaginatorMethods();
  },
  data: () => ({
    rowsPerPage: 5,
    tableData: [],
    pagesArray: [],
    currentPage: 0,
    rowsPerPageCollection: {},
    selectedRows: ''
  }),
  methods: {
    callPaginatorMethods() {
      this.calculateTotalPages();
      this.setRowsPerPageCollection();
    },
    calculateTotalPages() {
      if (this.tableData.length % 2 === 0) {
        this.pagesArray =
          Array(Math.ceil(this.tableData.length / this.rowsPerPage))
            .fill(null)
            .map((_, i) => i) || [];
      }
      if (this.tableData.length % 2 !== 0) {
        this.pagesArray =
          Array(Math.floor(this.tableData.length / this.rowsPerPage))
            .fill(null)
            .map((_, i) => i) || [];
      }
    },
    setRowsPerPageCollection() {
      const chunckedArray = chunckArray(this.tableData, this.rowsPerPage);
      this.pagesArray.forEach(page => {
        if (chunckedArray[page]) {
          if (!this.rowsPerPageCollection[page]) {
            this.rowsPerPageCollection[page] = chunckedArray[page];
          }
        }
      });
    },
    getSelectedOption(rowsPerPage) {
      this.rowsPerPage = rowsPerPage;
      this.rowsPerPageCollection = {};
      this.callPaginatorMethods();
      this.changePage(this.currentPage);
    },
    nextPage() {
      if (!(this.currentPage === this.pagesArray.length - 1)) {
        this.currentPage++;
        this.changePage(this.currentPage);
      }
    },
    previousPage() {
      if (!(this.currentPage <= this.pagesArray[0])) {
        this.currentPage--;
        this.changePage(this.currentPage);
      }
    },
    resetPaginator() {
      this.currentPage = 0;
      this.changePage(this.currentPage);
    },
    goToLastPage() {
      this.currentPage = this.pagesArray.length - 1;
      this.changePage(this.currentPage);
    },
    changePage(page) {
      this.currentPage = page;
      this.callPaginatorMethods();
      this.$emit('paginator', {
        rowsPerPage: this.rowsPerPage,
        tableData: this.rowsPerPageCollection[page],
        page: this.currentPage
      });
    }
  },
  computed: {
    setRowsPerPage() {
      return this.rowsPerPageOptions.map(data => ({ value: data, label: data }));
    }
  },
  watch: {
    selectedRows: {
      handler(data) {
        this.getSelectedOption(data);
      }
    }
  }
};
</script>

<style scoped lang="scss">
button {
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  margin-left: 1rem;
}

.pages-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem;
}

.pages {
  padding: 0.5rem;
  background-color: white;
  color: #848484;
  cursor: pointer;
}

.pages:hover {
  background-color: #848484;
  color: white;
}

.is-current-page {
  padding: 0.5rem;
  background-color: #007ad9;
  color: white;
  cursor: pointer;
}
</style>
