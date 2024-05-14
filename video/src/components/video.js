import React, { useState } from 'react'
//import './Relevantz.png'
import { FaBars, FaBookOpenReader, FaDeleteLeft } from "react-icons/fa6";
import { FaSearch, FaUserGraduate, FaHome, FaChartBar } from "react-icons/fa";
import Draggable from 'react-draggable';
import { FaPlus, FaBell, FaUser, FaChevronUp } from 'react-icons/fa';
import { FaPlay, FaVideo, FaMusic, FaFilePdf, FaFilePowerpoint, FaFileAlt, FaEdit, FaTrash } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import '../styles/video.css'
import Modal from 'react-modal';
import { MdOutlinePlayCircleOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPlayCircle } from 'react-icons/fa';
import { PiEyeLight, PiEyeSlashLight } from 'react-icons/pi';
//import { PiEyeLight } from "react-icons/pi";
import { useDropzone } from 'react-dropzone';
import { FaTimes } from 'react-icons/fa';
import { useRef, useCallback } from 'react';
import { FaPencilAlt, FaEye } from 'react-icons/fa';
import { GiCancel } from "react-icons/gi";
import { connect } from 'react-redux';
import { toggleSideNavAction, handlePageChangeAction, handleTitleChangeAction, onDropAction, togglePlayAction, handleUploadAction, deleteVideoAction, removeFileAction } from '../actions';
const Navbar = () => {
    // const { showSideNav, activePage, handleTitleChange, toggleSideNav, handlePageChange, title, titleError, fileError, uploadedFileName, videos, isPlaying, videoRef, handleUpload, togglePlay, deleteVideo, removeFile } = props;
 
    // // Rest of the component remains unchanged
    // const mapStateToProps = (state) => ({
    //     showSideNav: state.showSideNav,
    //     activePage: state.activePage,
    //     title: state.title,
    //     titleError: state.titleError,
    //     fileError: state.fileError,
    //     uploadedFileName: state.uploadedFileName,
    //     videos: state.videos,
    //     isPlaying: state.isPlaying,
    //     videoRef: state.videoRef
    // });
     
    // const mapDispatchToProps = {
    //     toggleSideNav: toggleSideNavAction,
    //     handlePageChange: handlePageChangeAction,
    //     handleTitleChange: handleTitleChangeAction,
    //     onDrop: onDropAction,
    //     togglePlay: togglePlayAction,
    //     handleUpload: handleUploadAction,
    //     deleteVideo: deleteVideoAction,
    //     removeFile: removeFileAction
    // };

 

    const [showSideNav, setShowSideNav] = useState(false);
    const [activePage, setActivePage] = useState('home');
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState('');
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [videos, setVideos] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);
    const [showReportDropdown, setShowReportDropdown] = useState(false);
    const [titleError, setTitleError] = useState('');
    const [existingTitles, setExistingTitles] = useState([]);

    const handleTitleChange = (event) => {
        const newTitle = event.target.value;
        setTitle(newTitle);

        if (!newTitle.trim()) {
            setTitleError('**Required field');
            return;
        }
        else if (newTitle.length > 50) {
            setTitleError('**Maximum character limit: 50');
            return;
        }
        else if (existingTitles.includes(newTitle)) {
            setExistingTitles('Content title already exists in this topic. Please try with another content title');
            return;
        }

        // If no errors, clear the error message
        setTitleError('');
    };


    const toggleSideNav = () => {
        setShowSideNav(!showSideNav);
    };
    const handlePageChange = (page) => {
        setActivePage(page);
        if (!showSideNav) {
            setShowSideNav(true);
        }
        if (page === 'reports') {
            setShowReportDropdown(!showReportDropdown);
        }
        if (showReportDropdown) setShowReportDropdown(!showReportDropdown);
    };

    const onDrop = useCallback((acceptedFiles) => {
        const uploadedFile = acceptedFiles[0];
        if (!uploadedFile) {
            setFileError('**Required field');
        }
        else if (!['video/mp4', 'audio/wav'].includes(uploadedFile.type)) {
            setFileError('**Accepted formats: .mp4, .wav.');
        } else {
            setFileError('');
            setFile(uploadedFile);
            setUploadedFileName(uploadedFile.name);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'video/mp4, audio/wav',
        multiple: false,
    });

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleUpload = () => {

        // Add validation for title and file here
        if (!title.trim()) {
            setTitleError('**Required field');
            // Title is required
            // Display error message or handle it as per your UI/UX design
            return;
        }
        if (!file) {
            setFileError('**Required field');
            // File is required
            // Display error message or handle it as per your UI/UX design
            return;
        }
        // Add logic to handle successful upload
        const newVideo = {
            title,
            fileURL: URL.createObjectURL(file),
            type: file.type.split('/')[0],
        };
        setVideos([...videos, newVideo]);
        setTitle('');
        setFile(null);
        setUploadedFileName('');
    };

    const deleteVideo = (index) => {
        setVideos(videos.filter((_, idx) => idx !== index));
    };
    const removeFile = () => {
        setUploadedFileName('');
        // setFiles([]);
    };
    

    return (

        <div className="dashboard">
            <div className='top-nav'>
                <button className="menu-btn" onClick={toggleSideNav}>
                    <FaBars />
                </button>
                <div className='nav-img'>
                    <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpcxEF2d6izYkyw940E-26faIrWT4ikbikzQv_IGNA&s'} />
                </div>

                <div className="user-info">

                    <FaSearch className="icon plus-icon" style={{ fontSize: "17px" }} />
                    <FaPlus className="icon plus-icon" style={{ fontSize: "17px" }} />
                    <FaBell className="icon notification-icon" style={{ fontSize: '17px' }} />
                    <FaUser className="icon profile-icon" style={{ fontSize: '17px' }} />

                </div>

            </div>
            <div className={`side-nav ${showSideNav ? 'open' : ''}`} >
                <ul>
                    <li className={activePage === 'home' ? 'active' : ''} onClick={() => handlePageChange('home')}>
                        <FaHome className='icon' /> {/* Icon for Home */}
                        {showSideNav && <span>Home</span>}
                    </li>
                    <li className={activePage === 'course' ? 'active' : ''} onClick={() => handlePageChange('course')}>
                        <FaBookOpenReader className='icon' /> {/* Icon for Submit Request */}
                        {showSideNav && <span>Course</span>}
                    </li>
                    <li
                        className={activePage === 'learner' ? 'active' : ''}
                        onClick={() => handlePageChange('learner')}
                    >
                        <FaUserGraduate className='icon' /> {/* Icon for Tracking */}
                        {showSideNav && <span>Learner</span>}
                    </li>
                    <li className='reports' onClick={() => handlePageChange('reports')}>
                        <FaChartBar className='icon' />
                        {showSideNav && <span>Reports</span>}


                    </li>
                </ul>
                <ul className={`submenu ${showReportDropdown ? 'open' : ''}`}>
                    <li onClick={() => setActivePage('learnerreport')}> Learner Report</li>
                    <li onClick={() => setActivePage('coursereport')}>Course Report</li>
                    <li onClick={() => setActivePage('enroll')}>Enrollment Report</li>
                    <li onClick={() => setActivePage('quiz')}>Quiz Report</li>
                </ul>
                
            </div>
            <div className="course-creation-page">
                <div className="container">
                    <div className="form-container">
                        <div className="course-creation-form">
                            <div className="content">
                                <div className="main-content">
                                    <h2 style={{ paddingRight: '730px' }}>Video Content</h2>
                                    <hr /><br /><div>
                                        <div>
                                            <label style={{ paddingRight: '774px' }}>CONTENT TITLE</label>
                                            <input
                                                type="text"
                                                value={title}
                                                onChange={handleTitleChange}
                                                placeholder="Enter content title"
                                                required
                                            />   {titleError && <p style={{ color: 'red' }}>{titleError}</p>}
                                            {/* Display validation error message for title */}
                                        </div>
                                        <label style={{ paddingRight: '754px' }}>UPLOAD CONTENT</label>
                                        <div {...getRootProps()} className="drag-drop-area">
                                            <input {...getInputProps()} required />
                                            {isDragActive ? (
                                                <p>Drop files here</p>
                                            ) : (
                                                <p>
                                                    Drop files here <br />or<br /><a href="#" style={{ textDecoration: 'none', color: 'blue' }}>click to upload</a>
                                                </p>
                                            )}
                                            {/* Display validation error message for file */}
                                        </div>{fileError && <p style={{ color: 'red' }}>{fileError}</p>}</div>
                                    {uploadedFileName && (
                                        <div style={{ border: '1px solid black', marginTop: '10px', height: '48px', backgroundColor: '#D9D9D9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <p>{uploadedFileName}</p>
                                            <FaTimes onClick={removeFile} style={{ cursor: 'pointer' }} />
                                        </div>
                                    )}<br />
                                    <button onClick={handleUpload} style={{ backgroundColor: 'blue', marginLeft: '380px' }}>Upload Content</button>


                                    <div className="uploaded-videos" style={{ display: 'grid', flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {videos.map((video, index) => (
                                            <div key={index} style={{ margin: '10px', display: 'flex', marginTop: '20px' }}>
                                                {video.type === 'video' ? (<div style={{ position: 'relative', width: '106px', height: '71px' }}>
                                                    <video ref={videoRef} width="320" height="240" onClick={togglePlay} style={{ position: 'relative', width: '106px', height: '71px' }}>
                                                        <source src={video.fileURL} type="video/mp4" />
                                                    </video> {!isPlaying && (
                                                        <MdOutlinePlayCircleOutline onClick={togglePlay} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '24px', color: 'white' }} />
                                                    )}
                                                </div>

                                                ) : (
                                                    <audio ref={videoRef} controls onClick={togglePlay} >
                                                        <source src={video.fileURL} type="audio/wav" />
                                                    </audio>
                                                )}

                                                <p style={{ marginLeft: '30px' }}>{video.title}</p>
                                                <div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '520px' }}>

                                                        <div style={{ display: 'flex', gap: '35px' }}>
                                                            <div onClick={togglePlay} style={{ cursor: 'pointer', color: 'purple' }}>
                                                                {isPlaying ? <PiEyeSlashLight /> : <PiEyeLight />}
                                                            </div>
                                                            <FaEdit style={{ color: 'blue' }} />
                                                            <RiDeleteBinLine onClick={() => deleteVideo(index)} style={{ color: 'red' }} />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
                                                }

export default Navbar;
// export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
// const Navbar = (props) => {
//     const { showSideNav, activePage, handleTitleChange, toggleSideNav, handlePageChange, title, titleError, fileError, uploadedFileName, videos, isPlaying, videoRef } = props;
//  const [showReportDropdown,setShowReportDropdown]=useState(false);
//  const{getRootProps,getInputProps,isDragActive}=useDropzone({});
 
//     const togglePlay = () => {
//         if (videoRef.current) {
//             if (isPlaying) {
//                 videoRef.current.pause();
//             } else {
// videoRef.current.play();
//             }
//             setIsPlaying(!isPlaying);
//         }
//     };
        
 
//     const handleUpload = () => {
//         // Add validation for title and file here
//         if (!title.trim()) {
//             setTitleError('**Required field');
//             // Title is required
//             // Display error message or handle it as per your UI/UX design
//             return;
//         }
//         if (!file) {
//             setFileError('**Required field');
//             // File is required
//             // Display error message or handle it as per your UI/UX design
//             return;
//         }
//         // Add logic to handle successful upload
//         const newVideo = {
//             title,
//             fileURL: URL.createObjectURL(file),
//             type: file.type.split('/')[0],
//         };
//         setVideos([...videos, newVideo]);
//         setTitle('');
//         setFile(null);
//         setUploadedFileName('');
//     };
 
//     const deleteVideo = (index) => {
//         setVideos(videos.filter((_, idx) => idx !== index));
//     };
 
//     const removeFile = () => {
//         setUploadedFileName('');
//     };
 
//     return (
//         <div className="dashboard">
//             {/* Rest of the component */}
//                         <div className='top-nav'>
//           <button className="menu-btn" onClick={toggleSideNav}>
//                      <FaBars />
//                  </button>
//                  <div className='nav-img'>
//                      <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpcxEF2d6izYkyw940E-26faIrWT4ikbikzQv_IGNA&s'} />
//                  </div>

//                  <div className="user-info">
//                      <FaSearch className="icon plus-icon" style={{ fontSize: "17px" }} />
//                      <FaPlus className="icon plus-icon" style={{ fontSize: "17px" }} />
//                     <FaBell className="icon notification-icon" style={{ fontSize: '17px' }} />
//                      <FaUser className="icon profile-icon" style={{ fontSize: '17px' }} />

//                  </div>

//             </div>
//              <div className={`side-nav ${showSideNav ? 'open' : ''}`} >
//                  <ul>
//                      <li className={activePage === 'home' ? 'active' : ''} onClick={() => handlePageChange('home')}>
//                          <FaHome className='icon' /> {/* Icon for Home */}
//                          {showSideNav && <span>Home</span>}
//                     </li>
//                     <li className={activePage === 'course' ? 'active' : ''} onClick={() => handlePageChange('course')}>
//                          <FaBookOpenReader className='icon' /> {/* Icon for Submit Request */}
//                          {showSideNav && <span>Course</span>}
//                      </li>                    <li
//                         className={activePage === 'learner' ? 'active' : ''}
//                         onClick={() => handlePageChange('learner')}
//                     >
//                         <FaUserGraduate className='icon' /> {/* Icon for Tracking */}
//                         {showSideNav && <span>Learner</span>}
//                     </li>
//                     <li className='reports' onClick={() => handlePageChange('reports')}>
//                         <FaChartBar className='icon' />
//                         {showSideNav && <span>Reports</span>}


//                     </li>
//                 </ul>
//                 <ul className={`submenu ${showReportDropdown ? 'open' : ''}`}>
//                     <li onClick={() => setActivePage('learnerreport')}> Learner Report</li>
//                     <li onClick={() => setActivePage('coursereport')}>Course Report</li>
//                     <li onClick={() => setActivePage('enroll')}>Enrollment Report</li>
//                     <li onClick={() => setActivePage('quiz')}>Quiz Report</li>
//                 </ul>
                
//             </div>
//             <div className="course-creation-page">
//                 <div className="container">
//                     <div className="form-container">
//                         <div className="course-creation-form">
//                             <div className="content">
//                                 <div className="main-content">
//                                     <h2 style={{ paddingRight: '730px' }}>Video Content</h2>
//                                     <hr /><br /><div>
//                                         <div>
//                                             <label style={{ paddingRight: '774px' }}>CONTENT TITLE</label>
//                                             <input
//                                                 type="text"
//                                                 value={title}
//                                                 onChange={handleTitleChange}
//                                                 placeholder="Enter content title"
//                                                 required
//                                             />   {titleError && <p style={{ color: 'red' }}>{titleError}</p>}
//                                             {/* Display validation error message for title */}
//                                         </div>
//                                         <label style={{ paddingRight: '754px' }}>UPLOAD CONTENT</label>
//                                         <div {...getRootProps()} className="drag-drop-area">
//                                             <input {...getInputProps()} required />
//                                             {isDragActive ? (
//                                                 <p>Drop files here</p>
//                                             ) : (
//                                                 <p>
//                                                     Drop files here <br />or<br /><a href="#" style={{ textDecoration: 'none', color: 'blue' }}>click to upload</a>
//                                                 </p>
//                                             )}
//                                             {/* Display validation error message for file */}
//                                         </div>{fileError && <p style={{ color: 'red' }}>{fileError}</p>}</div>
//                                     {uploadedFileName && (
//                                         <div style={{ border: '1px solid black', marginTop: '10px', height: '48px', backgroundColor: '#D9D9D9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                                             <p>{uploadedFileName}</p>
//                                             <FaTimes onClick={removeFile} style={{ cursor: 'pointer' }} />
//                                         </div>
//                                     )}<br />
//                                     <button onClick={handleUpload} style={{ backgroundColor: 'blue', marginLeft: '380px' }}>Upload Content</button>


//                                     <div className="uploaded-videos" style={{ display: 'grid', flexDirection: 'row', flexWrap: 'wrap' }}>
//                                         {videos.map((video, index) => (
//                                             <div key={index} style={{ margin: '10px', display: 'flex', marginTop: '20px' }}>
//                                                 {video.type === 'video' ? (<div style={{ position: 'relative', width: '106px', height: '71px' }}>
//                                                     <video ref={videoRef} width="320" height="240" onClick={togglePlay} style={{ position: 'relative', width: '106px', height: '71px' }}>
//                                                         <source src={video.fileURL} type="video/mp4" />
//                                                     </video> {!isPlaying && (
//                                                         <MdOutlinePlayCircleOutline onClick={togglePlay} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '24px', color: 'white' }} />
//                                                     )}
//                                                 </div>

//                                                 ) : (
//                                                     <audio ref={videoRef} controls onClick={togglePlay} >
//                                                         <source src={video.fileURL} type="audio/wav" />
//                                                     </audio>
//                                                 )}

//                                                 <p style={{ marginLeft: '30px' }}>{video.title}</p>
//                                                 <div>
//                                                     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '520px' }}>

//                                                         <div style={{ display: 'flex', gap: '35px' }}>
//                                                             <div onClick={togglePlay} style={{ cursor: 'pointer', color: 'purple' }}>
//                                                                 {isPlaying ? <PiEyeSlashLight /> : <PiEyeLight />}
//                                                             </div>
//                                                             <FaEdit style={{ color: 'blue' }} />
//                                                             <RiDeleteBinLine onClick={() => deleteVideo(index)} style={{ color: 'red' }} />
//                                                         </div>
//                                                     </div>

//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
            
//         </div>
//     );
// };
 
// const mapStateToProps = (state) => ({
//     showSideNav: state.showSideNav,
//     activePage: state.activePage,
//     title: state.title,
//     titleError: state.titleError,
//     fileError: state.fileError,
//     uploadedFileName: state.uploadedFileName,
//     videos: state.videos,
//     isPlaying: state.isPlaying,
//     videoRef: state.videoRef
// });
 
// const mapDispatchToProps = {
//     toggleSideNav: toggleSideNavAction,
//     handlePageChange: handlePageChangeAction,
//     handleTitleChange: handleTitleChangeAction,
//     onDrop: onDropAction,
//     togglePlay: togglePlayAction,
//     handleUpload: handleUploadAction,
//     deleteVideo: deleteVideoAction,
//     removeFile: removeFileAction
// };
 
// export default connect(mapStateToProps, mapDispatchToProps)(Navbar);