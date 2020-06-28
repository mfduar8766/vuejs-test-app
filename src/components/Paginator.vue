<template>
  <footer>
    <Select v-model="selectedRows" :options="setRowsPerPage" />
    <div>
      <div class="pages-container">
        <Button
          :disabled="currentPage <= pagesArray[0]"
          style="font-size: 1.5rem; color: black;"
          :icon="true"
          :iconClass="'fa fa-angle-double-left'"
          @click="resetPaginator()"
        />
        <Button
          :disabled="currentPage <= pagesArray[0]"
          @click="previousPage()"
          style="font-size: 1.5rem; margin-right: 1rem; color: black;"
          :icon="true"
          :iconClass="'fa fa-angle-left'"
        />
        <div v-for="page in pagesArray" :key="page">
          <div @click="changePage(page)" :class="currentPage === page ? 'is-current-page' : 'pages'">{{ page }}</div>
        </div>
        <Button
          :disabled="currentPage === pagesArray.length - 1"
          @click="nextPage()"
          style="font-size: 1.5rem; color: black;"
          :icon="true"
          :iconClass="'fa fa-angle-right'"
        />
        <Button
          :disabled="currentPage === pagesArray.length - 1"
          @click="goToLastPage()"
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
    // this.rowsPerPage = PaginatorService.state$.rowsPerPage;
    this.calculateTotalPages();
    this.setRowsPerPageCollection();
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
      this.calculateTotalPages();
      this.setRowsPerPageCollection();
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
      // PaginatorService.changeState({ rowsPerPage: this.rowsPerPage, tableData: this.tableData, page: this.page });
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
