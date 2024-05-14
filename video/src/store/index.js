// import { createStore } from 'redux';
// import reducer from '../reducers';

// const store = createStore(reducer);

// export default store;
import { createStore } from 'redux';
import rootReducer from '../reducers';
 
// Create store
const store = createStore(rootReducer);
 
export default store;