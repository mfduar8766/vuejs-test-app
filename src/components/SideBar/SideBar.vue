<template>
  <div>
    <div v-if="position === 'left'">
      <div v-if="isSideBarOpen" style="left: 0" class="side-bar">
        <div class="icon">
          <div @click="toggleSideBar()" class="times-icon fa fa-times cursor-pointer"></div>
        </div>
        <slot></slot>
      </div>
    </div>
    <div v-if="position === 'right'">
      <div v-if="isSideBarOpen" style="right: 0" class="side-bar">
        <div class="icon">
          <div @click="toggleSideBar()" class="times-icon fa fa-times cursor-pointer"></div>
        </div>
        <slot></slot>
      </div>
    </div>
    <div :class="[isSideBarOpen ? 'is-overlay' : '']"></div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  props: {
    isSideBarOpen: Boolean,
    position: {
      default: 'left',
      type: String
    }
  },
  data() {
    return {
      isOpen: true
    };
  },
  methods: {
    toggleSideBar() {
      this.isOpen = !this.isOpen;
      this.$emit('isOpen', this.isOpen);
    }
  }
};
</script>

<style scoped lang="scss">
.side-bar {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  background: white;
  padding: 0;
  margin: 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  overflow-y: scroll;
  width: 500px;
  z-index: 2;
}

.icon {
  display: flex;
  justify-content: flex-end;
  margin-right: 1rem;
  padding: 1rem;
  z-index: 3;
}

.times-icon {
  color: red;
  z-index: 4;
  cursor: pointer;
}

.is-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
}
</style>
