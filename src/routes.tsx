import React from 'react';
import { Icon } from '@chakra-ui/react';
import { MdPerson, MdHome, MdLock, MdBook } from 'react-icons/md';
import MainDashboard from 'views/admin/default';
import NFTMarketplace from 'views/admin/marketplace';
import Profile from 'views/admin/profile';
import DataTables from 'views/admin/dataTables';
import Logout from 'components/Logout';
import SignInCentered from 'views/auth/signIn/index';
import home from 'home';
import PrivateRoute from './PrivateRoute'; // Import the PrivateRoute component

const routes = [
  {
    name: 'Dashboard',
    layout: '/admin',
    path: '/Dashboard',
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard
  },
  {
    name: 'Students Data',
    layout: '/admin',
    path: '/Students-data',
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: NFTMarketplace,
    secondary: true
  },
  {
    name: 'Consultant Data',
    layout: '/admin',
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    path: '/Consultant-data',
    component: DataTables
  },
  {
    name: 'Marksheet',
    layout: '/admin',
    icon: <Icon as={MdBook} width='20px' height='20px' color='inherit' />,
    path: '/Marksheet',
    component: DataTables
  },
  {
    name: 'GetAllMarksheets',
    layout: '/admin',
    icon: <Icon as={MdBook} width='20px' height='20px' color='inherit' />,
    path: '/GetAllMarksheets',
    component: DataTables
  },
  {
    name: 'AddEducation',
    layout: '/AddEducation',
    icon: <Icon as={MdBook} width='20px' height='20px' color='inherit' />,
    path: '/AddEducation',
    component: DataTables
  },
  // {
  //   name: 'AddSubjects',
  //   layout: '/AddSubjects',
  //   icon: <Icon as={MdBook} width='20px' height='20px' color='inherit' />,
  //   path: '/AddSubjects',
  //   component: DataTables
  // },
  {
    name: 'Certificate',
    layout: '/Certificate',
    icon: <Icon as={MdBook} width='20px' height='20px' color='inherit' />,
    path: '/Certificate',
    component: DataTables
  },
  {
    name: 'GetAllCertificate',
    layout: '/GetAllCertificate',
    icon: <Icon as={MdBook} width='20px' height='20px' color='inherit' />,
    path: '/GetAllCertificate',
    component: DataTables
  },
  {
    name: 'Logout',
    layout: '/Logout',
    path: '/Logout',
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: home
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered
  },
];

export default routes;
