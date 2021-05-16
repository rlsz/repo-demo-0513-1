<template>
  <app-dialog-bridge class="no-shadow">
    <span slot="title">Request an invite</span>
    <div class="flex vertical">
      <input :class="{invalid:errors.name}" v-model="form.name" type="text" placeholder="Full name"/>
      <span class="error-message">{{ errors.name }}</span>
      <input :class="{invalid:errors.email}" v-model="form.email" type="email" placeholder="Email"/>
      <span class="error-message">{{ errors.email }}</span>
      <input :class="{invalid:errors.confirmEmail}" v-model="form.confirmEmail" type="email"
             placeholder="Confirm email"/>
      <span class="error-message">{{ errors.confirmEmail }}</span>
    </div>
    <template slot="footer">
      <button class="app-form" @click="submit" v-loading-target>Send</button>
      <span class="error-message">{{ errors.result }}</span>
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
      rules: {
        name: [
          {validator: val => !val, message: 'Name is required.'},
          {
            validator: val => !/^\s*(.{3,})\s*$/gi.test(val),
            message: 'Full name needs to be at least 3 characters long.'
          }
        ],
        email: [
          {validator: val => !val, message: 'Email is required.'},
          {
            validator: val => !/^\s*([a-z0-9]+@[a-z0-9]+[.a-z0-9]*)\s*$/gi.test(val),
            message: 'Email needs to be in validation email format.'
          },
        ],
        confirmEmail: [
          {validator: val => !val, message: 'Confirm email is required.'},
          {
            validator: (val, parent) => val !== parent.email,
            message: 'The confirm email is distinguished from your email.'
          },
        ]
      },
      errors: {}
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
      this.errors = this.validate()
      if (Object.keys(this.errors).length) {
        return
      }
      this.ajax.post('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth', {
        name: this.form.name,
        email: this.form.email
      }, {
        log: false
      }).then(res => {
        this.ls.success(res)
        this.dialog.close(true)
      }).catch(err => {
        this.errors = {
          result: new Log(err).summary
        }
      })
    },
    validate() {
      return Object.keys(this.rules).reduce((errors, key) => {
        const parent = this.form
        const val = this.form[key]
        const rules = this.rules[key]
        const error = rules.find(rule => rule.validator(val, parent))
        if (error) {
          errors[key] = error.message
        }
        return errors
      }, {})
    }
  }
}
</script>

<style lang="less" scoped>
.app-dialog-bridge {
  //width: 300px;
}

input {
  font-size: 14px;
  line-height: 22px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #323335;
  margin: 10px 0;
  padding: 0 4px;
  border: 1px solid gray;
  border-radius: 4px;
  &.invalid {
    border-color: #E94848;
  }
}

.error-message {
  color: #E94848;
}
</style>
