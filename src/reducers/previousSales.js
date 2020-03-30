export const PreviousSales = (state=null, action) => {
    switch(action.type) {
        case "GET_SALES":
            return action.payload;
            break;
    }
    return state;
}

