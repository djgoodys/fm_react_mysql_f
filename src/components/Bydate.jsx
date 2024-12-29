import React, { useState } from 'react'
import { manageEquipment } from '../thunks/listEquipmentThunk';
import { useDispatch} from 'react-redux'

const Bydate = () => {
  const dispatch = useDispatch()
  const [isActive, setActive] = useState(false);
  const [data, setData] = useState([])
  const[serverResponse, setServerResponse] = useState('')
  const [sortByLabel, setSortByLabel] = useState('Sort by...')
  const toggleClass = () => {
    setActive(!isActive);
  };

  function sort(sortType) {
    const obj={
      action:"sort",
      sortby:sortType
    }
    dispatch(manageEquipment(obj))


  }

  return (
    <div className="Bydate-container" onClick={toggleClass} >{sortByLabel}
      <div className={isActive ? 'openNav' : 'closeNav'} id="nav">
        <div className="nav-item" onClick={() => { sort('ASC');setSortByLabel("Newest to oldest") }}>Newest to oldest</div>
        <div className="nav-item" onClick={() => { sort('DESC');setSortByLabel("Oldest to newest") }}>Oldest to newest</div>
        <div className="nav-item" onClick={() => { sort('today'); setSortByLabel("Today")}}>Today</div>
        <div className="nav-item" onClick={() => { sort('NORMAL');setSortByLabel('Sort by...') }}>Normal</div>
      </div>
    </div>
  )
}

export default Bydate