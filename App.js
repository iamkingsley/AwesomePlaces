import {Navigation} from 'react-native-navigation';

import {pushAuthScreen} from './src/navigation';

Navigation.events().registerAppLaunchedListener(() => {
  pushAuthScreen();
});
