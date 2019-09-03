import Vue from 'vue'
import {MLInstaller, MLCreate, MLanguage} from 'vue-multilanguage'

Vue.use(MLInstaller);

export default new MLCreate({
  initial: 'ar',
  // development  , production
  save: process.env.NODE_ENV === 'development',
  languages: [
    new MLanguage('en').create({
      ar: 'Arabic language',
      en: 'Arabic language',
      notification: 'Notification',
      settings: 'Settings',
      dashboard: 'dashboard',
      stats: 'stats',
    }),

    new MLanguage('ar').create({
      ar: 'اللغة الانجليزية',
      en: 'اللغة الانجليزية',
      notification: 'الاشعارات',
      settings: 'الاعدادات',
      dashboard: 'لوحة التحكم',
      stats: '  حالات الطلاب',
    })
  ]
})
