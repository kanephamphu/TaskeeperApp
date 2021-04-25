import {combineReducers} from 'redux';
import status from './status.reducer';
import follower from './follower.reducer';
import newfeed from './newfeed.reducer';
import notice from './notice.reducer';
import apply from './apply.reducer';
import approve from './approve.reducer';
import save from './save.reducer';
import job from './job.reducer';
import hrm from './hrm.reducer';
import education from './education.reducer';
import authentication from './authenticaiton.reducer';
import working from './working.reducer';
import languageReducer from './language.reducer';
const myReducer = combineReducers({
    follower,
    status,
    newfeed,
    notice,
    apply,
    approve,
    save,
    job,
    hrm,
    education,
    authentication,
    working,
    languageReducer
});
export default myReducer;