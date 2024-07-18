import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaisList from './components/PaisList';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<PaisList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
