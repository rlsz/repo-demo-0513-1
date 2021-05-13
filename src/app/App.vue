<template>
  <div id="app" class="flex vertical" v-platform>
    <div style="margin-left: 20px;">BROCCOLI & CO.</div>
    <div class="flex vertical fill-content">
      <router-view/>
    </div>
    <div class="flex vertical cross-center">
      <span>Made with ♥ in Melbourne.</span>
      <span>© 2016 Broccoli & Co. All rights reserved.</span>
    </div>
  </div>
</template>

<script>

import {AppService} from "./app.service";
import {menus} from "./router";
import {Platform, PlatformService} from "@/public/platform";

export default {
  name: 'App',
  di: {
    providers: [
      {provide: AppService, useValue: AppService.instance}
    ],
    inject: {
      as: AppService,
      ps: PlatformService
    }
  },
  data() {
    return {
      menu: menus
    }
  },
  computed: {
    inner() {
      return this.ps.platform === Platform.mobile && this.$route.matched && this.$route.matched.length
    },
    title() {
      return this.$route.meta?.title || ''
    }
  },
  created() {
    console.log(this.as.aaa)
    setTimeout(() => {
      this.as.test = 'test alskjdlaskjd'
      this.$set(this.as, 'test2', [{
        a: 'aa',
        b: 'bb',
      }])
      // this.as.test2 = [{
      //   a: 'aa',
      //   b: 'bb',
      // }]
      setTimeout(() => {
        this.as.test2.push({
          c: 'cc',
          d: 'dd'
        })
        // this.$set(this.as.test2, 1, {
        //   c: 'cc',
        //   d: 'dd'
        // })
      }, 1000)
    }, 2000)
  }
}
</script>

<style lang="less">
#app {
  flex: 1 1 0px;
  overflow: hidden;
  color: rgba(51, 51, 51, 1);
}
</style>
