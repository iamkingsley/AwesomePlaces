import React, {Component} from 'react';
import {View, Image, Button, StyleSheet} from 'react-native';

import imagePlaceholder from '../../../src/assets/beautiful-place.jpg';
import ImagePicker from 'react-native-image-picker';

class PickImage extends Component {
  state = {
    avatarSource: imagePlaceholder,
    options: {
      title: 'Choose a Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    },
  };

  pickImageHandler = () => {
    ImagePicker.showImagePicker(this.state.options, response => {
      if (response.didCancel) {
        alert('User cancelled image picker');
      } else if (response.error) {
        alert('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};
        this.setState(prevState => {
          return {
            ...prevState,
            avatarSource: source,
          };
        });
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={this.state.avatarSource} style={styles.previewImage} />
        </View>
        <View style={styles.button}>
          <Button title="Pick Image" onPress={this.pickImageHandler} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
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

export default PickImage;
