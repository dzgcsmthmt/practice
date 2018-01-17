import {SHOW_ALL,SHOW_COMPLETED,SHOW_ACTIVE} from '../const/const';

let initState = {
    showType: 0
}

export default function filter(state = initState, action) {
    switch (action.type) {
        case SHOW_ALL:
        case SHOW_COMPLETED:
        case SHOW_ACTIVE:
            return Object.assign({},state,action.payload);
        default:
            return state
    }
}
