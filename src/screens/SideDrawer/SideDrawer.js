import React, {Component} from 'react';
import {View, Dimensions, StyleSheet, Platform} from 'react-native';

import goToAuthScreen from '../GoToAuthScreen/goToAuthScreen';
import DrawerItem from './DrawerItem';
import DrawerProfile from './DrawerProfile';

class SideDrawer extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    activeTabIndex: 0,
  };

  onSignOut = () => {
    goToAuthScreen();
  };

  render() {
    const {index, profileInfo} = this.props;
    const {...rest} = profileInfo;
    return (
      <View
        style={[
          styles.container,
          {width: Dimensions.get('window').width * 0.8},
        ]}>
        <DrawerProfile size="large" title="BC" {...rest} />

        <DrawerItem
          onPress={this.onSignOut}
          icon={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'}
          text="Sign Out"
          isActive={this.state.activeTabIndex === index}
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
  navigationContainer: {
    marginBottom: 30,
  },
  divider: {
    alignSelf: 'center',
    backgroundColor: 'rgba(50,50,50,1)',
    width: '70%',
    marginVertical: 20,
  },
});

export default SideDrawer;
