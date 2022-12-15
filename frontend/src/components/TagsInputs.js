import {React,useState,useRef,useEffect} from 'react'
import { AiOutlineClose } from 'react-icons/ai'

function TagsInputs({name,value,onChange}) {
  const [tag,setTag] = useState('');
  const [tags,setTags] = useState([]);
  const input = useRef();
  const tagsInput = useRef();
 

  const handleOnChange = ({target}) => {
    const {value} = target
    if(value !== ',') setTag(value)
    onChange(tags)
  }

  const handleKeyDown = ({key}) => {
    // console.log(key)
    if (key === ',' || key === 'Enter') {
      if(!tag) return;
      if(tags.includes(tag)) return setTag('')
      setTags([...tags,tag])
      setTag('');
    }
    if(key === 'Backspace' && !tag && tags.length){
      const newTags = tags.filter((_,index) => index !== tags.length - 1)
      setTags([...newTags])
      console.log("tags",tags)
    }
  }


  const removeTag = (tagToRemove) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove)
     setTags([...newTags])  
    console.log("tags", tags)
  }

  // const removeTag = useCallback((tagToRemove) => {
  //   const newTags = tags.filter((tag) => tag !== tagToRemove)
  //   setTags([...newTags])
  //   console.log("tag", tags)
  // }, [tags])


  const handleOnFocus = () => {
    tagsInput.current.classList.remove('dark:border-dark-subtle', 'border-light-subtle')
    tagsInput.current.classList.add('dark:border-white', 'border-primary')
  }
  const handleOnBlur = () => {
    tagsInput.current.classList.add('dark:border-dark-subtle', 'border-light-subtle')
    tagsInput.current.classList.remove('dark:border-white', 'border-primary')
  }

  useEffect(() => {
    if(value.length) setTags(value)
  },[value])

  useEffect(() => {
    input.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  },[tag])



  return (
    <div>
      <div ref={tagsInput} onKeyDown={handleKeyDown} className='border-2 bg-transparent dark:border-dark-subtle border-light-subtle px-2 h-10 rounded w-full text-white flex items-center space-x-2 overflow-x-auto custum-scroll-bar transition'>
        {tags.map(el => (
        <Tag onClick={() => removeTag(el)} key={el}>{el}</Tag>
        ))}
        <input ref={input} name={name} type="text" className='h-full flex-grow bg-transparent outline-none dark:text-white text-primary ' placeholder='Add Tags' value={tag} onChange={handleOnChange} onFocus={handleOnFocus} onBlur={handleOnBlur} />
        </div>
    </div>
  )
}

const Tag = ({children,onClick}) => {
  return <span className='dark:bg-white bg-primary dark:text-primary text-white flex items-center text-sm p-1 rounded whitespace-nowrap'>
    {children}
    <button type='button'><AiOutlineClose onClick={onClick} size={12} /></button>
  </span>
}

export default TagsInputs
