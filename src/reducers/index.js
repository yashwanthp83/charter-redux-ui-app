import {combineReducers} from 'redux';
import {reducer as FormReducer} from 'redux-form'
import {PreviousSales} from './previousSales'

const allReducers = combineReducers({
    form: FormReducer,
    lastthreeMonthsSales: PreviousSales
});

export default allReducers;