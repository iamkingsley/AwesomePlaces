export {default as Storage} from './storage';
export {default as validate} from './validation';
export const createAction = type => payload => ({type, payload});
