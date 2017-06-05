import {Navigation} from 'react-native-navigation';

import {registerScreens} from './screens';
import Color from './styles';

registerScreens();

Navigation.startSingleScreenApp({
 screen: {
   screen: 'loading',
   title: undefined
 }
});
