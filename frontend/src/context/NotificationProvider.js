import React,{createContext,useState} from 'react'
const NotificationContext = createContext();
let timeOutId;

function NotificationProvider({children}) {
  const [notification,setNotification] = useState();
  const [classes,setClasses] = useState('');
  const updateNotification = (type,value) => {
    if(timeOutId) clearTimeout(timeOutId);
    switch (type) {
      case "error":
        setClasses("text-red-600 shadow-red-300 bg-red-100 dark:bg-red-200 ")
        break;
      case "success":
        setClasses("text-green-600 shadow-green-300 bg-green-100 dark:bg-green-200 ")
        break;
      case "warning":
        setClasses("text-orange-600 shadow-orange-300 bg-orange-100 dark:bg-orange-200 ")
        break;
      default:
        setClasses("text-blue-600 bg shadow-blue-300-blue-100 dark:bg-blue-200 ")
    }
    timeOutId = setNotification(value)
    setTimeout(() => {
      setNotification('')
    }, 4000);
  }
// text-blue-700 bg-blue-100  dark:bg-blue-200 dark:text-blue-800
  return (
    <NotificationContext.Provider value={{updateNotification}}>
      {children}
      {notification && <div className={classes + " fixed top-[6rem]   shadow-red-900 shadow-md min-w-[20%] left-1/2 -translate-x-1/2  mt-2 flex p-4 mb-4 rounded-lg text justify-center align-middle"} role="alert">
        <svg className="inline flex-shrink-0 mr-3 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
        <div className="bounce-custum">
          {notification}
        </div>
      </div>}
    </NotificationContext.Provider>
  )
}

export { NotificationProvider, NotificationContext }
