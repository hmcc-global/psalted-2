import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import MainContainer from './components/MainContainer';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <>
            <MainContainer />
          </>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
