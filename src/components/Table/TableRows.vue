<template>
  <tr
    @click="getRowData(data)"
    :class="[selectAllContainer.has(page) || selectedRowArray.includes(data[dataKey]) ? 'active' : '']"
  >
    <td>
      <div
        style="display: flex; align-items: center; width: 10%;"
        :class="[
          selectAllContainer.has(page) || selectedRowArray.includes(data[dataKey])
            ? 'all-selected cursor-pointer'
            : 'check-box cursor-pointer'
        ]"
      >
        <i
          :class="[
            selectAllContainer.has(page) || selectedRowArray.includes(data[dataKey]) ? 'fa fa-check white-check' : ''
          ]"
        ></i>
      </div>
    </td>
    <td v-for="headers in tableHeaders" :key="headers.name">{{ data[headers.prop] }}</td>
    <td v-if="showEditOption">
      <div style="display: flex; justify-content: space-around; width: 100%;">
        <i
          @click="$emit('dataToEdit', data)"
          :class="[
            isSelectAll || selectedRowArray.includes(data[dataKey])
              ? 'cursor-pointer fa fa-edit change-fa-color'
              : 'cursor-pointer edit-icon fa fa-edit'
          ]"
        ></i>
      </div>
    </td>
    <td v-if="showDeleteOption">
      <div style="display: flex; justify-content: space-around; width: 100%;">
        <i
          @click="$emit('dataToDelete', data)"
          :class="[
            isSelectAll || selectedRowArray.includes(data[dataKey])
              ? 'cursor-pointer fa fa-trash change-fa-color'
              : 'cursor-pointer trash-icon fa fa-trash'
          ]"
        ></i>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: [
    'isSelectAll',
    'selectAllContainer',
    'tableHeaders',
    'page',
    'dataKey',
    'selectedRow',
    'showEditOption',
    'showDeleteOption',
    'data'
  ],
  data: () => ({
    row: new Map(),
    selectedRowArray: []
  }),
  methods: {
    getRowData(data) {
      if (!this.selectedRowArray.includes(data[this.dataKey])) {
        this.selectedRowArray.push(data[this.dataKey]);
        this.$emit('rowData', data);
      } else if (this.selectedRowArray.includes(data[this.dataKey])) {
        this.selectedRowArray = this.selectedRowArray.filter(key => key !== data[this.dataKey]);
        this.$emit('rowData', data);
      }
      // if (!this.row.has(data[this.dataKey])) {
      //   this.row.set(data[this.dataKey], data);
      //   this.selectedRowArray.push(data[this.dataKey]);
      //   this.$emit('rowData', data);
      // } else if (this.row.has(data[this.dataKey])) {
      //   this.row[data[this.dataKey]] = null;
      //   this.row.delete(data[this.dataKey]);
      //   this.selectedRowArray = this.selectedRowArray.filter(key => key !== data[this.dataKey]);
      //   this.$emit('rowData', data);
      // }
    }
  }
  // watch: {
  //   selectedRow: {
  //     handler(data) {
  //       console.log('IN COMING ROW', data);
  //     }
  //   }
  // }
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
  width: 100%;
}

td {
  text-align: left;
  padding: 1rem;
  transition: 0.3s;
  border-bottom: 1px solid rgb(219, 215, 215);
  cursor: pointer;
  width: 100%;
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
