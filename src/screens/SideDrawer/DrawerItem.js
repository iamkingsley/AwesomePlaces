import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';

const item = props => {
  const content = (
    <View style={styles.drawerItem}>
      <Icon
        name={props.icon}
        size={25}
        color={Colors.silva}
        style={styles.drawerItemIcon}
      />
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );

  let container;
  if (Platform.OS === 'android') {
    container = (
      <TouchableNativeFeedback onPress={props.onPress}>
        {content}
      </TouchableNativeFeedback>
    );
  } else {
    container = (
      <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>
    );
  }
  return <View>{container}</View>;
};

const styles = StyleSheet.create({
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 25,
    paddingTop: 12,
    paddingBottom: 12,
  },
  drawerItemIcon: {
    marginRight: 30,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#666',
  },
});

export default item;
