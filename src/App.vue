<template>
  <div id="app">
    <Modal :isModalOpen="toggleSettings" @closeModal="toggleSettings = $event"></Modal>
    <div class="tool-bar">
      <i
        v-if="(user && user.permission === 'ADMIN') || (user && user.permission === 'CLIENT')"
        @click="isSideBarOpen = !isSideBarOpen"
        class="fa fa-bars font-awesome-icon-settings cursor-pointer"
      ></i>
      <SearchBar v-if="user && user.permission === 'CLIENT'" :searchArray="mockData" />
      <div>
        <i
          v-if="(user && user.permission === 'ADMIN') || (user && user.permission === 'CLIENT')"
          @click="togleNotifications = !togleNotifications"
          style="margin-right: 1rem; z-index: 0;"
          class="fa fa-bell cursor-pointer font-awesome-icon-settings"
        >
        </i>
        <i
          v-if="(user && user.permission === 'ADMIN') || (user && user.permission === 'CLIENT')"
          @click="toggleSettings = !toggleSettings"
          style="margin-right: 1rem;"
          class="fa fa-cog cursor-pointer font-awesome-icon-settings"
        ></i>
      </div>
    </div>
    <div id="nav">
      <SideBar :isSideBarOpen="isSideBarOpen" @isOpen="toggleSideBar($event)">
        <ul class="side-bar-link-container">
          <li @click="goToPage(link.name)" class="side-bar-links" v-for="link in navLinks" :key="link.name">
            <i :class="link.icon"></i>
            <div style="margin-left: 1rem;">{{ link.name }}</div>
          </li>
        </ul>
      </SideBar>
      <SideBar :isSideBarOpen="togleNotifications" :position="'right'" @isOpen="togleNotifications = $event">
        <div style="display: flex; justify-content: center;" v-if="!notifications.length">
          <div>No Notifications</div>
        </div>
        <div v-if="notifications.length">
          <ul class="side-bar-link-container">
            <li
              @click="viewDetails(notification.path)"
              class="side-bar-links"
              v-for="notification in notifications"
              :key="notification.name"
            >
              <i :class="notification.icon"></i>
              <div style="margin-left: 1rem;">{{ notification.name }}</div>
            </li>
          </ul>
        </div>
      </SideBar>
    </div>
    <div class="router-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar/SideBar';
import SearchBar from '@/components/SearchBar';
import Modal from '@/components/Modal';
import SideBarUtils from '@/components/SideBar/utils';
import { mockData } from './assets/mockData';
import { mapGetters } from 'vuex';
import { generateUserObject, setNavigationParams, getUserFromVueX } from './utils';

export default {
  name: 'App',
  components: {
    SideBar,
    SearchBar,
    Modal
  },
  data: () => ({
    mockData,
    toggleSettings: false,
    isSideBarOpen: false,
    navLinks: null,
    togleNotifications: false
  }),
  methods: {
    toggleSideBar(event) {
      this.isSideBarOpen = event;
    },
    goToPage(name) {
      this.isSideBarOpen = !this.isSideBarOpen;
      if (name === 'Log Out') {
        this.$store.dispatch('setUser', {
          name: null,
          token: null,
          permission: null,
          data: null,
          notifications: []
        });
        return this.$router.push(
          setNavigationParams('LogIn', {
            user: generateUserObject(null, null, null, null)
          })
        );
      } else {
        return this.$router.push(
          setNavigationParams(name, {
            user: generateUserObject(
              (this.user && this.user.name) || '',
              (this.user && this.user.token) || '',
              (this.user && this.user.permission) || '',
              (this.user && this.user.data) || null
            )
          })
        );
      }
    }
  },
  viewDetails(data) {
    console.log('NOTIFICATIONS', data);
  },
  computed: {
    ...mapGetters({ user: 'getUser', notifications: 'getUserNotifications' })
  },
  watch: {
    user: {
      handler(data) {
        const userState = getUserFromVueX();
        if (data && data.permission) {
          this.navLinks = SideBarUtils.getNavLinks(data.permission);
        } else if (userState) {
          this.navLinks = SideBarUtils.getNavLinks(userState.permission);
        }
      }
    }
  }
};
</script>

<style lang="scss">
@import '../node_modules/font-awesome/css/font-awesome.css';
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.router-container {
  display: grid;
  justify-items: center;
  height: 100%;
  width: 100%;
}

.tool-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: fixed;
  height: 3rem;
  background-color: #2c3e50;
}

.side-bar-link-container {
  width: 100%;
}

.side-bar-links {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5rem;
  list-style: none;
  width: 100%;
}

.side-bar-links:hover {
  background-color: aliceblue;
  cursor: pointer;
}

.cursor-pointer {
  cursor: pointer;
}

.font-awesome-icon-settings {
  color: white;
  font-size: 2rem;
  margin-left: 1rem;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
