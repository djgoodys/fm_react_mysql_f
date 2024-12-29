import React from 'react'

const DivAdmin = () => {
  return (
    <div>
        <div id="divAdminMode" style={{height:"200px",backgroundColor:"black",color:"white",textAlign:"center",width:"fit-content",marginRight:"auto",marginLeft:"auto"}}>
   You are in admin mode because there are currently no users installed. Click <br /><a href="admin.php" target="iframe2">HERE</a><br /> to enter admin control panel and create your
   Filter Manager username and password. <p style={{color:"red"}}>IMPORTANT select ADMIN yes option on next page. You will be responsable for adding
   other users</p>
   </div>
    </div>
  )
}

export default DivAdmin;