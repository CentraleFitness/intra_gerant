import { combineReducers } from 'redux';
import LoginReducer from './loginReducer';
import RegisterReducer from './registerReducer';
import HomeReducer from './homeReducer';
import ProfileReducer from './profileReducer';
import GlobalReducer from './globalReducer';
import ContactReducer from './contactReducer';
import DisplayReducer from './displayReducer';
import EventsReducer from './eventsReducer';
import CustomPrograms from './customProgramsReducer';
import Equipment from './equipmentReducer';

export default combineReducers({
    login: LoginReducer,
    register: RegisterReducer,
    home: HomeReducer,
    profile: ProfileReducer,
    contact: ContactReducer,
    display: DisplayReducer,
    events: EventsReducer,
    custom_programs: CustomPrograms,
    equipment: Equipment,
    global: GlobalReducer
});