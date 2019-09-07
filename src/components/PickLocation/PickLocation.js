import React, { Component } from "react";
import {StyleSheet, Platform } from "react-native";
import MapboxGL from '@react-native-mapbox-gl/maps';

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
  }
  
  componentWillUnmount() {
    MapboxGL.locationManager.dispose();
  }
  
  render() {
    return (
      <MapboxGL.MapView 
        ref={c => (this.map = c)} 
        style={styles.map}
        >
       <MapboxGL.Camera
         zoomLevel={this.state.zoomLevel}
         centerCoordinate={this.state.pointInView}
       />
      </MapboxGL.MapView>
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
