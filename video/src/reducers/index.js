// import * as types from '../actions/types';
// import Navbar from '../components/video';
// const initialState = {
//   showSideNav: false,
//   activePage: 'home',
//   title: '',
//   file: null,
//   fileError: '',
//   uploadedFileName: '',
//   videos: [],
//   isPlaying: false,
//   videoRef: null,
//   showReportDropdown: false,
//   titleError: '',
// };

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case types.SET_SHOW_SIDE_NAV:
//       return { ...state, showSideNav: action.payload };
//     case types.SET_ACTIVE_PAGE:
//       return { ...state, activePage: action.payload };
//     case types.SET_TITLE:
//       return { ...state, title: action.payload };
//     case types.SET_FILE:
//       return { ...state, file: action.payload };
//     case types.SET_FILE_ERROR:
//       return { ...state, fileError: action.payload };
//     case types.SET_UPLOADED_FILE_NAME:
//       return { ...state, uploadedFileName: action.payload };
//     case types.SET_VIDEOS:
//       return { ...state, videos: action.payload };
//     case types.SET_IS_PLAYING:
//       return { ...state, isPlaying: action.payload };
//     case types.SET_VIDEO_REF:
//       return { ...state, videoRef: action.payload };
//     case types.SET_SHOW_REPORT_DROPDOWN:
//       return { ...state, showReportDropdown: action.payload };
//     case types.SET_TITLE_ERROR:
//       return { ...state, titleError: action.payload };
//     default:
//       return state;
//   }
// };

// export default reducer;
import { combineReducers } from 'redux';
import {
    TOGGLE_SIDENAV,
    HANDLE_PAGE_CHANGE,
    HANDLE_TITLE_CHANGE,
    ON_DROP,
    TOGGLE_PLAY,
    HANDLE_UPLOAD,
    DELETE_VIDEO,
    REMOVE_FILE
} from '../actions/types';
 
// Initial state
const initialState = {
    showSideNav: false,
    activePage: 'home',
    title: '',
    titleError: '',
    fileError: '',
    uploadedFileName: '',
    videos: [],
    isPlaying: false,
    videoRef: null
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
      case TOGGLE_SIDENAV:
          return { ...state, showSideNav: !state.showSideNav };
      case HANDLE_PAGE_CHANGE:
          return { ...state, activePage: action.payload };
      case HANDLE_TITLE_CHANGE:
          return { ...state, title: action.payload };
      case ON_DROP:
          // Handle onDrop action
      case TOGGLE_PLAY:
          // Handle togglePlay action
      case HANDLE_UPLOAD:
          // Handle handleUpload action
      case DELETE_VIDEO:
          // Handle deleteVideo action
      case REMOVE_FILE:
          // Handle removeFile action
      default:
          return state;
  }
};

export default rootReducer;