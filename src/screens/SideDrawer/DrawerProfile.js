import React from 'react';
import {View, Text} from 'react-native';
import {Avatar} from 'react-native-elements';

import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const DrawerProfile = props => {
  const {source, containerStyle} = props;
  const iconProps = source
    ? {source: source}
    : {icon: {name: 'account-circle'}};

  return (
    <View style={[styles.container, containerStyle]}>
      <Avatar
        rounded
        size={props.size}
        title={props.title}
        containerStyle={styles.avatar}
        {...iconProps}
      />
      <Text style={styles.nameText}>
        {/* {props.firstName} {props.lastName} */}
        Bernard Codjoe
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 30,
    marginBottom: 10,
  },
  nameText: {
    fontFamily: 'Dosis-Medium',
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
});
export default DrawerProfile;
