import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="navbar">
      <span>{user?.email}</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
