//import libraries
import I18n from 'i18n-js';

//translations
import en from './en'
import vi from './vi'

I18n.translations = {
    en,
    vi
}
// const getLanguage = async() => {
//     try{
//         const choice = await Localization.locale
//         I18n.locale = choice.substr(0, 2)
//         I18n.initAsync()
//     }catch (error) {
//         console.log('Unable to get locale')
//     }
// }

// getLanguage()

// export function t(name){
//     return I18n.t(name)
// }
export default I18n;