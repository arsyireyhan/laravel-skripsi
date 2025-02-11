import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'
import { useState } from 'react'
import { useEffect } from 'react'
import { api } from 'src/plugins/api'
import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'
import navigationAccount from './_navAccount'
import navigationAdmin from './_navAdmin'
import navigationGuest from './_navGuest'


const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)

  const token = localStorage.getItem('token');

  const role = localStorage.getItem('role');

  const [data, setData] = useState([]);

  const setNav = () => {
    if (role === "account"){
      return navigationAccount;
    } else if (role === "admin"){
      return navigationAdmin;
    } else {
      return navigationGuest;
    }
  }

  useEffect(() => {
    api.get('/userr',{
      headers: {
        Authorization:  `Bearer ${token}`,
      },
    })
    .then(response => {
      setData(response.data.user)
    })
  }, [token])

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={setNav()} // set to setNav() KALO SUDAH FIX!!!!
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
