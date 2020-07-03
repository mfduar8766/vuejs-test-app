<template>
  <div class="container">
    <form class="form" novalidate="true" @submit.prevent="handleSubmit">
      <div classs="agency-name-container">
        <Input :disabled="true" v-model="agency.agencyName" :name="'agencyName'" />
        <Button :type="'button'" @onClick="addAgents(false)" buttonText="Add Agents" backgroundColor="#2c3e50" />
      </div>
      <div class="agency-info">
        <div class="margin-top-bottom">
          <Input :disabled="true" v-model="agency.address" :name="'address'" />
          <Input class="input-margin" :disabled="true" v-model="agency.city" :name="'city'" />
        </div>
        <div class="margin-top-bottom">
          <Input :disabled="true" v-model="agency.state" :name="'state'" />
          <Input class="input-margin" :disabled="true" v-model="agency.zipCode" :name="'zipCode'" />
        </div>
      </div>
      <div v-for="(agent, index) in agency.agents" :key="index" class="agents">
        <Input v-model="agent.firstName" />
        <Input class="input-margin" type="text" v-model="agent.lastName" />
        <Input class="input-margin" type="date" v-model="agent.startDate" />
        <Input class="input-margin" type="date" v-model="agent.endDate" />
        <Button @onClick="removeAgent(index)" :type="'button'" buttonText="Remove" backgroundColor="#2c3e50" />
      </div>
      <Button type="'submit'" buttonText="Save" backgroundColor="#2c3e50" />
      <Button
        style="margin-left: 1rem;"
        @onClick="$emit('close', false)"
        type="'button'"
        buttonText="Close"
        backgroundColor="#2c3e50"
      />
    </form>
  </div>
</template>

<script>
import Button from '../../../components/Button';
import { States } from '../../../assets/mockData';
import Input from '../../../components/Input';

export default {
  components: {
    Button,
    Input
  },
  props: {
    agencyToEdit: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    this.prepopulateForm();
  },
  data: () => ({
    states: States,
    agency: {
      agencyName: '',
      address: '',
      city: '',
      state: '',
      agents: [],
      zipCode: ''
    }
  }),
  methods: {
    handleSubmit() {
      const editedAgency = { correspondingAgency: this.agency.agencyName, ...this.agency };
      console.log('EDITED', editedAgency);
    },
    prepopulateForm() {
      if (this.agencyToEdit) {
        const { agencyName, address, city, state, zipCode } = this.agencyToEdit;
        this.agency = {
          agencyName,
          address,
          city,
          state,
          zipCode,
          agents: [this.addAgents(true)]
        };
      }
    },
    addAgents(addOneAgent) {
      if (addOneAgent) {
        return {
          firstName: '',
          lastName: '',
          startDate: '',
          endDate: ''
        };
      }
      this.agency.agents.push({
        firstName: '',
        lastName: '',
        startDate: '',
        endDate: ''
      });
    },
    removeAgent(index) {
      this.agency = {
        ...this.agency,
        agents: this.agency.agents.slice(0, index).concat(this.agency.agents.slice(index + 1))
      };
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  margin-top: 1rem;

  .input-margin {
    margin-left: 1rem;
  }

  .form {
    height: 20%;
    width: fit-content;
  }

  .agency-name-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  .agency-info {
    display: flex;
    justify-content: space-between;
    height: fit-content;
    width: 100%;
  }

  .margin-top-bottom {
    margin: 1rem 0px 1rem 0px;
  }

  .agents {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50%;
    width: 100%;
    margin: 1rem;
  }
}
</style>
