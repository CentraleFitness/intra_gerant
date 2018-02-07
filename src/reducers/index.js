import { combineReducers } from 'redux';
import LoginReducer from './loginReducer';
import RegisterReducer from './registerReducer';
import ProfileReducer from './profileReducer';
import GlobalReducer from './globalReducer';
import ContactReducer from './contactReducer';
import EventsReducer from './eventsReducer';

export default combineReducers({
    login: LoginReducer,
    register: RegisterReducer,
    profile: ProfileReducer,
    contact: ContactReducer,
    events: EventsReducer,
    global: GlobalReducer
});