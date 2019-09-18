import {Navigation} from 'react-native-navigation';
import Colors from '../../constants/Colors';

const goToAuthScreen = () => {
  Navigation.setDefaultOptions({
    statusBar: {
      visible: true,
      style: 'light',
      backgroundColor: Colors.statusBar,
      translucent: false,
    },
    topBar: {
      title: {
        fontSize: 19,
        color: 'white',
        fontFamily: 'Open-Sans-Bold',
      },
      background: {
        color: Colors.primary,
      },
      backButton: {
        color: 'white',
      },
    },
    bottomTabs: {
      visible: true,
      animate: true,
      // currentTabId: 'currentTabId',
      // testID: 'bottomTabsTestID',
      drawBehind: true,
      // backgroundColor: 'orange',
    },
    bottomTab: {
      // badge: '2',
      // badgeColor: 'red',
      // dotIndicator: {
      //   color: 'green', // default red
      //   size: 8, // default 6
      //   visible: true, // default false
      // },
      // testID: 'bottomTabTestID',
      // icon: require('tab.png'),
      // iconColor: 'red',
      // textColor: Colors.primary,
      // selectedIconColor: Colors.accent,
      // selectedTextColor: Colors.primary,
      fontFamily: 'Open-Sans-Bold',
      // fontWeight: 'regular', // Available on iOS only, will ignore fontFamily style and use the iOS system fonts instead. Supported weights are: 'regular', 'bold', 'thin', 'ultraLight', 'light', 'medium', 'semibold', 'heavy' and 'black'.
      // fontSize: 10
    },
  });
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'awesome-places.AuthScreen',
              options: {
                topBar: {
                  title: {
                    text: 'Login',
                  },
                },
              },
            },
          },
        ],
      },
    },
  });
};

export default goToAuthScreen;
