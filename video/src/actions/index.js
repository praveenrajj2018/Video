// import * as types from './types';
// import Navbar from '../components/video';
// export const setShowSideNav = (showSideNav) => ({
//   type: types.SET_SHOW_SIDE_NAV,
//   payload: showSideNav,
// });

// export const setActivePage = (activePage) => ({
//   type: types.SET_ACTIVE_PAGE,
//   payload: activePage,
// });

// export const setTitle = (title) => ({
//   type: types.SET_TITLE,
//   payload: title,
// });

// export const setFile = (file) => ({
//   type: types.SET_FILE,
//   payload: file,
// });

// export const setFileError = (fileError) => ({
//   type: types.SET_FILE_ERROR,
//   payload: fileError,
// });

// export const setUploadedFileName = (uploadedFileName) => ({
//   type: types.SET_UPLOADED_FILE_NAME,
//   payload: uploadedFileName,
// });

// export const setVideos = (videos) => ({
//   type: types.SET_VIDEOS,
//   payload: videos,
// });

// export const setIsPlaying = (isPlaying) => ({
//   type: types.SET_IS_PLAYING,
//   payload: isPlaying,
// });

// export const setVideoRef = (videoRef) => ({
//   type: types.SET_VIDEO_REF,
//   payload: videoRef,
// });

// export const setShowReportDropdown = (showReportDropdown) => ({
//   type: types.SET_SHOW_REPORT_DROPDOWN,
//   payload: showReportDropdown,
// });

// export const setTitleError = (titleError) => ({
//   type: types.SET_TITLE_ERROR,
//   payload: titleError,
// });
import { TOGGLE_SIDENAV, HANDLE_PAGE_CHANGE, HANDLE_TITLE_CHANGE, ON_DROP, TOGGLE_PLAY, HANDLE_UPLOAD, DELETE_VIDEO, REMOVE_FILE } from './types';
 
// Action creators
export const toggleSideNavAction = () => ({ type: TOGGLE_SIDENAV });
export const handlePageChangeAction = (page) => ({ type: HANDLE_PAGE_CHANGE, payload: page });
export const handleTitleChangeAction = (event) => ({ type: HANDLE_TITLE_CHANGE, payload: event.target.value });
export const onDropAction = (acceptedFiles) => ({ type: ON_DROP, payload: acceptedFiles });
export const togglePlayAction = () => ({ type: TOGGLE_PLAY });
export const handleUploadAction = () => ({ type: HANDLE_UPLOAD });
export const deleteVideoAction = (index) => ({ type: DELETE_VIDEO, payload: index });
export const removeFileAction = () => ({ type: REMOVE_FILE });