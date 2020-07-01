<template>
  <div class="container">
    <Card :heightWidth="['250px', '20%']">
      <form novalidate="true" @submit.prevent="handleSubmit" class="form-container">
        <h3>Welcome</h3>
        <Input :placeholder="'User Name'" v-model="user.userName" :name="'userName'" />
        <small v-if="errors && errors.length">
          <div class="error" v-for="error in errors" :key="error.userName">{{ error.userName }}</div>
        </small>
        <Input
          :placeholder="'Password'"
          v-model="user.password"
          style="margin: 1rem 0px 0px 0px"
          :type="'password'"
          :ame="'password'"
        />
        <small v-if="errors && errors.length">
          <div class="error" v-for="error in errors" :key="error.password">{{ error.password }}</div>
        </small>
        <Button
          :isDisabled="errors && errors.length ? true : false"
          buttonText="LogIn"
          type="submit"
          backgroundColor="#2c3e50"
        />
        <div style="display: flex; justify-content: space-between; width: 350px;">
          <p class="cursor-pointer forgot-password">Forgot Password</p>
          <p class="cursor-pointer create-account">Create Account</p>
        </div>
      </form>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { generateUserObject } from '../utils';

export default {
  components: {
    Card,
    Button,
    Input
  },
  data: () => ({
    user: {
      userName: '',
      password: ''
    },
    errors: []
  }),
  methods: {
    handleSubmit() {
      if (!this.user.userName || !this.user.userName.length) {
        this.errors.push({ userName: 'Required' });
      }
      if (!this.user.password || !this.user.password.length) {
        this.errors.push({ password: 'Required' });
      }
      this.handleSetUser(this.user.userName);
    },
    handleSetUser(userName) {
      switch (userName) {
        case 'mfduar8766':
          this.$store.dispatch('setUser', {
            name: userName,
            token: '123',
            permission: 'ADMIN',
            data: null,
            notifications: []
          });
          return this.$router.push({
            name: 'Admin',
            params: { user: generateUserObject(userName, '123', 'ADMIN', [200, 300, 400, 500, 600, 700]) }
          });
        default:
          this.$store.dispatch('setUser', {
            name: userName,
            token: '123',
            permission: 'CLIENT',
            data: null,
            notifications: []
          });
          return this.$router.push({
            name: 'Client',
            params: { user: generateUserObject(userName, '456', 'CLIENT', null) }
          });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 250px;
  width: 100%;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 250px;
}

.forgot-password:hover {
  color: #007ad9;
  text-decoration: underline;
}

.create-account:hover {
  color: #007ad9;
  text-decoration: underline;
}

.error {
  color: red;
}

.is-error {
  border: 1px solid red;
}
</style>
