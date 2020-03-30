import api from '../axios/create';

export const fetchSales = () => {
    return async dispatch => {
        const response = await api.get('sales/getSalesForLastThreeMonths', {params : {
            customerId: '1234556780'
        }});
        dispatch({
            type: 'GET_SALES',
            payload: response
        });
    }
    
}