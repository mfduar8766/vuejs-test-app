<template>
  <div style="box-shadow: 4px 4px 8px 4px rgba(0, 0, 0, 0.2); transition: 0.3s;">
    <table class="table-container">
      <TableHeader
        :page="page"
        :tableHeaders="tableHeaders"
        :showEditOption="showEditOption"
        :showDeleteOption="showDeleteOption"
        :tableDataProp="tableData"
        @tableData="tableData = $event"
        @selectAllContainer="selectAllContainer = $event"
        @isSelectAll="isSelectAll = $event"
      />
      <TableRows
        v-for="data in tableData"
        :key="data[dataKey]"
        :data="data"
        :isSelectAll="isSelectAll"
        :selectAllContainer="selectAllContainer"
        :tableHeaders="tableHeaders"
        :page="page"
        :dataKey="dataKey"
        :selectedRow="selectedRow"
        :showEditOption="showEditOption"
        :showDeleteOption="showDeleteOption"
        @rowData="$emit('rowData', $event)"
        @dataToEdit="$emit('dataToEdit', $event)"
        @dataToDelete="$emit('dataToDelete', data)"
      />
      <!-- <Paginator
        v-if="originalTableState && originalTableState.length"
        :rowsPerPageOptions="rowsPerPageOptions"
        :originalTableState="originalTableState"
      /> -->
    </table>
  </div>
</template>

<script>
import TableHeader from './TableHeader';
import TableRows from './TableRows';
// import Paginator from '../Paginator';
// import { PaginatorService } from '../../utils';

export default {
  components: {
    TableHeader,
    TableRows
  },
  props: {
    dataKey: {
      default: 'agencyId',
      type: String
    },
    tableDataProp: {
      type: Array,
      default: () => []
    },
    tableHeaders: {
      default: () => []
    },
    showEditOption: Boolean,
    showDeleteOption: Boolean,
    rowsPerPage: {
      default: 5,
      type: Number
    },
    rowsPerPageOptions: {
      default: () => [5, 10, 15, 20, 25]
    },
    selectedResult: {
      type: Array
    }
  },
  mounted() {
    this.originalTableState = this.tableDataProp;
    // this.handlePaginatorService(this.originalTableState);
    this.tableData = this.tableDataProp.slice(0, this.rowsPerPage);
  },
  data: () => ({
    isSelectAll: false,
    selectAllContainer: new Map(),
    selectedRow: new Map(),
    page: 0,
    originalTableState: [],
    tableData: []
  }),
  // methods: {
  //   handlePaginatorService(originalTableState) {
  //     PaginatorService.changeState({ rowsPerPage: this.rowsPerPage, tableData: originalTableState });
  //     this.tableData = PaginatorService.state$.tableData;
  //     this.rowsPerPage = PaginatorService.state$.rowsPerPage;
  //     this.page = PaginatorService.state$.page || 0;
  //     PaginatorService.changeState({
  //       rowsPerPage: this.rowsPerPage,
  //       tableData: originalTableState
  //     });
  //   },
  //   getRowData(data) {
  //     if (!this.selectedRow.has(data[this.dataKey])) {
  //       this.selectedRow.set(data[this.dataKey], data);
  //       this.$emit('rowData', this.selectedRow.get(data[this.dataKey]));
  //     } else if (this.selectedRow.has(data[this.dataKey])) {
  //       this.selectedRow.delete(data[this.dataKey]);
  //     }
  //   }
  // },
  watch: {
    selectedResult: {
      handler(data) {
        this.tableData = data;
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

.table-container {
  height: 100%;
  width: 100%;
  display: table;
  table-layout: fixed;
  border-collapse: collapse;
}

.active {
  background-color: #007ad9;
  color: white;
}

.change-fa-color {
  color: white;
}

th {
  text-align: left;
  transition: 0.3s;
  padding: 1rem;
  border-bottom: 1px solid rgb(219, 215, 215);
}

td {
  text-align: left;
  padding: 1rem;
  transition: 0.3s;
  border-bottom: 1px solid rgb(219, 215, 215);
  cursor: pointer;
}

.white-check {
  color: white;
}

.check-box {
  display: flex;
  justify-content: center;
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 5px;
  border: 2px solid #555;
  margin-right: 10px;
  margin-bottom: 0.2rem;
}

.all-selected {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border: 2px solid #555;
  margin-right: 10px;
  margin-bottom: 0.2rem;
  background-color: #007ad9;
  color: white;
}

.edit-icon {
  color: blue;
}

.trash-icon {
  color: red;
}

footer {
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
}
</style>
