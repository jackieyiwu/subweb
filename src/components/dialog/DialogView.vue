<template>
  <teleport to="body">
    <div class="dialog-custom swal2-container swal2-center swal2-backdrop-show" @click.self="closeDialog">
      <div
        aria-labelledby="swal2-title"
        aria-describedby="swal2-html-container"
        class="swal2-popup swal2-modal swal2-icon-success swal2-show"
        tabindex="-1"
        role="dialog"
        aria-live="assertive"
        aria-modal="true"
      >
        <component :is="$store.state.app.dialog.icon" />
        <h2 class="swal2-title">
          {{ $store.state.app.dialog.title }}
        </h2>
        <div class="swal2-html-container">
          {{ $store.state.app.dialog.message }}
        </div>
        <div class="swal2-actions">
          <component :is="$store.state.app.dialog.button" />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import IconSuccess from './icon/success.vue';
import IconInfo from './icon/info.vue';
import IconWarning from './icon/warning.vue';
import IconError from './icon/error.vue';
import ButtonDefault from './button/ButtonDefault.vue';
import ButtonSuccess from './button/ButtonSuccess.vue';
import ButtonWarning from './button/ButtonWarning.vue';
import ButtonError from './button/ButtonError.vue';
import ButtonConfirmDefault from './button/ConfirmDefault.vue';
import ButtonConfirmSuccess from './button/ConfirmSuccess.vue';
import ButtonConfirmWarning from './button/ConfirmWarning.vue';
import ButtonConfirmError from './button/ConfirmError.vue';
export default {
  name: 'DialogView',
  components: {
    ButtonConfirmDefault,
    ButtonConfirmSuccess,
    ButtonConfirmWarning,
    ButtonConfirmError,
    ButtonDefault,
    ButtonSuccess,
    ButtonWarning,
    ButtonError,
    IconSuccess,
    IconInfo,
    IconWarning,
    IconError,
  },
  methods: {
    closeDialog() {
      this.$store.commit('SET_DIALOG_CLOSE');
    },
  },
};
</script>

<style scoped>
.dialog-custom {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;
  background-color: rgba(15, 23, 42, 0.45);
  z-index: 3000;
}

.swal2-popup {
  width: min(32rem, 100%);
  display: grid;
  justify-items: center;
  row-gap: 0.75rem;
  background: #fff;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.25);
}

.swal2-title {
  margin: 0;
  color: #3a3754;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
}

.swal2-html-container {
  margin: 0;
  color: #6f6b7d;
  text-align: center;
  word-break: break-word;
}

.swal2-actions {
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

:deep(.swal2-icon) {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  border: 0.25rem solid currentColor;
  border-radius: 50%;
  box-sizing: border-box;
}

:deep(.swal2-warning) {
  color: #f0ad4e;
}

:deep(.swal2-info) {
  color: #3fc3ee;
}

:deep(.swal2-success) {
  color: #67c23a;
}

:deep(.swal2-error) {
  color: #f56c6c;
}

:deep(.swal2-icon-content) {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
}

:deep(.swal2-success-ring),
:deep(.swal2-success-fix),
:deep(.swal2-success-circular-line-left),
:deep(.swal2-success-circular-line-right) {
  display: none;
}

:deep(.swal2-success-line-tip),
:deep(.swal2-success-line-long) {
  position: absolute;
  height: 0.28rem;
  border-radius: 0.2rem;
  background-color: currentColor;
}

:deep(.swal2-success-line-tip) {
  width: 1rem;
  left: 1.1rem;
  top: 2.65rem;
  transform: rotate(45deg);
}

:deep(.swal2-success-line-long) {
  width: 1.8rem;
  left: 1.75rem;
  top: 2.35rem;
  transform: rotate(-45deg);
}

:deep(.swal2-x-mark) {
  position: relative;
  width: 2.2rem;
  height: 2.2rem;
}

:deep(.swal2-x-mark-line-left),
:deep(.swal2-x-mark-line-right) {
  position: absolute;
  top: 0.95rem;
  left: 0;
  width: 2.2rem;
  height: 0.28rem;
  border-radius: 0.2rem;
  background-color: currentColor;
}

:deep(.swal2-x-mark-line-left) {
  transform: rotate(45deg);
}

:deep(.swal2-x-mark-line-right) {
  transform: rotate(-45deg);
}

:deep(.btn) {
  min-width: 96px;
}

:global(.dark-style) .swal2-popup {
  background: #2f3349;
}

:global(.dark-style) .swal2-title {
  color: #cfd3ec;
}

:global(.dark-style) .swal2-html-container {
  color: #b9bed8;
}
</style>
