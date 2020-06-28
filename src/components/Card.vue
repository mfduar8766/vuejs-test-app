<template>
  <div @click="$emit('onClick')" :style="cardHeightWidth" class="card-container height-width">
    <div class="card">
      <div :style="carHeaderStyles" v-if="showHeader" class="card-header">
        <slot name="header"></slot>
      </div>
      <div class="card-body height-width">
        <slot></slot>
      </div>
      <div class="card-footer" v-if="showFooter">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    showFooter: Boolean,
    showHeader: {
      default: true,
      type: Boolean
    },
    heightWidth: Array,
    headerStyles: [String, Object]
  },
  computed: {
    cardHeightWidth() {
      return { height: this.heightWidth[0], width: this.heightWidth[1] };
    },
    carHeaderStyles() {
      return this.headerStyles;
    }
  }
};
</script>

<style scoped lang="scss">
.card-container {
  height: 50%;
  width: 100%;
  padding: 0;
  margin: 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  overflow: hidden;
  box-sizing: border-box;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  margin: 0.5rem 0 0.5rem 0;
  word-wrap: break-word;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
