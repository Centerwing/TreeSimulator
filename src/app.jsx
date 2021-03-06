import React from 'react';
import { BrowserRouter, Miss } from 'react-router';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import EditorRoute from './modules/editor/routes';
import ViewerRoute from './modules/viewer/routes';
import PageNotFound from './components/PageNotFound';

type Props = {
  store: Object,
}

const App = ({ store } : Props) => {
    const layout = (
        <div>
            <EditorRoute />
            <ViewerRoute />
            <Miss component={PageNotFound} />
        </div>
    );

    return (
        <MuiThemeProvider>
            <Provider store={store}>
                <BrowserRouter>
                    {layout}
                </BrowserRouter>
            </Provider>
        </MuiThemeProvider>
    );
};

export default App;
