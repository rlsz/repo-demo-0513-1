<template>
  <app-dialog-bridge class="no-shadow">
    <span slot="title">Request an invite</span>
    <div class="flex vertical">
      <input v-model="form.name" type="text" placeholder="Full name"/>
      <input v-model="form.email" type="email" placeholder="Email"/>
      <input v-model="form.confirmEmail" type="email" placeholder="Confirm email"/>
    </div>
    <template slot="footer">
      <button class="app-form" @click="submit" v-loading-target>Send</button>
      <div class="error-message">{{err}}</div>
    </template>
  </app-dialog-bridge>
</template>

<script>
import {Dialog} from "@/public/dialogs";
import {Log, LoggerService} from "@/public/logger";
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
      form: {
        name: '',
        email: '',
        confirmEmail: ''
      },
      err: null
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
      this.err = ''
      if(!this.form.name) {
        this.err = 'Please fill your name.'
        return
      }
      if(!/^\s*(.{3,})\s*$/gi.test(this.form.name)) {
        this.err = 'Full name needs to be at least 3 characters long.'
        return
      } else {
        this.form.name = RegExp.$1
      }
      if(!this.form.email) {
        this.err = 'Please fill your email.'
        return
      }
      if(!/^\s*([a-z0-9]+@[a-z0-9]+\.?[a-z0-9]*)\s*$/gi.test(this.form.email)) {
        this.err = 'Email needs to be in validation email format.'
        return
      } else {
        this.form.email = RegExp.$1
      }
      if(this.form.confirmEmail !== this.form.email) {
        this.err = 'The confirm email is distinguished from your email.'
        return
      }
      this.ajax.post('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth', {
        name: this.form.name,
        email: this.form.email
      }).then(res => {
        this.ls.success(res)
        this.dialog.close(true)
      }).catch(err => {
        this.err = new Log(err).summary
      })
    }
  }
}
</script>

<style lang="less" scoped>
.app-dialog-bridge {
  width: 300px;
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
.error-message {
  color: #E94848;
}
</style>
