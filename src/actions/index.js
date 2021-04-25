export * from './follower.action';
export * from './status.action';
export * from './newfeed.action';
export * from './notice.action';
export * from './apply.action';
export * from './approve.action';
export * from './save.action';
export * from './job.action';
export * from './hrm.action';
export * from './education.action';
export * from './authentication.action';
export * from './working.action';
import * as types from '../constants/action-types';
export const changeLanguage = language => {
    return {
        type: types.CHANGE_LANGUAGE,
        language
    }
}