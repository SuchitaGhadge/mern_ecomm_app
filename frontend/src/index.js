import React from 'react';
import ReactDOM from 'react-dom/client';
import AllRoutes from './AllRoutes';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AllRoutes />
    </React.StrictMode>
)
// ReactDOM.render(<AllRoutes />, document.getElementById("root"))