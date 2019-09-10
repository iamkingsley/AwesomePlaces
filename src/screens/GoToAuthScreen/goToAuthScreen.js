import {Navigation} from 'react-native-navigation';

const goToAuthScreen = () => {
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
