import {SHOW_ALL,SHOW_COMPLETED,SHOW_ACTIVE} from '../const/const';

export function showAll(payload) {
  return {
    type: SHOW_ALL,
    payload
  }
}


export function showCompleted(payload){
    return {
        type: SHOW_COMPLETED,
        payload
    }
}


export function showActive(payload){
    return {
        type: SHOW_ACTIVE,
        payload
    }
}
