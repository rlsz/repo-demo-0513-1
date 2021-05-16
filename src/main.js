import Vue from 'vue'
import {router, App} from './app'
import axios from 'axios'

axios.defaults.timeout = 20000

import "@/public/styles/global.less"
import publicModule, {RootProviders} from '@/public'
import {AjaxService} from "@/public/base";

Vue.use(publicModule, router)

Vue.config.productionTip = false

import './common.less'
import {CustomAjaxService} from './ajax'

new Vue({
    di: {
        providers: [
            ...RootProviders,
            {
                provide: AjaxService,
                useClass: CustomAjaxService
            }
        ]
    },
    router,
    render: h => h(App)
}).$mount('#app')

