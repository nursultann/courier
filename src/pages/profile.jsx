import { useEffect, useState } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const BISHKEK = [42.8746, 74.5698];

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });

  return null;
}

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("user") !== null;

  const [cart, setCart] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");

  // Координаты маркера
  const [markerLat, setMarkerLat] = useState(BISHKEK[0]);
  const [markerLng, setMarkerLng] = useState(BISHKEK[1]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = "/";
    }
  }, [isLoggedIn]);

  function handleMapClick(latlng) {
    setMarkerLat(latlng.lat);
    setMarkerLng(latlng.lng);

    console.log("Выбрано:", latlng.lat, latlng.lng);
  }

  const createOrder = async () => {
    const order = {
      customerName,
      customerPhone,
      items: cart,
      address,
      lat: markerLat,
      long: markerLng,
    };

    console.log("Order:", order);

    try {
      const response = await axios.post(
        "https://695ff14b7f037703a81543ad.mockapi.io/courier",
        order
      );

      console.log("Order created:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const LogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("uid");
    window.dispatchEvent(new Event("userChange"));
    window.location.href = "/login2";
  };

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
  
      {/* Верхняя кнопка */}
      <div className="container mb-4">
        <a href="/orders" className="text-decoration-none">
          <button className="btn btn-primary px-4 rounded-pill">
            <i className="fa-solid fa-box me-2"></i>
            Orders
          </button>
        </a>
      </div>
  
      <div className="container">
        <div className="row g-4">
  
          {/* ================= LEFT SIDE ================= */}
          <div className="col-lg-4">
  
            {/* Profile */}
            {isLoggedIn && (
              <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body p-4">
  
                  <div className="text-center">
  
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="rounded-circle border border-3 border-warning shadow-sm mb-3"
                      width="110"
                      height="110"
                    />
  
                    <h3 className="fw-bold mb-1">
                      {user.name}
                    </h3>
  
                    <p className="text-muted mb-4">
                      {user.email}
                    </p>
  
                  </div>
  
                  {/* User information */}
                  <div className="mb-3">
  
                    <div className="bg-light rounded-3 p-3 mb-2">
                      <div className="text-muted small">
                        <i className="fa-solid fa-user text-success me-2"></i>
                        Username
                      </div>
  
                      <div className="fw-semibold mt-1">
                        {user.name}
                      </div>
                    </div>
  
                    <div className="bg-light rounded-3 p-3">
                      <div className="text-muted small">
                        <i className="fa-solid fa-envelope text-success me-2"></i>
                        Email
                      </div>
  
                      <div className="fw-semibold mt-1">
                        {user.email}
                      </div>
                    </div>
  
                  </div>
  
                  {/* Buttons */}
                  <div className="d-grid gap-2">
  
                    <a
                      href={`/edit/${user.id}`}
                      className="text-decoration-none"
                    >
                      <button className="btn btn-warning rounded-pill w-100">
                        <i className="fa-solid fa-pen me-2"></i>
                        Edit Profile
                      </button>
                    </a>
  
                    <button
                      className="btn btn-outline-danger rounded-pill"
                      onClick={LogOut}
                    >
                      <i className="fa-solid fa-right-from-bracket me-2"></i>
                      Log Out
                    </button>
  
                  </div>
  
                </div>
              </div>
            )}
  
            {/* ================= ORDER ================= */}
            <div className="card border-0 shadow-sm rounded-4">
  
              <div className="card-body p-4">
  
                <h4 className="fw-bold mb-1">
                  Delivery information
                </h4>
  
                <p className="text-muted small mb-4">
                  Enter your delivery details
                </p>
  
                {/* Name */}
                <div className="mb-3">
  
                  <label className="form-label fw-semibold">
                    Customer name
                  </label>
  
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0">
                      <i className="fa-solid fa-user text-success"></i>
                    </span>
  
                    <input
                      type="text"
                      className="form-control bg-light border-0"
                      placeholder="Your name"
                      value={customerName}
                      onChange={(e) =>
                        setCustomerName(e.target.value)
                      }
                    />
                  </div>
  
                </div>
  
                {/* Phone */}
                <div className="mb-3">
  
                  <label className="form-label fw-semibold">
                    Phone
                  </label>
  
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0">
                      <i className="fa-solid fa-phone text-success"></i>
                    </span>
  
                    <input
                      type="tel"
                      className="form-control bg-light border-0"
                      placeholder="+996 XXX XXX XXX"
                      value={customerPhone}
                      onChange={(e) =>
                        setCustomerPhone(e.target.value)
                      }
                    />
                  </div>
  
                </div>
  
                {/* Address */}
                <div className="mb-3">
  
                  <label className="form-label fw-semibold">
                    Address
                  </label>
  
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0">
                      <i className="fa-solid fa-location-dot text-danger"></i>
                    </span>
  
                    <input
                      type="text"
                      className="form-control bg-light border-0"
                      placeholder="Delivery address"
                      value={address}
                      onChange={(e) =>
                        setAddress(e.target.value)
                      }
                    />
                  </div>
  
                </div>
  
                {/* Coordinates */}
                <div className="bg-light rounded-3 p-3 mb-3">
  
                  <div className="small text-muted mb-2">
                    Selected location
                  </div>
  
                  <div className="d-flex justify-content-between">
  
                    <span>
                      <strong>Lat:</strong>{" "}
                      {markerLat.toFixed(6)}
                    </span>
  
                    <span>
                      <strong>Lng:</strong>{" "}
                      {markerLng.toFixed(6)}
                    </span>
  
                  </div>
  
                </div>
  
                <button
                  className="btn btn-success w-100 rounded-pill py-2"
                  onClick={createOrder}
                >
                  <i className="fa-solid fa-check me-2"></i>
                  Create Order
                </button>
  
              </div>
  
            </div>
  
          </div>
  
  
          {/* ================= RIGHT SIDE MAP ================= */}
          <div className="col-lg-8">
  
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
  
              {/* Map header */}
              <div className="card-body p-4 pb-3">
  
                <div className="d-flex justify-content-between align-items-center">
  
                  <div>
                    <h3 className="fw-bold mb-1">
                      Delivery location
                    </h3>
  
                    <p className="text-muted mb-0">
                      Click on the map to select your delivery address
                    </p>
                  </div>
  
                  <div
                    className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "50px",
                      height: "50px",
                    }}
                  >
                    <i className="fa-solid fa-location-dot text-success fs-4"></i>
                  </div>
  
                </div>
  
              </div>
  
              {/* Map */}
              <div className="px-3 pb-3">
  
                <div
                  className="rounded-4 overflow-hidden"
                  style={{
                    height: "650px",
                  }}
                >
  
                  <MapContainer
                    center={BISHKEK}
                    zoom={13}
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                  >
  
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="&copy; OpenStreetMap contributors"
                    />
  
                    <MapClickHandler
                      onMapClick={handleMapClick}
                    />
  
                    <Marker
                      position={[
                        markerLat,
                        markerLng,
                      ]}
                    />
  
                  </MapContainer>
  
                </div>
  
              </div>
  
              {/* Map footer */}
              <div className="px-4 pb-4">
  
                <div className="d-flex align-items-center text-muted small">
  
                  <i className="fa-solid fa-circle-info me-2 text-primary"></i>
  
                  Click anywhere on the map to move the delivery marker.
  
                </div>
  
              </div>
  
            </div>
  
          </div>
  
        </div>
      </div>
  
    </div>
  );
  
};

export default Profile;
