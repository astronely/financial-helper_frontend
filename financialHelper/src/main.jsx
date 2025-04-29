import React from 'react';
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import App from './App.jsx'
import {ModalProvider} from "@/components/shared/context/ModalContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ModalProvider>
            <App/>
        </ModalProvider>
    </React.StrictMode>,
)