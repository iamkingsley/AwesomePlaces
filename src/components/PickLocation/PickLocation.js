import React, {Component} from 'react';
import {View, StyleSheet, Alert, PermissionsAndroid, Platform } from 'react-native';

import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYmNvZGpvZSIsImEiOiJjanpvb2pvaHMwNGFkM2JuemQwMTcwMm96In0.Y-MRpWsm2lHBVbXiLKkWnQ',
);

class PickLocation extends Component {
  state = {
    zoomLevel: 16,
  };

  componentDidMount() {
    if (Platform.OS === 'android') {
      MapboxGL.requestAndroidLocationPermissions()
        .then((ok) => {
          if (ok) {
            MapboxGL.locationManager.start()
          }
        },(err) => {
          this.requestLocationPermission();
        }
      );
    }
  }

  componentWillUnmount() {
    MapboxGL.locationManager.dispose();
  }

  onUserMarkerPress() {
    Alert.alert('You pressed on the user location annotation');
  }

  requestLocationPermission() {
    try {
      const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'AwesomePlaces Location Permission',
          'message': 'AwesomePlaces wants to access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        alert("You can use the location");
      } else {
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err)
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <MapboxGL.MapView
          ref={c => (this.map = c)}
          zoomLevel={this.state.zoomLevel}
          style={styles.map}>
          
          <MapboxGL.Camera
            followZoomLevel={this.state.zoomLevel}
            followUserLocation={true}
            followUserMode="normal"
            pitch={1}
            followPitch={this.state.zoomLevel}
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
