import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import {deletePlace} from '../../store/actions/index';

import {Navigation} from 'react-native-navigation';

class PlaceDetail extends Component {
  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  navigationButtonPressed = ({buttonId}) => {
    if (buttonId === 'delete') {
      this.props.onDeletePlace(this.props.selectPlace.key);
      Navigation.pop(this.props.componentId);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            source={this.props.selectPlace.image}
            style={styles.placeImage}
          />
          <Text style={styles.placeName}>{this.props.selectPlace.name}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  placeImage: {
    width: '100%',
    height: 200,
  },
  placeName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28,
  },
  deleteButton: {
    alignItems: 'center',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: key => dispatch(deletePlace(key)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(PlaceDetail);
