import React from 'react'
import AppInfoBox from '../AppInfoBox'
import LatestUploads from '../LatestUploads'
// import MovieUpload from './MovieUpload'



function Dashboard() {
  return(
    <div className="grid grid-cols-3 gap-5 m-5">
      <AppInfoBox title='Total Uploads' subTitle='100'/>
      <AppInfoBox title='Total Reviews' subTitle='1200'/>
      <AppInfoBox title='Total Users' subTitle='120'/>

      <LatestUploads/>
    </div>
  )
}

export default Dashboard
