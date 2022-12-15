import React, { useState,useEffect } from 'react'
import { ImSpinner9 } from 'react-icons/im'
import { useNotification } from '../../hooks/themeHook'
import { commonInputClasses } from '../../utils/theme'
import PosterSelector from '../PosterSelector'
import Selector from '../Selector'


const defaultActorInfo = {
  name: '',
  about: '',
  avatar: null,
  gender:'',
}

const genderOptions = [
  {title:'Male',value:'male'},
  {title:'Female',value:'female'},
  {title:'Other',value:'other'},
]

const validateActor = ({avatar,name,gender,about}) => {
  if(!name.trim()) return ({error:"Name field is missing!"})
  if(!about.trim()) return ({error:"About field is missing!"})
  if(!gender.trim()) return ({error:"Gender field is missing!"})
  // if (!avatar) return ({ error: "Avatar field is missing!" })
  // console.log(avatar);
  if (avatar && (!avatar.type?.startsWith("image") && !avatar.url)) return ({error:"Invalid image file!"})

  return {error:null}
}

function ActorForm({ title, btnTitle,busy,onSubmit,intialState }) {

  const [actorInfo, setActorInfo] = useState({ ...defaultActorInfo })
  const [selectedAvtarForUI, setSelectedAvtarForUI] = useState('')
  const {updateNotification} =  useNotification()
  // console.log(intialState);
  const handleChange = (e) => {
    const { value, files, name } = e.target
    if (name === 'avatar') {
      const file = files[0]
      setActorInfo({ ...actorInfo, avatar: file })
      setSelectedAvtarForUI(URL.createObjectURL(file))
      return setActorInfo({ ...actorInfo, avatar:file });
    }
    setActorInfo({ ...actorInfo, [name]: value });
 }
  // console.log(actorInfo);
  const handleSubmit = (e) => {
    e.preventDefault();
    const {error} = validateActor(actorInfo);
    if(error) return updateNotification('error',error)
    // Submit Actor Form
    const formData = new FormData();
    for (let key in actorInfo) {
      if(key) formData.append(key,actorInfo[key])
    }
    onSubmit(formData)
  }

  useEffect(() => {
    if(intialState) {
      setActorInfo({ ...intialState, avatar: null})
      // console.log(actorInfo)
      setSelectedAvtarForUI(intialState.avatar.url)
      // console.log(selectedAvtarForUI)
    } 
  },[intialState])
  // console.log(actorInfo);
  const { name, about,gender } = actorInfo

  return (
    <form onSubmit={handleSubmit} className='dark:bg-primary bg-white p-3 w-[35rem] rounded-lg'>
      <div className='flex items-center justify-between mb-3'>
        <h1 className='font-semibold text-xl text-primary dark:text-white'>{title}</h1>
        <button type='submit' className='h-8 w-24 bg-primary text-white dark:bg-white dark:text-primary hover:opacity-80 transition rounded flex items-center justify-center' >{busy ? <ImSpinner9 className='animate-spin' /> : btnTitle}</button>
      </div>
      <div className="flex space-x-2">
        <PosterSelector label='Select Avatar' accept='image/jpg,image/jpeg,image/png' selectedPoster={selectedAvtarForUI} name='avatar' onChange={handleChange} className='w-40 h-40 aspect-square object-cover rounded' />
        <div className="flex-grow flex flex-col space-y-2">
          <input type="text" name='name' value={name} onChange={handleChange} className={commonInputClasses + ' border-b-2  p-1'} placeholder='Enter Name' autoComplete='off' />
          <textarea name='about' value={about} onChange={handleChange} className={commonInputClasses + ' border-b-2 resize-none h-full p-1'} placeholder='About'></textarea>
        </div>
      </div>
      <div className="mt-3">
        <Selector options={genderOptions} label='Gender' name='gender' value={gender} onChange={handleChange} />
      </div>
   </form>

  )
}

export default ActorForm
