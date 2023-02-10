import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  // cilBell,
  // cilCalculator,
  // cilChartPie,
  // cilCursor,
  cilDescription,
  // cilDrop,
  // cilNotes,
  // cilPencil,
  // cilPuzzle,
  cilUser,
  cilSettings,
  // cilSpeedometer,
  cilStar,
  // cilLink
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  // {
  //   component: CNavItem,
  //   name: 'Dashboard',
  //   to: '/dashboard',
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,


  // },
  {
    component: CNavItem,
    name: 'Users',
    icon: <CIcon icon={cilUser} className="me-2" />,
    to: '/users',
  },
  {
    component: CNavItem,
    name: 'Users Api Tokens',
    icon: <CIcon icon={cilUser} className="me-2" />,
    to: '/users-apikeys',
  },
  {
    component: CNavItem,
    name: 'System Users',
    icon: <CIcon icon={cilUser} className="me-2" />,
    to: '/system-users',
  },

  {
    component: CNavItem,
    name: 'Crypto Tokens',
    icon: <CIcon icon={cilDescription} className="me-2" />,
    to: '/crypto-tokens',
  },
  {
    component: CNavItem,
    name: 'Polka Tokens',
    icon: <CIcon icon={cilDescription} className="me-2" />,
    to: '/polka-tokens',
  },
  {
    component: CNavItem,
    name: 'Reports',
    icon: <CIcon icon={cilDescription} className="me-2" />,
    to: '/reports',
  },
  {
    component: CNavItem,
    name: 'News Letter',
    icon: <CIcon icon={cilStar} className="me-2" />,
    to: '/newsletters',
  },
  {
    component: CNavItem,
    name: 'Settings',
    icon: <CIcon icon={cilSettings} className="me-2" />,
    to: '/setting',
  },



]

export default _nav
