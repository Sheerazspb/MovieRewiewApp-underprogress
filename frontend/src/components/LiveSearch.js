import { React, useState, useEffect, useRef, forwardRef } from 'react'
import { commonInputClasses } from '../utils/theme'



function LiveSearch({ value = '', autocomplete, onChange , placeholder='', results=[],name, renderItem, resultContainerStyle, selectedResultStyle,onSelect,inputStyle }) {
  const [displaySearch, setDisplaySearch] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);

  const handleOnFocus = () => {
    if (results.length) setDisplaySearch(true)
  }

  const closeSearch = () => {
    setDisplaySearch(false)
    setFocusIndex(-1)
  }

  const handleOnBlur = () => {
    setTimeout(() => {
      closeSearch()
    }, 100);
  }

  const handleSelection = (selectedItem) => {
     if(selectedItem){
      onSelect(selectedItem);
      closeSearch()
     } 
  }

  const handleOnKeyDown = ({ key }) => {
    let nextCount;
    const keys = ["ArrowDown", "ArrowUp", "Enter", "Escape"]
    if (!keys.includes(key)) return;
    // move slection up and down key
    if (key === 'ArrowDown') {
      nextCount = (focusIndex + 1) % results.length;
      // setFocusIndex(nextCount-1)
    }
    if (key === 'ArrowUp') {
      nextCount = (focusIndex + results.length - 1) % results.length;
      // setFocusIndex(nextCount+1)
    }

    if (key === 'Escape') return closeSearch();
    if (key === 'Enter') return handleSelection(results[focusIndex])
    setFocusIndex(nextCount)
    // closeSearch();
  }
   const getInputStyle = () => {
     return inputStyle ? inputStyle : commonInputClasses + " border-2 p-1 rounded text-lg"
   }

   useEffect(() => {
    if(results.length) return setDisplaySearch(true)
    setDisplaySearch(false)
   },[results.length])

  return (
    <div className='relative'>
      <input type="text" id={name} name={name} className={getInputStyle()} placeholder={placeholder} onFocus={handleOnFocus} onBlur={handleOnBlur} onKeyDown={handleOnKeyDown} value={value} autoComplete={autocomplete} onChange={onChange} />

      <SearchResult focusIndex={focusIndex} visible={displaySearch} results={results} onSelect={handleSelection} renderItem={renderItem} resultContainerStyle={resultContainerStyle} selectedResultStyle={selectedResultStyle}/>
    </div>
  )
}
// const renderItem = ({id,name,avatar}) => {
//  return(<div className='flex'>
//   <img src={avatar} alt=""  className='w-16 h-16'/>
//   <p>{name}</p>
//   <p>{id}</p>
//  </div>)
// }

const SearchResult = ({ visible, results = [], focusIndex, onSelect, renderItem ,resultContainerStyle ,selectedResultStyle }) => {

  const resultContainer = useRef()
  useEffect(() => {
    resultContainer.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }, [focusIndex])

  if (!visible) return null;

  return (
    <div className='absolute z-50 right-0 left-0 top-10 max-h-64 space-y-2 mt-1 bg-white dark:bg-secondary shadow-md p-2  overflow-auto custum-scroll-bar'>
      {results.map((result, index) => {
        const  getSlectedClass = () => {
          return selectedResultStyle ? selectedResultStyle : 'dark:bg-dark-subtle bg-light-subtle'
        }
        return (
          <ResultCard key={index.toString()} item={result} renderItem={renderItem} resultContainerStyle={resultContainerStyle} selectedResultStyle={index === focusIndex ? getSlectedClass() : ""} onClick={() => onSelect(result)} ref={index === focusIndex ? resultContainer : null} />

        );
      })}

    </div>
  )
}

const ResultCard = forwardRef((props, ref) => {

  const { item, renderItem, onClick, resultContainerStyle, selectedResultStyle } = props

  const getClasses = () => {
    if (resultContainerStyle) return resultContainerStyle + " " + selectedResultStyle;
    return (
      selectedResultStyle +
      " cursor-pointer rounded overflow-hidden dark:hover:bg-dark-subtle hover:bg-light-subtle transition"
    )
  }

  return (
  <div onClick={onClick} ref={ref} className={getClasses()}>
     {renderItem(item) }
  </div >

)
})

export default LiveSearch
