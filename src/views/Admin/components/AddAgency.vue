<template>
  <div class="containter">
    <form class="form" novalidate="true" @submit.prevent="handleSubmit">
      <ErrorMessage v-if="isError" :errorMessage="'Please fill out the form'" />
      <div class="space-between">
        <Input v-model="agency.agencyName" :placeholder="'Agency Name'" :name="'agencyName'" />
      </div>
      <div class="space-between">
        <Input class="input-margin" v-model="agency.address" :placeholder="'Address'" :name="'address'" />
        <Input class="input-margin" v-model="agency.city" :placeholder="'City'" :name="'city'" />
        <Select class="input-margin" v-model="agency.state" :options="states" />
        <Input class="input-margin" v-model="agency.zipCode" :placeholder="'Zip Code'" :name="'zipCode'" />
      </div>
      <div class="space-between">
        <Button :isDisabled="isError" type="'submit'" buttonText="Save" backgroundColor="#2c3e50" />
      </div>
    </form>
  </div>
</template>

<script>
import Input from '../../../components/Input';
import { States } from '../../../assets/mockData';
import Button from '../../../components/Button';
import Select from '../../../components/Select';
import ErrorMessage from '../../../components/Error';

export default {
  components: {
    Input,
    Button,
    Select,
    ErrorMessage
  },
  data: () => ({
    agency: {
      agencyName: '',
      address: '',
      city: '',
      state: '',
      zipCode: ''
    },
    states: States,
    isError: false
  }),
  methods: {
    handleSubmit() {
      const hasEmptyValues = Object.values(this.agency).some(value => (value === '' ? true : false));
      if (hasEmptyValues) {
        this.isError = true;
        return;
      }
      if (!hasEmptyValues) {
        this.isError = false;
        this.$emit('newAgency', { ...this.agency, agents: [] });
      }
    }
  },
  watch: {
    agency: {
      handler(data) {
        if (data.state.length) {
          this.agency.zipCode = '30022';
        }
      },
      deep: true
    }
  }
};
</script>

<style scoped lang="scss">
.containter {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  width: 100%;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: auto;
  width: auto;
  margin: 1rem;
}

.space-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
}

.input-margin {
  margin-left: 1rem;
}

select {
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  width: auto;
}

.option-dropdown {
  height: 100px;
  overflow-y: scroll;
  width: auto;
}

.no-outline:focus {
  outline: none;
}
</style>
