import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Platform,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import imagePlaceholder from '../../assets/beautiful-place.jpg';
import ImagePicker from 'react-native-image-picker';

class PickImage extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    pickedImage: imagePlaceholder,
    options: {
      title: 'Pick an Image',
      storageOptions: {
        // storageOptions is Optional
        skipBackup: true,
        path: 'images',
      },
    },
  };

  pickImageHandler = () => {
    ImagePicker.showImagePicker(this.state.options, response => {
      if (response.didCancel) {
        alert('User cancelled!');
      } else if (response.error) {
        alert('Error: ', response.error);
      } else {
        this.setState(prevState => {
          return {
            ...prevState,
            pickedImage: {uri: response.uri},
          };
        });
        this.props.onImagePicked(this.state.pickedImage);
      }
    });
  };

  render() {
    return (
      <ImageBackground
        source={this.state.pickedImage}
        style={styles.backgroundImage}>
        <TouchableOpacity onPress={this.pickImageHandler}>
          <View style={styles.button}>
            <Icon
              size={50}
              name={Platform.OS === 'android' ? 'md-camera' : 'ios-camera'}
              color="#aaa"
            />
          </View>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: 200,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: '3%',
  },
});

export default PickImage;
