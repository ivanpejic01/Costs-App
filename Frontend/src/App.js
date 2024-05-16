import "./App.css";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Author from "./components/Author";
import AppDescription from "./components/AppDescription";
import User from "./components/User";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import IncomeForm from "./components/IncomeForm";
import ExpenceForm from "./components/ExpenceForm";
import LoggedOut from "./components/LoggedOut";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/author" element={<Author />} />
          <Route path="/about" element={<AppDescription />} />
          <Route path="/user" element={<User />} />
          <Route path="/incomeForm" element={<IncomeForm />} />
          <Route path="/expenceForm" element={<ExpenceForm />} />
          <Route path="/description" element={<LoggedOut />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
