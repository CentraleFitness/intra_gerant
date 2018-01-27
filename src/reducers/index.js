import { combineReducers } from 'redux';
import LoginReducer from './loginReducer';
import RegisterReducer from './registerReducer';
import ProfileReducer from './profileReducer';

export default combineReducers({
    login: LoginReducer,
    register: RegisterReducer,
    profile: ProfileReducer
});