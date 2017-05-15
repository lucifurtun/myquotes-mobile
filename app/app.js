import {Navigation} from 'react-native-navigation';

import {registerScreens} from './screens';
import Color from './styles';

registerScreens();

Navigation.startSingleScreenApp({
 screen: {
   screen: 'login',
   title: undefined,
   navigatorStyle: {
  //    navBarBackgroundColor: '#4dbce9',
     navBarTextColor: Color.primary
  //    navBarSubtitleTextColor: '#ff0000',
  //    navBarButtonColor: '#ffffff',
  //    statusBarTextColorScheme: 'light'
   }
 // },
 // drawer: {
 //   left: {
 //     screen: 'example.SideMenu'
 //   }
 }
});
