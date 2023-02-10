import React from 'react'

// importing Dashboard component
// const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// const DashboardCharts = React.lazy(() => import('./views/widgets/Charts'))

// Importing Typography component 

const Reports = React.lazy(() => import('./views/reports/Reports'))
const Tokens = React.lazy(() => import('./views/tokens/Tokens'))
const Polka = React.lazy(() => import('./views/tokens/Polka'))
const CreateToken = React.lazy(() => import('./views/tokens/CreateToken'))
const EditToken = React.lazy(() => import('./views/tokens/EditToken'))
const TokenDetails = React.lazy(() => import('./views/tokens/TokenDetail'))
const NewsLetter = React.lazy(() => import('./views/newsletter/NewsLetter'))
const ReportDetails = React.lazy(() => import('./views/reports/ReportDetail'))
const Users = React.lazy(() => import('./views/users/Users'))
const UsersApiKeys = React.lazy(() => import('./views/users/UsersApiKeys'))
const Systemusers = React.lazy(() => import('./views/users/Systemusers'))
const EditSystemUser = React.lazy(() => import('./views/users/EditSystemUser'))
const NewSystemUser = React.lazy(() => import('./views/users/NewSystemUser'))


// Forms
const Layout = React.lazy(() => import('./views/forms/Layout'))
const Settings = React.lazy(() => import('./views/forms/Settings'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  // { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // { path: '/dashboard/details', name: 'Dashboard', element: DashboardCharts },
  { path: '/users', name: 'Users', element: Users },
  { path: '/users-apikeys', name: 'UsersApiKeys', element: UsersApiKeys },
  { path: '/system-users', name: 'System Users', element: Systemusers },
  { path: '/system-users/edit', name: 'Edit System Users', element: EditSystemUser },
  { path: '/system-users/create', name: 'New System Users', element: NewSystemUser },
  { path: '/users/add-user', name: 'Add Users', element: Layout },
  { path: '/users/view-user', name: 'Edit Users', element: Layout },
  { path: '/newsletters', name: 'NewsLetter', element: NewsLetter },
  // { path: '/orders', name: 'Orders', element: Orders, exact: true },
  { path: '/crypto-tokens', name: 'All Tokens', element: Tokens },
  { path: '/polka-tokens', name: 'All Polka', element: Polka },
  { path: '/crypto-token/create', name: 'Create Token', element: CreateToken },
  { path: '/crypto-token/view', name: 'Create Token', element: TokenDetails },
  { path: '/crypto-token/edit', name: 'Create Token', element: EditToken },
  { path: '/reports', name: 'All Reports', element: Reports },
  { path: '/reports/report-details', name: 'Report Details', element: ReportDetails },
  // { path: '/orders/order-details', name: 'Total Orders', element: OrderDetails },
  // { path: '/transactions/transaction-details', name: 'Transaction Details', element: TransactionDetail },
  // { path: '/orders/orders-completed', name: 'Completed Orders ', element: Tables, exact: true },
  // { path: '/orders/orders-pending', name: 'Pending Orders', element: Tables, exact: true },
  // { path: '/support', name: 'Support', element: Support, exact: true },
  // { path: '/support', name: 'Support Tickets', element: Support },
  { path: '/setting', name: 'Settings', element: Settings },
  // { path: '/transactions', name: 'Transactions', element: Transactions },
  // { path: '/support/support-details', name: 'Support Tickets', element: SupportDetail },
]

export default routes
