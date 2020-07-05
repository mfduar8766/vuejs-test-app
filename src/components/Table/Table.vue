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
      <Paginator
        v-if="originalTableState && originalTableState.length"
        :rowsPerPageOptions="rowsPerPageOptions"
        :originalTableState="originalTableState"
        @paginator="handlePagination($event)"
      />
    </table>
  </div>
</template>

<script>
import TableHeader from './TableHeader';
import TableRows from './TableRows';
import Paginator from '../Paginator';

export default {
  components: {
    TableHeader,
    TableRows,
    Paginator
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
  methods: {
    handlePagination(data) {
      this.tableData = data.tableData;
      this.rowsPerPage = data.rowsPerPage;
      this.page = data.page || 0;
    }
  },
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
.table-container {
  height: 100%;
  width: 100%;
  display: table;
  table-layout: fixed;
  border-collapse: collapse;
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
</style>
