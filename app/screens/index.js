import {Navigation} from 'react-native-navigation';

import Login from './login';
import Quotes from './quotes';
import SideMenu from './sideMenu';
import AddQuote from './addQuote';
import FilterQuotes from './filterQuotes';
// import PushedScreen from './PushedScreen';
// import StyledScreen from './StyledScreen';
// import NotificationScreen from './NotificationScreen';
// import CustomNavBarScreen from './CustomNavBarScreen';
// import CustomNavBar from './CustomNavBar';


// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('login', () => Login);
  Navigation.registerComponent('quotes', () => Quotes);
  Navigation.registerComponent('sideMenu', () => SideMenu);
  Navigation.registerComponent('addQuote', () => AddQuote);
  Navigation.registerComponent('filterQuotes', () => FilterQuotes);
  // Navigation.registerComponent('example.PushedScreen', () => PushedScreen);
  // Navigation.registerComponent('example.StyledScreen', () => StyledScreen);
  // Navigation.registerComponent('example.NotificationScreen', () => NotificationScreen);
  // Navigation.registerComponent('example.CustomNavBarScreen', () => CustomNavBarScreen);
  // Navigation.registerComponent('example.CustomNavBar', () => CustomNavBar);
}
