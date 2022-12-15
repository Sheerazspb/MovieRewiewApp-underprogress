import React,{createContext, useState} from 'react'
import { useNotification } from '../hooks/themeHook';

export const SearchContext = createContext();

let timeoutid;
const debounce = (func, delay) => {
  return (...args) => {
    if (timeoutid) clearTimeout(timeoutid);
    timeoutid = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  }
}

function SearchProvider({ children }) {

  const [searching,setSearching] = useState(false)
  const [results,setResults] = useState([])
  const [resultNotFound,setResultNotFound] = useState(false)
  const {updateNotification} = useNotification(); 

  const search = async (method, query, updaterFunc) => {
    const {results,error} = await method(query)
    if(error) return updateNotification("error",error)
    if(!results.length) {
      setResults([])
      updaterFunc && updaterFunc()
      return setResultNotFound(true)
    }
    setResultNotFound(false) 
    setResults(results)
    updaterFunc && updaterFunc([...results])
  }

  const debounceFunc = debounce(search,300)

  const handleSearch = (method,query,updaterFunc) => {
    setSearching(true)
    if(!query.trim()) {
      updaterFunc &&  updaterFunc([])
      return resetSearch()
    }
    debounceFunc(method, query, updaterFunc)
  }
  const resetSearch = () => {
    setSearching(false)
    setResults([])
    setResultNotFound(false)
  }

  return (
    <SearchContext.Provider value={{handleSearch,resetSearch, searching, results, resultNotFound}}>
      {children}
    </SearchContext.Provider>
  )
}

export default SearchProvider
