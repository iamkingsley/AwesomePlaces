import React, {Component} from 'react';
import {View, Dimensions, StyleSheet, Platform} from 'react-native';

import goToAuthScreen from '../GoToAuthScreen/goToAuthScreen';
import DrawerItem from './DrawerItem';

class SideDrawer extends Component {
  onSignOut = () => {
    goToAuthScreen();
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          {width: Dimensions.get('window').width * 0.8},
        ]}>
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
});

export default SideDrawer;
