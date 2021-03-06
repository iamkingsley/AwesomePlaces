import React, {Component} from 'react';
import {View, Button, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Navigation} from 'react-native-navigation';

import {ADD_PLACE} from '../../store/actionTypes';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import validate from '../../utility/validation';

import {SET_SELECTED_TAB} from '../../store/actionTypes';
class SharePlaceScreen extends Component {
  state = {
    controls: {
      placeName: {
        value: '',
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: true,
        },
      },
      location: {
        value: null,
        valid: false,
      },
      image: {
        value: null,
        valid: false,
      },
    },
  };

  constructor(props) {
    super(props);
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }
  componentDidMount() {
    const {componentId} = this.props;
    Navigation.mergeOptions(componentId, {
      sideMenu: {
        left: {
          visible: false,
        },
      },
    });

    Navigation.events().registerBottomTabSelectedListener(
      ({selectedTabIndex, unselectedTabIndex}) => {
        this.props.selectTab(componentId);
      },
    );
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

  placeNameChangedHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: val,
            valid: validate(val, prevState.controls.placeName.validationRules),
            touched: true,
          },
        },
      };
    });
  };

  locationPickedHandler = location => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          location: {
            value: location,
            valid: true,
          },
        },
      };
    });
  };

  imagePickedHandler = image => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            value: image,
            valid: true,
          },
        },
      };
    });
  };

  placeAddedHandler = () => {
    this.props.onAddPlace(
      this.state.controls.placeName.value,
      this.state.controls.location.value,
      this.state.controls.image.value,
    );
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a Place with us!</HeadingText>
          </MainText>
          <PickImage onImagePicked={this.imagePickedHandler} />
          <PickLocation onLocationPicked={this.locationPickedHandler} />
          <PlaceInput
            placeData={this.state.controls.placeName}
            onChangeText={this.placeNameChangedHandler}
          />
          <View style={styles.button}>
            <Button
              title="Share the Place!"
              onPress={this.placeAddedHandler}
              disabled={
                !this.state.controls.placeName.valid ||
                !this.state.controls.location.valid ||
                !this.state.controls.image.valid
              }
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150,
  },
  button: {
    margin: 8,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, location, image) =>
      dispatch({type: ADD_PLACE, placeName, location, image}),
    selectTab: componentId => dispatch({type: SET_SELECTED_TAB, componentId}),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(SharePlaceScreen);
