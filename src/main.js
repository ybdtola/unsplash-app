import { createApp } from 'vue'
import '@/assets/global.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import router from './router'
// import VueBlurHash from 'vue'
import '@/assets/fonts.css'

// import 'vue-blurhash/dist/vue-blurhash.css'

import { library } from '@fortawesome/fontawesome-svg-core'

import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faSearch, faTimes)

createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(router).mount('#app')
