import React, { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import {uploadMovie, uploadTrailer} from '../../api/movie';
import { useNotification } from '../../hooks/themeHook'
import ModalContainer from '../modals/ModalContainer';
import MovieForm from './MovieForm';

function MovieUpload({visible,onClose }) {
  const [videoSelected, setVideoSelected] = useState(false)
  const [videoUploaded, setVideoUploaded] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const { updateNotification } = useNotification();
  const [videoInfo, setVideoInfo] = useState({})
  const [busy, setBusy] = useState(false)

  // const [movieInfo, setMovieInfo] = useState({
  //   title:"",
  //   storyLine:"",
  //   tags:[],
  //   cast:[],
  //   director:{},
  //   writers:[],
  //   releseDate:"",
  //   poster:null,
  //   genres:[],
  //   type:"",
  //   language:"",
  //   status:"",
  //   trailer:{
  //     url:"",
  //     public_id:""
  //   }

  // })

  const handleUploadTrailer = async (data) => {
    
    const { error, url, public_id } = await uploadTrailer(data, setUploadProgress)
   if (error) return updateNotification("error",error)
    setVideoUploaded(true)
    setVideoInfo({ url, public_id })
  }
  // console.log(videoInfo);
  const handleOnTypeError = (error) => {
    updateNotification('error', error);
  }
  const handleChange = (file) => {
    const formData = new FormData();
    formData.append('video', file);
    setVideoSelected(true)
    handleUploadTrailer(formData)
  }
  const getUploadProgressValue = () => {
    if (!videoUploaded && uploadProgress >= 100) {
      return 'Proccessing'
    }
    return `Uploading progress ${uploadProgress}%`
  }

  const handleSubmit = async (data) => {
   if(!videoInfo.url || !videoInfo.public_id) return updateNotification('error','Trailer is missing!')
    setBusy(true)
    data.append('trailer', JSON.stringify(videoInfo))
    const res = await uploadMovie(data);
    setBusy(false)
    console.log(res);
    if(res.id) {
      onClose()
      return updateNotification("success", "New movie uploaded successfully!")
      // setBusy(false)
      
    }
    
    return updateNotification("error",res.message || res.error)
    
  }

  return (
      <ModalContainer visible={visible}>
        <div className="mb-5">
          <UploadProgress visible={!videoUploaded && videoSelected} message={getUploadProgressValue()} width={uploadProgress} />
        </div>
        {!videoSelected ? <TrailerSelector visible={!videoSelected} onTypeError={handleOnTypeError} handleChange={handleChange} /> :
        <MovieForm btnTitle='Upload' busy={busy} onSubmit={!busy ? handleSubmit : null}/>}
      </ModalContainer>
   
  )
}

const TrailerSelector = ({ visible, handleChange, onTypeError }) => {
  if (!visible) return null;
  return (
    <div className="h-full flex justify-center items-center">
      <FileUploader handleChange={handleChange} onTypeError={onTypeError} types={['mp4', 'avi']}>
        <div className='w-64 h-64 border border-dashed dark:border-dark-subtle border-light-subtle flex justify-center items-center rounded-full flex-col dark:text-dark-subtle text-secondary cursor-pointer'>
          <AiOutlineCloudUpload size={80} />
          <p>Drop your file here!</p>
        </div>
      </FileUploader>
    </div>
  )
}

const UploadProgress = ({ width, message, visible }) => {
  if (!visible) return null;
  return <div className='dark:bg-primary bg-white drop-shadow-lg rounded p-3'>
    <div className='relative h-3 dark:bg-dark-subtle bg-light-subtle overflow-hidden'>
      <div style={{ width: width + '%' }} className='h-full  absolute dark:bg-white bg-secondary left-0'>
      </div>
    </div>
    <p className='font-semibold dark:text-dark-subtle text-light-subtle animate-pulse mt-1'>{message}</p>
  </div>

}


export default MovieUpload
