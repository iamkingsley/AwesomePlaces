import React, { Component } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';

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
       storageOptions: { // storageOptions is Optional
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
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImage} style={styles.previewImage} />
        </View>
        <View style={styles.button}>
          <Button title='Pick Image' onPress={this.pickImageHandler} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    placeholder: {
      borderWidth: 1,
      borderColor: 'black',
      backgroundColor: '#eee',
      width: '80%',
      height: 150
    },
    button: {
      margin: 8
    },
    previewImage: {
        width: '100%',
        height: '100%'
    }
  });

export default PickImage;
