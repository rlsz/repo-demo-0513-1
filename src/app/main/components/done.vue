<template>
  <app-dialog-bridge class="no-shadow">
    <span slot="title">All done!</span>
    <div class="flex vertical cross-center content">
      <span>You will be one of the first to experience</span>
      <span>Broccoli & Co. when we launch.</span>
    </div>
    <button slot="footer" class="app-form" @click="dialog.close(true)">Ok</button>
  </app-dialog-bridge>
</template>

<script>
import {Dialog} from "@/public/dialogs";

export default {
  di: {
    inject: {
      dialog: Dialog
    }
  },
  data() {
    return {

    }
  },
  computed: {
    config() {
      return this.dialog.config
    }
  },
  created() {
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.app-dialog-bridge {
  //min-width: 300px;
}
.content {
  color: #95a4bd;
  padding: 20px;
}
</style>
