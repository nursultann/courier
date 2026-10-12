import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // реагирует на смену страницы (переход после входа/выхода)
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Обновляем пользователя при каждом переходе по страницам или вызове userChange
    const updateUser = () => {
      try {
        const stored = localStorage.getItem("user");
        setUser(stored ? JSON.parse(stored) : null);
      } catch {
        setUser(null);
      }
    };

    updateUser();

    window.addEventListener("userChange", updateUser);
    window.addEventListener("storage", updateUser);

    return () => {
      window.removeEventListener("userChange", updateUser);
      window.removeEventListener("storage", updateUser);
    };
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("uid");
    setUser(null);
    window.dispatchEvent(new Event("userChange"));
    navigate("/login2");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 mb-3">
      <div className="container">
        <Link className="navbar-brand text-warning fw-bold" to="/profile">
          🚚 Courier
        </Link>

        <div className="d-flex align-items-center gap-3">
          {user ? (
            <>
              <Link to="/orders" className="nav-link text-white">
                Заказы
              </Link>
              <Link to="/courier" className="nav-link text-white">
                Курьер
              </Link>
              <Link to="/map" className="nav-link text-white">
                Карта
              </Link>

              {/* Вошедший пользователь */}
              <Link
                to="/profile"
                className="text-decoration-none text-white d-flex align-items-center gap-2"
              >
                {user.avatar && (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="rounded-circle"
                    width="35"
                    height="35"
                  />
                )}
                <span>{user.name || user.username || user.email}</span>
              </Link>

              <button className="btn btn-danger btn-sm" onClick={logout}>
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link to="/login2" className="btn btn-outline-warning btn-sm">
                Войти
              </Link>
              <Link to="/" className="btn btn-warning btn-sm">
                Регистрация
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
