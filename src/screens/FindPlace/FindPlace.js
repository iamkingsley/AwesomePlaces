import {Navigation} from 'react-native-navigation';

import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import PlaceList from '../../components/PlaceList/PlaceList';

class FindPlaceScreen extends Component {
  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  navigationButtonPressed = ({buttonId}) => {
    const {componentId} = this.props;

    if (buttonId === 'sideMenu') {
      Navigation.mergeOptions(componentId, {
        sideMenu: {
          left: {
            visible: true,
          },
        },
      });
    }
  };

  state = {
    placesLoaded: false,
    removeAnim: new Animated.Value(1),
    placesAnim: new Animated.Value(0),
  };

  placesLoadedHandler = () => {
    Animated.timing(this.state.placesAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  placesSearchHandler = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      this.setState({
        placesLoaded: true,
      });
      this.placesLoadedHandler();
    });
  };

  itemSelectedHandler = key => {
    const selPlace = this.props.places.find(place => {
      return place.key === key;
    });

    Promise.all([
      Icon.getImageSource(
        Platform.OS === 'android' ? 'md-trash' : 'ios-trash',
        25,
        'white',
      ),
      Icon.getImageSource(
        Platform.OS === 'android' ? 'md-arrow-round-back' : 'ios-arrow-back',
        25,
        'white',
      ),
    ]).then(icon => {
      Navigation.push(this.props.componentId, {
        component: {
          name: 'awesome-places.PlaceDetailScreen',
          passProps: {
            selectedPlace: selPlace,
          },
          options: {
            topBar: {
              title: {
                text: selPlace.name,
              },
              leftButtons: [
                {
                  id: 'backPress',
                  icon: icon[1],
                },
              ],
              rightButtons: [
                {
                  id: 'delete',
                  icon: icon[0],
                },
              ],
            },
          },
        },
      });
    });
  };

  render() {
    let content = (
      <Animated.View
        style={{
          opacity: this.state.removeAnim,
          transform: [
            {
              scale: this.state.removeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 1],
              }),
            },
          ],
        }}>
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Find Places</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
    if (this.state.placesLoaded) {
      content = (
        <Animated.View
          style={{
            opacity: this.state.placesAnim,
          }}>
          <PlaceList
            places={this.props.places}
            onItemSelected={this.itemSelectedHandler}
          />
        </Animated.View>
      );
    }
    return (
      <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButton: {
    borderColor: 'orange',
    borderWidth: 3,
    borderRadius: 50,
    padding: 20,
  },
  searchButtonText: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 26,
  },
});

const mapStateToProps = state => {
  return {
    places: state.places.places,
  };
};

export default connect(mapStateToProps)(FindPlaceScreen);
