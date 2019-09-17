import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';

import {deletePlace} from '../../store/actions/index';

import {Navigation} from 'react-native-navigation';

import MapboxGL from '@react-native-mapbox-gl/maps';
MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYmNvZGpvZSIsImEiOiJjanpvb2pvaHMwNGFkM2JuemQwMTcwMm96In0.Y-MRpWsm2lHBVbXiLKkWnQ',
);

class PlaceDetail extends Component {
  state = {
    viewMode: 'portrait',
    zoomLevel: 16,
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateStyles);
  }

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    MapboxGL.requestAndroidLocationPermissions().then(ok => {
      MapboxGL.locationManager.start();
    });
  }

  navigationButtonPressed = ({buttonId}) => {
    switch (buttonId) {
      case 'delete': {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        Navigation.pop(this.props.componentId);
        break;
      }
      case 'backPress': {
        this.handleBackPress();
        break;
      }
    }
  };

  handleBackPress = () => {
    Navigation.pop(this.props.componentId); // Go back if required
    return true; // Stop app from closing
  };

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles);
    MapboxGL.locationManager.dispose();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape',
    });
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          this.state.viewMode === 'portrait'
            ? styles.portraitContainer
            : styles.landscapeContainer,
        ]}>
        <View style={styles.placeDetailContainer}>
          <View style={styles.subContainer}>
            <Image
              source={this.props.selectedPlace.image}
              style={styles.placeImage}
            />
          </View>
          <View style={styles.subContainer}>
            <MapboxGL.MapView
              style={styles.map}
              zoomLevel={this.state.zoomLevel}>
              <MapboxGL.Camera
                zoomLevel={this.state.zoomLevel}
                centerCoordinate={this.props.selectedPlace.location}
              />
            </MapboxGL.MapView>
          </View>
        </View>
        <View style={styles.subContainer}>
          <View>
            <Text style={styles.placeName}>
              {this.props.selectedPlace.name}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 12,
    flex: 1,
  },
  portraitContainer: {
    flexDirection: 'column',
  },
  landscapeContainer: {
    flexDirection: 'row',
  },
  placeDetailContainer: {
    flex: 2,
  },
  placeImage: {
    width: '100%',
    height: '100%',
  },
  placeName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  subContainer: {
    flex: 1,
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
