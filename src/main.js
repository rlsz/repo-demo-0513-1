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

class CustomAjaxService extends AjaxService {
    constructor(injector) {
        super(injector, process.env.VUE_APP_API_HOST);
    }

    get(url, params, config) {
        return this.interceptor(headers => axios.get(
            this.getUrl(url),
            {
                validateStatus: function (status) {
                    return status < 500; // Resolve only if the status code is less than 500
                },
                ...config,
                params,
                headers
            }
        ), config)
    }

    post(url, data, config) {
        return this.interceptor(headers => axios.post(
            this.getUrl(url),
            data,
            {
                validateStatus: function (status) {
                    return status < 500; // Resolve only if the status code is less than 500
                },
                ...config,
                headers
            }
        ), config)
    }

    interceptor(ajax, config = {}) {
        config = Object.assign({
            log: true,
            popupLog: false,
            token: true,
            retry: true,
            reportProgress: false,
            withCredentials: false,
            loading: true
        }, config);
        return Promise.resolve({
            'Content-Type': 'application/json;charset=UTF-8',
            ...config.headers
        }).then(headers => {
            config.loading && this.loading.increase()
            return ajax(headers)
        }).finally(() => {
            config.loading && this.loading.decrease()
        }).then(res => {
            if (res.status !== 200) {
                throw res?.data?.errorMessage || res
            }
            return res.data
        }).catch(err => {
            if (config.log) {
                this.ls.error(err)
            }
            throw err
        })
    }
}

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

