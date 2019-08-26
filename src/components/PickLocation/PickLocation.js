import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';

import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYmNvZGpvZSIsImEiOiJjanpvb2pvaHMwNGFkM2JuemQwMTcwMm96In0.Y-MRpWsm2lHBVbXiLKkWnQ',
);

class PickLocation extends Component {
  state = {
    zoomLevel: 16,
  };

  componentDidMount() {
    MapboxGL.locationManager.start();
  }

  componentWillUnmount() {
    MapboxGL.locationManager.dispose();
  }

  onUserMarkerPress() {
    Alert.alert('You pressed on the user location annotation');
  }

  render() {
    return (
      <View style={styles.container}>
        <MapboxGL.MapView
          ref={c => (this.map = c)}
          showUserLocation={true}
          zoomLevel={this.state.zoomLevel}
          style={styles.map}>
          <MapboxGL.Camera
            followZoomLevel={this.state.zoomLevel}
            followUserLocation={true}
            followUserMode="normal"
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
