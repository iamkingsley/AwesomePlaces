{/* 
  state ={
    featureCollection : {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "point",
            "coordinates": [                    
              [77.22773,28.613058]
            ]
          },
        }
      ]
    },
  }
  
  <MapboxGL.MapView ref={mapRef} onDidFinishLoadingMap={onMapReady} showUserLocation={true} style={styles.map} onPress={this._onMapPress}>
            <MapboxGL.Images images={images} />
            <MapboxGL.Camera zoomLevel={14} centerCoordinate={centerCoordinate} />
            <MapboxGL.ShapeSource id={'markers'} shape={this.state.featureCollection} onPress={this._onMarkerPress} width={20} height={20}>
              <MapboxGL.SymbolLayer id="SymbolLayer" style={iconStyle} width={20} height={20} />
            </MapboxGL.ShapeSource>
          </MapboxGL.MapView>

  _onMapPress = e => {
    const featureOptions = {}
    const feature = MapboxGL.geoUtils.makeFeature(e.geometry, featureOptions)
    feature.id = `${Date.now()}`
    const featureCollection = _.cloneDeep(MapboxGL.geoUtils.addToFeatureCollection(this.state.featureCollection, feature))
    this.setState({ featureCollection })
  }

const images = {
  pin: require('../../../assets/images/map/marker_pin.png'),
  question: require('../../../assets/images/map/marker_question.png')
}

const iconStyle = {
  iconImage: images.question,
  iconAllowOverlap: true
} */}
