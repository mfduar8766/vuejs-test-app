<template>
  <tr>
    <th>
      <div
        @click="toggleSelectAll()"
        :class="[selectAllContainer.has(page) ? 'all-selected cursor-pointer' : 'check-box cursor-pointer']"
      >
        <i :class="[isSelectAll ? 'fa fa-check white-check' : '']"></i>
      </div>
    </th>
    <th v-for="headers in tableHeaders" :key="headers.name">
      <span @click="handleSort(headers.prop)" class="cursor-pointer">
        <i
          v-if="selectedHeader === headers.prop"
          :class="[
            sortDirection === 'ASC'
              ? 'cursor-pointer fa fa-chevron-up'
              : sortDirection === 'DESC'
              ? 'cursor-pointer fa fa-chevron-down'
              : ''
          ]"
        ></i>
        <template v-else>
          <i
            v-if="headers.prop === tableHeaders[0].prop"
            :class="[
              sortDirection === 'ASC'
                ? 'cursor-pointer fa fa-chevron-up'
                : sortDirection === 'DESC'
                ? 'cursor-pointer fa fa-chevron-down'
                : ''
            ]"
          ></i>
        </template>
        {{ headers.name }}
      </span>
    </th>
    <th v-if="showEditOption"></th>
    <th v-if="showDeleteOption"></th>
  </tr>
</template>

<script>
import { ASC, DESC, handleAscSort, handleDescSort } from './utils';

export default {
  props: ['tableHeaders', 'showEditOption', 'showDeleteOption', 'page', 'tableDataProp'],
  mounted() {
    this.tableData = this.tableDataProp;
  },
  data: () => ({
    sortDirection: 'ASC',
    selectedHeader: null,
    isSelectAll: false,
    selectAllContainer: new Map(),
    tableData: []
  }),
  methods: {
    setSortDirection() {
      if (this.sortDirection === 'ASC') {
        this.sortDirection = 'DESC';
        return this.sortDirection;
      }
      if (this.sortDirection === 'DESC') {
        this.sortDirection = 'ASC';
        return this.sortDirection;
      }
    },
    handleSort(header) {
      this.setSortDirection();
      this.selectedHeader = header;
      switch (this.sortDirection) {
        case ASC:
          return this.$emit('tableData', handleAscSort(this.tableData, header));
        case DESC:
          return this.$emit('tableData', handleDescSort(this.tableData, header));
        default:
          return this.$emit('tableData', this.tableData);
      }
    },
    toggleSelectAll() {
      this.isSelectAll = !this.isSelectAll;
      this.$emit('isSelectAll', this.isSelectAll);
      if (this.isSelectAll) {
        if (!this.selectAllContainer[this.page]) {
          this.selectAllContainer.set(this.page, this.tableData);
          this.$emit('selectAllContainer', this.selectAllContainer);
        }
      } else {
        this.selectAllContainer.delete(this.page);
        this.$emit('selectAllContainer', this.selectAllContainer);
      }
    }
  }
};
</script>

<style scoped lang="scss">
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

.fa-chevron-down {
  color: rgba(0, 0, 0, 0.26);
}

.fa-chevron-up {
  color: rgba(0, 0, 0, 0.26);
}

.white-check {
  color: white;
  margin-left: 0.2rem;
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
</style>
