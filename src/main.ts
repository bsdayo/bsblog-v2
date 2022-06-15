import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { version } from '../package.json'

// Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faHome,
  faArchive,
  faGear,
  faHeart,
  faAngleDown,
  faClock,
  faBook,
  faTag,
  faBars
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faHome, faArchive, faGear, faHeart, faAngleDown,
  faClock, faBook, faTag, faBars
)

createApp(App)
  .use(router)
  .component('fa-icon', FontAwesomeIcon)
  .provide('version', version)
  .mount('#app')
