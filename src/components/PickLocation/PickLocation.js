import React, { Component } from "react";
import {View, Button, StyleSheet, Platform } from "react-native";
import MapboxGL from '@react-native-mapbox-gl/maps';

import Geolocation from '@react-native-community/geolocation';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYmNvZGpvZSIsImEiOiJjanpvb2pvaHMwNGFkM2JuemQwMTcwMm96In0.Y-MRpWsm2lHBVbXiLKkWnQ',
);
 
class PickLocation extends Component {
  state = {
    pointInView: [-73.970895, 40.723279],
    zoomLevel: 16,
  };
  
  componentDidMount() {
    if (Platform.OS === 'android') {
      MapboxGL.requestAndroidLocationPermissions()
        .then((ok) => {
          MapboxGL.locationManager.start();
        }
      );
    }

    Geolocation.watchPosition(position => {
      const coords = position.coords;
      this.setState(prevState => {
        return {
          ...prevState,
          pointInView: [coords.longitude, coords.latitude]
        }
      })
    });
  }
  
  componentWillUnmount() {
    MapboxGL.locationManager.dispose();
    Geolocation.stopObserving();
  }
  
  handleMapPressed = () => {
    Geolocation.getCurrentPosition(position => {
      const coords = position.coords;
      this.setState(prevState => {
        return {
          ...prevState,
          pointInView: [coords.longitude, coords.latitude]
        }
      });
      this.props.onLocationPicked([coords.longitude, coords.latitude]);
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <MapboxGL.MapView 
          ref={c => (this.map = c)} 
          style={styles.map}
          >
        <MapboxGL.Camera
          zoomLevel={this.state.zoomLevel}
          animationMode={'flyTo'}
          animationDuration={3000}
          centerCoordinate={this.state.pointInView}
        />
        </MapboxGL.MapView>
        <View style={styles.button}>
         <Button title="Locate Me" onPress={this.handleMapPressed} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  map: {
    width: "100%",
    height: 250
  },
  button: {
    margin: 8
  }
});

export default PickLocation;
