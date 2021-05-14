<template>
  <div class="flex vertical fill-content center">
    <span>A better way to enjoy every day.</span>
    <span>Be the first to know when we launch.</span>
    <button class="app-form" @click="requestInvite">Request an invite</button>
  </div>
</template>

<script>
import {DialogService, Model} from "@/public/dialogs";
import request from "./components/request";
import done from "./components/done";

export default {
  name: "home",
  di: {
    inject: {
      ds: DialogService
    }
  },
  methods: {
    requestInvite() {
      this.ds.open(request, {
        model: Model.float
      }).afterClosed().then(res => {
        if(res) {
          return this.ds.open(done, {
            model: Model.float
          }).afterClosed()
        }
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>

</style>
