import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './components/IndiaMap.jsx'
import './index.css'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { Provider } from 'react-redux';
import store from './components/store/store.js'; 
import { BrowserRouter } from 'react-router-dom';


delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>          
        <App />
    </Provider>
  </React.StrictMode>,
);
