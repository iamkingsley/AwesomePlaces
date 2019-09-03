import React, {Component} from 'react';
import {View, StyleSheet, Alert, Platform} from 'react-native';

import MapboxGL from '@react-native-mapbox-gl/maps';
import Geolocation from '@react-native-community/geolocation';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYmNvZGpvZSIsImEiOiJjanpvb2pvaHMwNGFkM2JuemQwMTcwMm96In0.Y-MRpWsm2lHBVbXiLKkWnQ',
);

class PickLocation extends Component {
  state = {
    centerCoordinate: [-115.1398296, 36.1699412],
    zoomLevel: 16,
  };

  componentDidMount() {
    if (Platform.OS === 'android') {
      MapboxGL.requestAndroidLocationPermissions();
    }
  }

  componentWillUnmount() {
    MapboxGL.locationManager.dispose();
  }

  onUserMarkerPress() {
    Alert.alert('You pressed on the user location annotation');
  }

  getCurrentLocation = () => {
    Geolocation.getCurrentPosition(pos => {
      this.setState(prevState => {
        return {
          ...prevState,
          centerCoordinate: [pos.coords.longitude, pos.coords.latitude],
        };
      });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <MapboxGL.MapView
          ref={c => (this.map = c)}
          onPress={this.getCurrentLocation}
          zoomLevel={this.state.zoomLevel}
          style={styles.map}>
          <MapboxGL.Camera
            zoomLevel={this.state.zoomLevel}
            // followUserLocation={true}
            // followUserMode="normal"
            centerCoordinate={this.state.centerCoordinate}
          />
          <MapboxGL.UserLocation onPress={this.onUserMarkerPress} />
        </MapboxGL.MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: 250,
  },
  button: {
    margin: 8,
  },
});

export default PickLocation;
