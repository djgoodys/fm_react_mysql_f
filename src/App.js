import './App.css';
import ListEquipment from './components/ListEquipment.js'
import Tasks from './components/Tasks.jsx'
import TblLogin from './components/TableLogin.jsx'
import NavButtons from './components/Navbuttons.jsx'
import Admin from './components/Admin.jsx'
import Filters from './components/Filters.jsx'
import FilterTypes from './components/FilterTypes.jsx'
import Print from './components/Print.jsx'
import About from './components/About.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router  future={{
          v7_startTransition: true,
        }}>
          <Routes>
          <Route path="/navbar" element={<NavButtons />} />
          
            <Route path="/fmreactpythonmysql/" element={<><NavButtons /><ListEquipment /></>} />
            <Route path="/" element={<TblLogin />} />
            <Route path="/list_equipment" element={<><NavButtons /><ListEquipment /></>} />
            <Route path="/tasks" element={<><NavButtons /><Tasks /></>} />
            <Route path="/admin" element={<><NavButtons /><Admin /></>} />
            <Route path="/filters" element={<><NavButtons /><Filters /></>} />
            <Route path="/print" element={<><NavButtons /><Print /></>} />
            <Route path="/filter-types" element={<><NavButtons /><FilterTypes /></>} />
            <Route path="/about" element={<><NavButtons /><About /></>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
