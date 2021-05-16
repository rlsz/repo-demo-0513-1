<template>
  <div id="app" class="page-frame">
    <div class="header frame-padding">
      <span>BROCCOLI & CO.</span>
    </div>
    <div class="body">
      <div class="content flex vertical frame-padding">
        <router-view/>
      </div>
    </div>
    <div class="footer">
      <div class="company-info flex vertical cross-center frame-padding">
        <span>Made with ♥ in Melbourne.</span>
        <span>© 2016 Broccoli & Co. All rights reserved.</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less" scoped>
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
  font-size: 12px;
  > * ~ * {
    margin-top: 4px;
  }
}
.content {
  margin: auto;
}
</style>
