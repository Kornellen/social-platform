import { Route, Routes } from "react-router-dom";
import {
  Dashboard,
  Home,
  Login,
  Register,
  User,
  Post,
  Community,
  UnderConstrucionPage,
  NotFound,
} from "../pages";

export default function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/community">
        <Route index element={<Community />} />
        <Route path="user/:userId" element={<User />} />
        <Route path="post/:postId" element={<Post />} />
      </Route>
      <Route path="/admin">
        <Route index element={<UnderConstrucionPage />} />
      </Route>
      <Route path="/profile/:userId">
        <Route index element={<Dashboard />} />
        <Route path="settings" element={<UnderConstrucionPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
