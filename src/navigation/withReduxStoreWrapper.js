import React from 'react';
import {Provider} from 'react-redux';

const withReduxStoreWrapper = (ReduxScreen, reduxStore) => () => props => (
  <Provider store={reduxStore}>
    <ReduxScreen {...props} />
  </Provider>
);

export default withReduxStoreWrapper;
