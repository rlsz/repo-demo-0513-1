<script>
import {Dialog, Model} from "../../dialogs/dialog";
import {PlatformService} from '../../platform/platform.service'
import {Platform} from '../../platform/platform'

export default {
  name: "dialog-item",
  props: ['options'],
  di: {
    providers: [{
      provide: Dialog,
      useFactory() {
        return this.$options.propsData.options.instance
      }
    }]
  },
  computed: {
    modelClass(){
      const config = this.options.instance.config
      if (config && config.model) {
        return config.model
      } else {
        return PlatformService.instance.platform === Platform.pc ? Model.float : Model.fillAvailable
      }
    }
  },
  // https://vuejs.org/v2/guide/render-function.html#createElement-Arguments
  render(h) {
    return h('div', {
      class: {
        'dialog-container': true,
        [this.modelClass]: true
      },
      on: {
        click: this.onClick
      }
      // props: {
      //   title: 'placeholder',
      //   ...this.options.instance.config,
      //   visible: true,
      //   'before-close': () => {
      //     this.options.instance.close()
      //   },
      //   'custom-class': this.options.instance.config?.transparent ? 'transparent' : ''
      // }
    }, [
      h('div', {class: 'dialog-panel'}, [h(this.options.vueComponent)])
    ])
  },
  methods: {
    onClick(event) {
      if (event.target === event.currentTarget) {
        const enableOverlayClose = this.options.instance.config && this.options.instance.config['close-on-click-overlay']
        if (enableOverlayClose === undefined || enableOverlayClose) {
          this.options.instance.close()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.dialog-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  padding: 16px;

  .dialog-panel {
    max-height: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    box-shadow: 0px 3px 8px 0px rgba(255, 255, 255, 0.2);
  }

  &.float {
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);

    > * {
      margin: auto;
    }

    .dialog-panel {
      //padding: 24px;
    }
  }

  &.fill-available {
    background-color: rgba(255, 255, 255, 1);
    padding: 0;

    > * {
      flex: 1 1 0px;
    }

    .dialog-panel {
      border-radius: 0;

      .header {
        padding: 16px 48px;

        span.back {
          left: 18px;
          top: 18px;
        }
      }
    }
  }

  &.transparent {
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);

    > * {
      margin: auto;
    }

    .dialog-panel {
      background: none;

      > .header {
        display: none;
      }

      > .body {
        margin: 0;
      }
    }
  }
}
</style>
