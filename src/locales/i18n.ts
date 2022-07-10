import { createI18n } from 'vue-i18n'
import session from '@/service/session/session';
import { localeMessages } from './messages';

const message = {
    english: localeMessages('english'),
    tagalog: localeMessages('tagalog')
};

export default createI18n({
    locale: (session.get('locale') || 'english'),
    fallbackLocale: 'english',
    messages: message
})
