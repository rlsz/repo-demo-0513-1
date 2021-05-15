<template>
  <div id="app" class="page-frame">
    <div class="header frame-padding">
      <span>BROCCOLI & CO.</span>
    </div>
    <div class="body">
      <div class="content flex vertical frame-padding">
        <router-view/>
      </div>
      <div class="company-info flex vertical cross-center frame-padding">
        <span>Made with ♥ in Melbourne.</span>
        <span>© 2016 Broccoli & Co. All rights reserved.</span>
      </div>
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

<style lang="less" scoped>
#app {

}
.header {
  border-bottom: 1px solid gray;
  padding-top: 20px;
  padding-bottom: 20px;
  > * {
    padding: 0 20px;
  }
}
.company-info {
  text-align: center;
  border-top: 1px solid gray;
  padding-top: 20px;
  padding-bottom: 20px;
  > * ~ * {
    margin-top: 4px;
  }
}
.content {
  margin: auto;
}
</style>
