<template>
  <div>
    <Modal
      :headerText="agentToEdit && agentToEdit.agencyName ? `Edit: ${fullName}` : ''"
      :isModalOpen="toggleEditModal"
      @closeModal="toggleEditModal = $event"
    >
      <!-- <EditAgency v-if="agentToEdit" :agentToEdit="agentToEdit" @close="editData($event, false)" /> -->
    </Modal>
    <Modal
      :classProp="{ height: '100px', width: '500px' }"
      :headerText="'Are You Sure You Want To Delete This Agency?'"
      :isModalOpen="isDeleteAgent"
      @closeModal="isDeleteAgent = $event"
    >
      <div style="display: flex; justify-content: center; align-items: center">
        <Button @onClick="deleteAgent()" :backgroundColor="'red'" :buttonText="'Yes'" />
        <Button @onClick="isDeleteAgent = false" style="margin-left: 2rem;" :buttonText="'No'" />
      </div>
    </Modal>
    <Modal :headerText="'Add Agent'" :isModalOpen="toggleAddAgent" @closeModal="toggleAddAgent = $event">
      <!-- <AddAgency @newAgency="addAgent($event)" @close="toggleAddAgent = $event" /> -->
    </Modal>
    <div class="search-bar">
      <SearchBar
        :placeholder="'Search for Agent'"
        @selectedResult="setSelectedResult($event)"
        :searchArray="agents"
        @onChange="searchResult = $event"
      />
      <Button :icon="true" :iconClass="'fa fa-download'" style="margin-left: 2rem;" :buttonText="'Download CSV'" />
      <Button
        @onClick="toggleAddAgent = !toggleAddAgent"
        :icon="true"
        :iconClass="'fa fa-plus-square'"
        style="margin-left: 1rem;"
        :buttonText="'Add Agent'"
      />
    </div>
    <Table
      v-if="agents && agents.length"
      :tableHeaders="headers"
      :selectedResult="selectedResult"
      :tableDataProp="agents"
      :showDeleteOption="true"
      :showEditOption="true"
      @rowData="selectedRow($event)"
      @dataToEdit="editData($event, null)"
      @dataToDelete="toggleDeleteData($event)"
    />
    <div v-else>No Agents Available</div>
  </div>
</template>

<script>
import { mockData } from '../../../assets/mockData';
import { agentsHeader } from '../../../assets/mockData';
import Table from '../../../components/Table/Table';
import Modal from '../../../components/Modal';
// import EditAgency from '../components/EditAgency';
import SearchBar from '../../../components/SearchBar';
import Button from '../../../components/Button';
// import AddAgency from '../components/AddAgency';

export default {
  components: {
    Table,
    Modal,
    // EditAgency,
    SearchBar,
    Button
    // AddAgency
  },
  mounted() {
    this.getAgents();
  },
  data: () => ({
    agents: [],
    agentToEdit: null,
    toggleEditModal: false,
    toggleAddAgent: false,
    headers: agentsHeader,
    isDeleteAgent: false,
    agentToDelete: null,
    selectedResult: [],
    searchResult: ''
  }),
  methods: {
    getAgents() {
      const agencyId = 200;
      this.agents = mockData.filter(data => data.agencyId === agencyId)[0].agents || [];
    },
    selectedRow(data) {
      console.log('SELECTED', data);
    },
    editData(data, isClose) {
      if (isClose !== null) {
        this.toggleEditModal = !this.toggleEditModal;
        this.agentToEdit = null;
      } else {
        this.toggleEditModal = !this.toggleEditModal;
        this.agentToEdit = data;
      }
    },
    toggleDeleteData(data) {
      this.agentToDelete = data;
      this.isDeleteAgent = !this.isDeleteAgent;
    },
    deleteAgent() {
      this.isDeleteAgent = !this.isDeleteAgent;
      this.agents = this.agents.filter(agency => agency.agencyId !== this.agentToDelete.agencyId);
    },
    addAgent(data) {
      this.toggleAddAgent = !this.toggleAddAgent;
      this.agents.push(data);
    },
    setSelectedResult(data) {
      this.selectedResult = this.agents.filter(agency => agency.agencyId === data.agencyId);
    }
  },
  computed: {
    fullName() {
      return `${this.agentToEdit.fullName} ${this.agentToEdit.lastName}`;
    }
  },
  watch: {
    searchResult: {
      handler(data) {
        const filterdAgencies = this.agents.filter(agency => data.includes(agency.agencyName));
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
