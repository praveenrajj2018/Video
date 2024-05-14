// import logo from './logo.svg';
// import './App.css';
// import Navbar from './components/video';
// function App() {
//   return (
//     <div className="App">
//       <Navbar/>
//     </div>
//   );
// }

// export default App;
// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from '../src/store/index';
import Navbar from '../src/components/video';
 
const App = () => (
  <Provider store={store}>
    <div className='App'>
      <Navbar
        showSideNav={false}
        activePage="home"
        handleTitleChange={() => {}}
        toggleSideNav={() => {}}
        handlePageChange={() => {}}
        title=""
        titleError=""
        fileError=""
        uploadedFileName=""
        videos={[]}
        isPlaying={false}
        videoRef={null}
        handleUpload={() => {}}
        togglePlay={() => {}}
        deleteVideo={() => {}}
        removeFile={() => {}}
      />
    </div>
  </Provider>
);
 
export default App;
