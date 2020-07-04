<template>
  <div>
    <div v-if="isModalOpen" :style="classProp" class="modal-container">
      <div class="modal-inner-container">
        <div v-if="showHeader" class="modal-header">
          <div style="margin-left: 0.5rem;">{{ headerText }}</div>
          <div class="icon-container">
            <i @click="$emit('closeModal', false)" class="times-icon fa fa-times"></i>
          </div>
        </div>
      </div>
      <slot></slot>
      <footer v-if="showFooter" class="modal-footer">
        <slot name="footer"></slot>
      </footer>
    </div>
    <div :class="[isModalOpen ? 'is-overlay' : '']"></div>
  </div>
</template>

<script>
export default {
  props: {
    isModalOpen: {
      default: false,
      type: Boolean
    },
    headerText: String,
    showHeader: {
      default: true,
      type: Boolean
    },
    showFooter: Boolean,
    classProp: Object
  },
  computed: {
    setModalStyle() {
      console.log('CLASS PROP', this.classProp);
      return '';
    }
  }
};
</script>

<style scoped lang="scss">
.modal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 30%;
  left: 40%;
  box-shadow: 0 8px 8px 8px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  transform: translate(-30%, -40%);
  z-index: 4;
  box-sizing: border-box;
  overflow-y: scroll;
  height: 50%;
  width: 50%;
  background-color: white;
}

.is-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 3;
}

.modal-inner-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 100%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 2.5rem;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

.icon-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 5%;
}

.times-icon {
  color: red;
  cursor: pointer;
}

.expand-icon {
  font-size: 1.2rem;
  font-weight: bolder;
  color: black;
  cursor: pointer;
  margin-right: 0.5rem;
}

.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  color: black;
  overflow-y: scroll;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 2.5rem;
}
</style>
