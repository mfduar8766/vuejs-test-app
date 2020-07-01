<template>
  <div>
    <Modal
      :headerText="agencyToEdit && agencyToEdit.agencyName ? `Edit: ${agencyToEdit.agencyName}` : ''"
      :isModalOpen="toggleEditModal"
      @closeModal="toggleEditModal = $event"
    >
      <EditAgency v-if="agencyToEdit" :agencyToEdit="agencyToEdit" @close="editData($event, false)" />
    </Modal>
    <Modal
      :classProp="{ height: '100px', width: '500px' }"
      :headerText="'Are You Sure You Want To Delete This Agency?'"
      :isModalOpen="isDeleteAgency"
      @closeModal="isDeleteAgency = $event"
    >
      <div style="display: flex; justify-content: center; align-items: center">
        <Button @onClick="deleteAgency()" :backgroundColor="'red'" :buttonText="'Yes'" />
        <Button @onClick="isDeleteAgency = false" style="margin-left: 2rem;" :buttonText="'No'" />
      </div>
    </Modal>
    <Modal :headerText="'Add Agency'" :isModalOpen="toggleAddAgency" @closeModal="toggleAddAgency = $event">
      <AddAgency @newAgency="addAgency($event)" @close="toggleAddAgency = $event" />
    </Modal>
    <div class="search-bar">
      <SearchBar
        :placeholder="'Search for Agency'"
        @selectedResult="setSelectedResult($event)"
        :searchArray="agencies"
        @onChange="searchResult = $event"
      />
      <Button :icon="true" :iconClass="'fa fa-download'" style="margin-left: 2rem;" :buttonText="'Download CSV'" />
      <Button
        @onClick="toggleAddAgency = !toggleAddAgency"
        :icon="true"
        :iconClass="'fa fa-plus-square'"
        style="margin-left: 1rem;"
        :buttonText="'Add Agency'"
      />
    </div>
    <Table
      v-if="agencies && agencies.length"
      :tableHeaders="headers"
      :selectedResult="selectedResult"
      :tableDataProp="agencies"
      :showDeleteOption="true"
      :showEditOption="true"
      @rowData="selectedRow($event)"
      @dataToEdit="editData($event, null)"
      @dataToDelete="toggleDeleteData($event)"
    />
    <div v-else>No Agencies Available</div>
  </div>
</template>

<script>
import { mockData } from '../../../assets/mockData';
import { tableHeaders } from '../../../assets/mockData';
import Table from '../../../components/Table/Table';
import Modal from '../../../components/Modal';
import EditAgency from '../components/EditAgency';
import SearchBar from '../../../components/SearchBar';
import Button from '../../../components/Button';
import AddAgency from '../components/AddAgency';

export default {
  components: {
    Table,
    Modal,
    EditAgency,
    SearchBar,
    Button,
    AddAgency
  },
  mounted() {
    this.getAgencies();
  },
  data: () => ({
    agencies: [],
    agencyToEdit: null,
    toggleEditModal: false,
    toggleAddAgency: false,
    headers: tableHeaders,
    isDeleteAgency: false,
    agencyToDelete: null,
    selectedResult: [],
    searchResult: ''
  }),
  methods: {
    getAgencies() {
      const agencies = [200, 300, 400, 500, 600, 700];
      this.agencies = mockData.filter(data => {
        if (agencies.includes(data.agencyId)) {
          return data;
        }
      });
    },
    selectedRow(data) {
      console.log('SELECTED', data);
    },
    editData(data, isClose) {
      if (isClose !== null) {
        this.toggleEditModal = !this.toggleEditModal;
        this.agencyToEdit = null;
      } else {
        this.toggleEditModal = !this.toggleEditModal;
        this.agencyToEdit = data;
      }
    },
    toggleDeleteData(data) {
      this.agencyToDelete = data;
      this.isDeleteAgency = !this.isDeleteAgency;
    },
    deleteAgency() {
      this.isDeleteAgency = !this.isDeleteAgency;
      this.agencies = this.agencies.filter(agency => agency.agencyId !== this.agencyToDelete.agencyId);
    },
    addAgency(data) {
      this.toggleAddAgency = !this.toggleAddAgency;
      this.agencies.push(data);
    },
    setSelectedResult(data) {
      this.selectedResult = this.agencies.filter(agency => agency.agencyId === data.agencyId);
    }
  },
  watch: {
    searchResult: {
      handler(data) {
        const filterdAgencies = this.agencies.filter(agency => data.includes(agency.agencyName));
        this.selectedResult = filterdAgencies;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.search-bar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
}
</style>
