import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./api/auth";
import Layout from "./componants/Layout";

import Login from "./Pages/LoginPage";
import Register from "./Pages/RegisterPage";
import Profile from "./Pages/ProfilePage";
import Home from "./Pages/HomePage";
import CreateEvent from "./Pages/CreateEvent";
import CreateClub from "./Pages/CreateClub";
import EditEvent from "./Pages/EditEvent";
import Clubs from "./Pages/ClubsPage";
import Club from "./Pages/Club";
import Notifications from "./Pages/Notifications";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated() ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated() ? <Navigate to="/" replace /> : <Register />}
        />

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-club" element={<CreateClub />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/clubs/:id" element={<Club />} />
          <Route path="/clubs/:clubId/create-event" element={<CreateEvent />} />
          <Route path="/events/:id/edit" element={<EditEvent />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
