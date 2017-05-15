import {Navigation} from 'react-native-navigation';

import Login from './login';
import Quotes from './quotes';
import SideMenu from './sideMenu';
// import PushedScreen from './PushedScreen';
// import StyledScreen from './StyledScreen';
// import ModalScreen from './ModalScreen';
// import NotificationScreen from './NotificationScreen';
// import LightBoxScreen from './LightBoxScreen';
// import CustomNavBarScreen from './CustomNavBarScreen';
// import CustomNavBar from './CustomNavBar';


// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('login', () => Login);
  Navigation.registerComponent('quotes', () => Quotes);
  Navigation.registerComponent('sideMenu', () => SideMenu);
  // Navigation.registerComponent('example.PushedScreen', () => PushedScreen);
  // Navigation.registerComponent('example.StyledScreen', () => StyledScreen);
  // Navigation.registerComponent('example.ModalScreen', () => ModalScreen);
  // Navigation.registerComponent('example.NotificationScreen', () => NotificationScreen);
  // Navigation.registerComponent('example.LightBoxScreen', () => LightBoxScreen);
  // Navigation.registerComponent('example.CustomNavBarScreen', () => CustomNavBarScreen);
  // Navigation.registerComponent('example.CustomNavBar', () => CustomNavBar);
}
