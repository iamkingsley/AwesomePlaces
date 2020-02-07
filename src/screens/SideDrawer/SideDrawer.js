import React, {Component} from 'react';
import {View, Dimensions, StyleSheet, Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import {connect} from 'react-redux';
import {LOGOUT} from '../../store/actionTypes';

import DrawerItem from './DrawerItem';
import DrawerProfile from './DrawerProfile';

import {
  SETTINGS_SCREEN,
  FIND_PLACE_SCREEN,
  SHARE_PLACE_SCREEN,
} from '../../navigation/Screens';

import Colors from '../../constants/Colors';

class SideDrawer extends Component {
  state = {
    activePage: 'home',
  };

  constructor(props) {
    super(props);
  }

  onSignOut = () => {
    this.props.onLogout();
  };

  onHomeClick() {
    // Navigation.setStackRoot('root', [
    //   {
    //     component: {
    //       id: FIND_PLACE_SCREEN,
    //       name: FIND_PLACE_SCREEN,
    //       options: {
    //         bottomTab: {
    //           text: 'Find a place',
    //           icon: Icon.getImageSource(
    //             Platform.OS === 'android' ? 'md-share-alt' : 'ios-share-alt',
    //             25,
    //             Colors.primary,
    //           ),
    //         },
    //         topBar: {
    //           title: {
    //             text: 'Find a Place',
    //           },
    //           leftButtons: [
    //             {
    //               id: 'sideMenu',
    //               icon: Icon.getImageSource(
    //                 Platform.OS === 'android'
    //                   ? 'md-share-alt'
    //                   : 'ios-share-alt',
    //                 25,
    //                 Colors.primary,
    //               ),
    //             },
    //           ],
    //         },
    //       },
    //     },
    //   },
    //   {
    //     component: {
    //       id: SHARE_PLACE_SCREEN,
    //       name: SHARE_PLACE_SCREEN,
    //       options: {
    //         bottomTab: {
    //           text: 'Share a place',
    //           icon: Icon.getImageSource(
    //             Platform.OS === 'android' ? 'md-search' : 'ios-search',
    //             25,
    //             'white',
    //           ),
    //         },
    //         topBar: {
    //           title: {
    //             text: 'Share a Place',
    //           },
    //           leftButtons: [
    //             {
    //               id: 'sideMenu',
    //               icon: Icon.getImageSource(
    //                 Platform.OS === 'android'
    //                   ? 'md-share-alt'
    //                   : 'ios-share-alt',
    //                 25,
    //                 'white',
    //               ),
    //             },
    //           ],
    //         },
    //       },
    //     },
    //   },
    // ]);

    Navigation.mergeOptions('BottomTabsId', {
      bottomTabs: {
        currentTabIndex: 1,
      },
    });
  }
  onSettingsClick() {
    // Navigation.setStackRoot('root', {
    //   component: {
    //     id: SETTINGS_SCREEN,
    //     name: SETTINGS_SCREEN,
    //     options: {
    //       topBar: {
    //         title: {
    //           text: 'Settings',
    //         },
    //         leftButtons: [
    //           {
    //             id: 'sideMenu',
    //             icon: Icon.getImageSource(
    //               Platform.OS === 'android' ? 'md-menu' : 'ios-menu',
    //               25,
    //               'white',
    //             ),
    //           },
    //         ],
    //       },
    //     },
    //   },
    // });

    // Navigation.mergeOptions('root', {
    //   component: {
    //     name: SETTINGS_SCREEN,
    //   },
    // });

    Navigation.push(this.props.componentId, {
      component: {
        id: SETTINGS_SCREEN,
        name: SETTINGS_SCREEN,
      },
    });
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          {width: Dimensions.get('window').width * 0.8},
        ]}>
        <DrawerProfile size="large" title="BC" email={this.props.email} />

        <DrawerItem
          onPress={this.onHomeClick}
          icon={Platform.OS === 'android' ? 'md-home' : 'ios-home'}
          text="Home"
          active={this.state.activePage === 'home' ? styles.active : null}
        />
        <DrawerItem
          onPress={this.onSettingsClick}
          icon={Platform.OS === 'android' ? 'md-settings' : 'ios-settings'}
          text="Settings"
          active={this.state.activePage === 'settings' ? styles.active : null}
        />
        <DrawerItem
          onPress={this.onSignOut}
          icon={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'}
          text="Sign Out"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  active: {
    backgroundColor: '#999',
  },
  divider: {
    alignSelf: 'center',
    backgroundColor: 'rgba(50,50,50,1)',
    width: '70%',
    marginVertical: 20,
  },
});

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    componentId: state.app.componentId,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch({type: LOGOUT}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideDrawer);
