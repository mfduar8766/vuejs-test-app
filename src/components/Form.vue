<template>
  <div class="form-container">
    <form v-if="form && form.length" novalidate="true" @submit.prevent="handleSubmit">
      <div style="margin: 1rem;" v-for="item in form" :key="item.id">
        <component
          v-bind:is="item.component"
          v-model="item.value"
          :type="item.type"
          :placeholder="item.placeholder"
          :options="item.options"
        />
      </div>
      <div>
        <Button buttonText="Submit" type="'button'" />
      </div>
    </form>
    <div class="message" v-else>No data for form available</div>
  </div>
</template>

<script>
import Input from './Input';
import Select from './Select';
import MultiSelect from './MultiSelect/MultiSelect';
import Button from './Button';

export default {
  components: {
    Input,
    Select,
    MultiSelect,
    Button
  },
  props: {
    model: {
      type: Array,
      default: () => []
    }
  },
  created() {
    this.form = this.model || [];
  },
  data: () => ({
    form: []
  }),
  methods: {
    handleSubmit() {
      const formValues = this.form.map(data => ({ label: data.title, value: data.value }));
      this.$emit('value', formValues);
    }
  }
};
</script>

<style scope="scss">
.form-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: fit-content;
  width: fit-content;
}

.message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: fit-content;
}
</style>
