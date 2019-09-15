import {Navigation} from 'react-native-navigation';
import Colors from '../../constants/Colors';

const goToAuthScreen = () => {
  Navigation.setDefaultOptions({
    topBar: {
      title: {
        fontSize: 19,
        color: 'white',
        fontFamily: 'Open-Sans-Bold',
      },
      background: {
        color: Colors.primary,
      },
      backButton: {
        color: 'white',
      },
    },
  });
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'awesome-places.AuthScreen',
              options: {
                topBar: {
                  title: {
                    text: 'Login',
                  },
                },
              },
            },
          },
        ],
      },
    },
  });
};

export default goToAuthScreen;
