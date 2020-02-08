import React, {Component} from 'react';
import {View, Dimensions, StyleSheet, Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';

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
    activeComponentId: null,
  };

  constructor(props) {
    super(props);
    // Listen for Tab switch
    Navigation.events().registerComponentDidAppearListener(({componentId}) => {
      // only spy on tabs, we don't need other screens
      if (
        componentId === FIND_PLACE_SCREEN ||
        componentId === SHARE_PLACE_SCREEN
      ) {
        this.setState({
          activeComponentId: componentId,
        });
      }
    });
  }

  onSignOut = () => {
    this.props.onLogout();
  };

  onHomeClick = () => {
    Navigation.mergeOptions('BottomTabsId', {
      bottomTabs: {
        currentTabIndex: 0,
      },
    });
  };
  onSettingsClick = () => {
    Navigation.push(this.state.activeComponentId, {
      component: {
        id: SETTINGS_SCREEN,
        name: SETTINGS_SCREEN,
        options: {
          topBar: {
            title: {
              text: 'Settings',
            },
          },
        },
      },
    });
  };

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
          active={
            this.state.activeComponentId === FIND_PLACE_SCREEN ||
            this.state.activeComponentId === SHARE_PLACE_SCREEN
              ? styles.active
              : null
          }
        />
        <DrawerItem
          onPress={this.onSettingsClick}
          icon={Platform.OS === 'android' ? 'md-settings' : 'ios-settings'}
          text="Settings"
          active={null}
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
    color: Colors.primary,
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
