import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import { connect } from "react-redux";

import Icon from "react-native-vector-icons/Ionicons";
import { deletePlace } from "../../store/actions/index";

import { Navigation } from "react-native-navigation";

class PlaceDetail extends Component {
  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectPlace.key);
    Navigation.pop(this.props.componentId);
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image source={this.props.selectPlace.image} style={styles.placeImage} />
          <Text style={styles.placeName}>{this.props.selectPlace.name}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={this.placeDeletedHandler}>
            <View style={styles.deleteButton}>
              <Icon size={30} name={Platform .OS === "android" ? "md-trash" : "ios-trash"} color="red" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22
  },
  placeImage: {
    width: "100%",
    height: 200
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  deleteButton: {
    alignItems: "center"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: key => dispatch(deletePlace(key))
  };
};

export default connect(null, mapDispatchToProps)(PlaceDetail);