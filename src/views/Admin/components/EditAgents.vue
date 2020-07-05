<template>
  <div style="display: flexl=; flex-direction: column; width: 100%; height: 100%">
    <div class="input-container">
      <label for="correspondingAgency">Agency</label>
      <Input v-model="data.correspondingAgency" :disabled="true" />
    </div>
    <form v-if="data" novalidate="true" @submit.prevent="handleSubmit">
      <div class="form-edit-values">
        <div class="input-container">
          <label for="correspondingAgency">First Name</label>
          <Input v-model="data.firstName" :disabled="true" />
        </div>
        <div class="input-container">
          <label for="correspondingAgency">Last Name</label>
          <Input v-model="data.lastName" :disabled="true" />
        </div>
        <div class="input-container">
          <label for="correspondingAgency">Start Date</label>
          <Input v-model="startDate" :type="'date'" />
        </div>
        <div class="input-container">
          <label for="correspondingAgency">End Date</label>
          <Input v-model="endDate" :type="'date'" />
        </div>
      </div>

      <div class="reps-container">
        <div>
          <label style="font-weight: bold;" for="member">Reps</label>
          <Button @onClick="addRep()" type="'button'" buttonText="Add Rep" backgroundColor="#2c3e50" />
        </div>
        <div style="display: flex;" v-for="(rep, index) in reps" :key="index">
          <div class="input-container">
            <label>First Name</label>
            <Input v-if="!rep.id" v-model="rep.firstName" />
            <Input v-else v-model="rep.firstName" :disabled="true" />
          </div>
          <div class="input-container">
            <label>Last Name</label>
            <Input v-if="!rep.id" v-model="rep.lastName" />
            <Input v-else v-model="rep.lastName" :disabled="true" />
          </div>
          <div class="input-container">
            <label for="correspondingAgency">Start Date</label>
            <Input v-model="rep.startDate" :type="'date'" />
          </div>
          <div class="input-container">
            <label for="correspondingAgency">End Date</label>
            <Input v-model="rep.endDate" :type="'date'" />
          </div>
          <Button @onClick="removeRep(index)" type="'button'" buttonText="Delete" backgroundColor="#2c3e50" />
        </div>
      </div>

      <div class="button-container">
        <Button type="'submit'" buttonText="Save" backgroundColor="#2c3e50" />
        <Button
          style="margin-left: 1rem;"
          @onClick="$emit('close', false)"
          type="'button'"
          buttonText="Close"
          backgroundColor="#2c3e50"
        />
      </div>
    </form>
  </div>
</template>

<script>
import moment from 'moment';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

export default {
  components: {
    Button,
    Input
  },
  props: {
    agent: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.setFormData();
  },
  data: () => ({
    data: null,
    reps: null,
    isError: false
  }),
  methods: {
    setFormData() {
      const { reps, ...rest } = this.agent;
      this.data = rest;
      this.reps = reps.map(rep => ({
        ...rep,
        startDate: moment(rep.startDate).format('YYYY-MM-DD'),
        endDate: moment(rep.endDate).format('YYYY-MM-DD')
      }));
    },
    handleSubmit() {
      this.$emit('editedAgent', { ...this.data, ...this.reps });
    },
    addRep() {
      if (this.reps.length >= 4) {
        return;
      } else {
        return this.reps.push({
          id: null,
          correspondingAgency: this.data.correspondingAgency,
          firstName: '',
          lastName: '',
          startDate: '',
          endDate: ''
        });
      }
    },
    removeRep(index) {
      this.reps = this.reps.slice(0, index).concat(this.reps.slice(index + 1));
    }
  },
  computed: {
    startDate() {
      return moment(this.data.startDate).format('YYYY-MM-DD');
    },
    endDate() {
      return moment(this.data.endDate).format('YYYY-MM-DD');
    }
  }
};
</script>

<style scoped lang="scss">
.form-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  border: 1px solid red;
}

.form-edit-values {
  display: flex;
  justify-content: space-evenly;
  width: auto;
  height: auto;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
  width: fit-content;
}

.reps-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;
}

.button-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 1rem;
}
</style>
