import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from "react-router-dom";

import { routes } from "./routes";

function App() {

  const token = useSelector((state: any) => state.auth.token)

  return (
    <Routes>
      {routes.map((route, index) => {
        if (!token && route.auth) {
          return (
            <Route
              key="1"
              path="*"
              element={<Navigate to="/login" />}
            />
          )
        } else {
          return (
            <Route path={route.path} element={<route.component />} key={index} />
          )
        }
      })}

    </Routes>
  );
}

export default App;
