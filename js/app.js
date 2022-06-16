import React from 'react'
import ReactDOM from "react-dom";

'use strict';

const App = () => {
    return (
        <div>
            <button className="p-6 bg-blue-600 text-white rounded-sm" onClick={() => alert('hey its me')}>Hey its steve</button>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
