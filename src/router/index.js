import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AdminPage from '@/components/admin/AdminPage'
import Register from '@/components/RegisterComponent'
import Login from '@/components/LoginComponent'
import Update from '@/components/EditProfile'
import Forgot from '@/components/ForgotPassword'
import AddEvent from '@/components/company/AddEvent'
import EditEvent from '@/components/company/EditEvent'
import AddService from '@/components/company/AddService'
import EditService from '@/components/company/EditService'
import Users from '@/components/company/Users'
import Pages from '@/components/company/EditPages'
import About from '@/components/AboutUs'
import Booking from '@/components/BookingPage'
import ViewBooking from '@/components/ViewBooking'
import BookingQueries from '@/components/BookingQueries'
import Dashboard from '@/components/admin/AdminDashboard'
import Search from '@/components/admin/SearchComponent'
import New from '@/components/admin/Dashboard/NewBookings'
import Cancelled from '@/components/admin/Dashboard/CancelledBookoings'
import Approved from '@/components/admin/Dashboard/ApprovedBookings'
import Unread from '@/components/admin/Dashboard/UnreadBookings'
import Read from '@/components/admin/Dashboard/ReadBookings'
import BookingPage from '@/components/admin/Dashboard/Booking'
import ResetPassword from '@/components/admin/ResetPasswordForm'
import ContactUs from '@/components/admin/ContactUsQueries'
import Reports from '@/components/admin/Dashboard/Reports'
import Error from '@/components/UnknownPage'
import ChangePsw from '@/components/ChangePassword'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'HelloWorld', component: HelloWorld},
    {path: '/admin', name: 'AdminPage', component: AdminPage,meta: { requiresAuth: true }},
    {path: '/register', name: 'Register', component: Register, meta: { requiresAuth: false }},
    {path: '/login', name: 'Login', component: Login, meta:{requiresAuth: false}},
    {path: '/update', name: 'Update', component: Update, meta: { requiresAuth: true }},
    {path: '/change-password', name: 'ChangePsw', component: ChangePsw, meta: { requiresAuth: true }},
    {path: '/forgot', name: 'Forgot', component: Forgot, meta: { requiresAuth: false }},
    {path: '/add-event', name: 'AddEvent', component: AddEvent,meta: { requiresAuth: true}},
    {path: '/edit-event', name: 'EditEvent', component: EditEvent,meta: { requiresAuth: true, AdminCheck:true  }},
    {path: '/services', name: 'AddService', component: AddService,meta: { requiresAuth: true }},
    {path: '/edit-service', name: 'EditService', component: EditService,meta: { requiresAuth: true, AdminCheck:true  }},
    {path: '/users', name: 'Users', component: Users,meta: { requiresAuth: true, AdminCheck:true }},
    {path: '/edit-pages', name: 'Pages', component: Pages,meta: { requiresAuth: true, AdminCheck:true }},
    {path: '/booking', name: 'Booking', component: Booking,meta: { requiresAuth: true }},
    {path: '/view-bookings', name: 'ViewBooking', component: ViewBooking,meta: { requiresAuth: true }},
    {path: '/queries', name: 'BookingQueries', component: BookingQueries,meta: { requiresAuth: true, AdminCheck:true }},
    {path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true}},
    {path: '/search', name: 'Search', component: Search,meta: { requiresAuth: true, AdminCheck:true }},
    {path: '/about', name: 'About', component: About},
    {path: '/new', name: 'New', component: New,meta: { requiresAuth: true , AdminCheck:true}},
    {path: '/cancelled', name: 'Cancelled', component: Cancelled,meta: { requiresAuth: true, AdminCheck:true }},
    {path: '/approved', name: 'Approved', component: Approved,meta: { requiresAuth: true, AdminCheck:true }},
    {path: '/unread', name: 'Unread', component: Unread, meta: { requiresAuth: true, AdminCheck:true }},
    {path: '/read', name: 'Read', component: Read, meta: { requiresAuth: true, AdminCheck:true }},
    {path: '/reset-password', name: 'ResetPassword', component: ResetPassword,meta: { requiresAuth: false }},
    {path: '/bookings', name: 'BookingPage', component: BookingPage,meta: { requiresAuth: true, AdminCheck:true }},
    {path: '/contact-us-queries', name: 'ContactUs', component: ContactUs,meta: { requiresAuth: true, AdminCheck:true }},
    {path: '/reports', name: 'Reports', component: Reports,meta: { requiresAuth: true, AdminCheck:true }},
    {path: '/error', name: 'Error', component: Error},
  ]
})





router.beforeEach((to, from,  next)=>{
  const authuser = localStorage.getItem('access_token')
  if (to.meta.requiresAuth   && !authuser ) next({ name: 'Error' })
  else next()
})

router.beforeEach((to, from,  next)=>{
  const authuser = localStorage.getItem('access_token')
  if (to.meta.requiresAuth===false  && authuser ) next({ name: 'Error' })
  else next()

}),
  router.beforeEach((to, from,  next)=>{
    const admin = localStorage.getItem('role')
    if (to.meta.AdminCheck && admin !=='admin') next({ name: 'Error' })
  else next()

})


export default router;
