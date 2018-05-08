import { combineReducers } from 'redux';
import LoginReducer from './loginReducer';
import RegisterReducer from './registerReducer';
import ProfileReducer from './profileReducer';
import GlobalReducer from './globalReducer';
import ContactReducer from './contactReducer';
import EventsReducer from './eventsReducer';
import CustomPrograms from './customProgramsReducer';

export default combineReducers({
    login: LoginReducer,
    register: RegisterReducer,
    profile: ProfileReducer,
    contact: ContactReducer,
    events: EventsReducer,
    custom_programs: CustomPrograms,
    global: GlobalReducer
});