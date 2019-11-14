// @flow

import {Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

import {
  AUTH_SCREEN,
  SIDE_DRAWER,
  FIND_PLACE_SCREEN,
  SHARE_PLACE_SCREEN,
} from './Screens';
import registerScreens from './registerScreens';

// Register all screens on launch
registerScreens();

export const pushTabScreen = () => {
  Promise.all([
    Icon.getImageSource(
      Platform.OS === 'android' ? 'md-search' : 'ios-search',
      25,
      Colors.primary,
    ),
    Icon.getImageSource(
      Platform.OS === 'android' ? 'md-share-alt' : 'ios-share-alt',
      25,
      Colors.primary,
    ),
    Icon.getImageSource(
      Platform.OS === 'android' ? 'md-menu' : 'ios-menu',
      25,
      'white',
    ),
  ]).then(sources => {
    Navigation.setRoot({
      root: {
        sideMenu: {
          id: 'sideMenu',
          left: {
            component: {
              id: 'SideDrawer',
              name: SIDE_DRAWER,
            },
          },
          center: {
            stack: {
              children: [
                {
                  bottomTabs: {
                    children: [
                      {
                        stack: {
                          children: [
                            {
                              component: {
                                name: FIND_PLACE_SCREEN,
                                options: {
                                  bottomTab: {
                                    text: 'Find a place',
                                    icon: sources[0],
                                  },
                                  topBar: {
                                    title: {
                                      text: 'Find a Place',
                                    },
                                    leftButtons: [
                                      {
                                        id: 'sideMenu',
                                        icon: sources[2],
                                      },
                                    ],
                                  },
                                },
                              },
                            },
                          ],
                        },
                      },
                      {
                        stack: {
                          children: [
                            {
                              component: {
                                name: SHARE_PLACE_SCREEN,
                                options: {
                                  bottomTab: {
                                    text: 'Share a place',
                                    icon: sources[1],
                                  },
                                  topBar: {
                                    title: {
                                      text: 'Share a Place',
                                    },
                                    leftButtons: [
                                      {
                                        id: 'sideMenu',
                                        icon: sources[2],
                                      },
                                    ],
                                  },
                                },
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      },
    });
  });
};

export const pushAuthScreen = () => {
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
              name: AUTH_SCREEN,
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
