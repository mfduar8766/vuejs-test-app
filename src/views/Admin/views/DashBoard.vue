<template>
  <div style="height: 100%; width: 100%;">
    <h2>Welcome {{ user && user.name }}</h2>
    <div class="dashboard">
      <Card
        @onClick="navigateToPage('Agencies')"
        class="admin-card cursor-pointer"
        :headerStyles="{ 'box-shadow': 'none' }"
        :heightWidth="['250px', '20%']"
      >
        <template v-slot:header>
          <div class="header">
            <h3>Agencies</h3>
          </div>
        </template>
        <i class="fa fa-institution fa-4x"></i>
      </Card>
      <Card
        @onClick="navigateToPage('Agents')"
        class="admin-card cursor-pointer"
        :headerStyles="{ 'box-shadow': 'none' }"
        :heightWidth="['250px', '20%']"
      >
        <template v-slot:header>
          <div class="header">
            <h3>Agents</h3>
          </div>
        </template>
        <i class="fa fa-users fa-4x"></i>
      </Card>
      <Card
        @onClick="navigateToPage('Metrics')"
        class="admin-card cursor-pointer"
        :headerStyles="{ 'box-shadow': 'none' }"
        :heightWidth="['250px', '20%']"
      >
        <template v-slot:header>
          <div class="header">
            <h3>Metrics</h3>
          </div>
        </template>
        <i class="fa fa-area-chart fa-4x"></i>
      </Card>
    </div>
  </div>
</template>

<script>
import Card from '../../../components/Card';
import { setNavigationParams } from '../../../utils';
export default {
  components: {
    Card
  },
  props: {
    user: {
      default: null,
      type: Object
    }
  },
  methods: {
    navigateToPage(name) {
      this.$router.push(setNavigationParams(name, { user: this.user }));
    }
  }
};
</script>

<style scoped lang="scss">
.dashboard {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  width: 100%;
}

.header {
  text-align: center;
  width: 100%;
}

.admin-card:hover {
  background-color: lightgray;
  color: white;
  .fa {
    color: white;
  }
}

.fa {
  color: lightgray;
}
</style>
