<template>
  <app-dialog-bridge class="my-dialog no-shadow">
    <span slot="title" style="margin-left: auto;">Request an invite</span>
    <div class="flex vertical">
      <input type="text" placeholder="Full name"/>
      <input type="email" placeholder="Email"/>
      <input type="email" placeholder="Confirm email"/>
    </div>
    <button slot="footer" class="app-form" @click="submit" v-loading-target>Send</button>
  </app-dialog-bridge>
</template>

<script>
import {Dialog} from "@/public/dialogs";
import {LoggerService} from "@/public/logger";
import {AjaxService} from "@/public/base";

export default {
  di: {
    inject: {
      dialog: Dialog,
      ls: LoggerService,
      ajax: AjaxService
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
    submit() {
      this.ajax.post('submit', {}).then(res => {
        this.ls.success('success')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.my-dialog {
  min-width: 300px;
  /deep/ .header {
    &:after {
      content: '';
      background: black;
      height: 1px;
      width: 20px;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
input {
  font-size: 14px;
  line-height: 22px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #323335;
  margin: 10px 0;
  padding: 0 4px;
}
</style>
