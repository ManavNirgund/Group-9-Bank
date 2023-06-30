import "./App.css";
import Header from "./Components/Header/Header";
import Signin from "./Screens/Signin/Signin";
import Register from "./Screens/Signup/Register";
import LandingPage from "./Screens/LandingPage/LandingPage";
import Loan from "./Screens/Loan/Loan";

import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "./Components/Service/utilities/RequireAuth";
import Products from "./Screens/Products/Products";
import { AuthProvider } from "./Components/Service/utilities/auth";
import Transaction from "./Screens/Transaction/Transaction";
import CreditCard from "./Screens/CreditCard/CreditCard";
import GiftCard from "./Screens/GiftCard/GiftCard";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />

        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route
            path="/products"
            element={
              <RequireAuth>
                <Products />
              </RequireAuth>
            }
          />
          <Route
            path="/transaction"
            element={
              <RequireAuth>
                <Transaction />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/loan"
            element={
                <Loan />
              // <RequireAuth>
              // </RequireAuth>
            }
          ></Route>
          <Route
            path="/credit"
            element={
              <RequireAuth>
                <CreditCard />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/gift"
            element={
              <RequireAuth>
                <GiftCard />
              </RequireAuth>
            }
          ></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
