import { useEffect, useState } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";




// Фикс иконки маркера Leaflet + Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Координаты Бишкека по умолчанию
const BISHKEK = [42.8746, 74.5698];

// Компонент для клика по карте
function MapClickHandler({ onMapClick }) {
    useMapEvents({
        click(e) {
            onMapClick(e.latlng);
        },
    });
    return null;
}

const Map = () => {
    const [cart, setCart] = useState([]);
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [address, setAddress] = useState("");

      // Координаты маркера на карте
      const [markerLat, setMarkerLat] = useState(BISHKEK[0]);
      const [markerLng, setMarkerLng] = useState(BISHKEK[1]);

          // Клик по карте — ставит маркер
    function handleMapClick(latlng) {
      setMarkerLat(latlng.lat);
      setMarkerLng(latlng.lng);
  }
    
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);
    const addToCart = async (product) => {
        console.log("Adding to cart:", product);
        const cartItem = {
            "customerName": customerName,
            "customerPhone": customerPhone,
            "items":cart,
            "address": address,
            lat: markerLat,
            long: markerLng,
            // "totalAmount": 25000,
            // "status": "confirmed",
            // "note": "test",
        };
        console.log("Cart item:", cartItem);

        try {
            const response = await axios.post("https://695ff14b7f037703a81543ad.mockapi.io/courier", cartItem);
            if (response.status === 201) {
                console.log("Product added to cart successfully");
            } else {
                console.error("Failed to add product to cart");
            }
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }

    }
    
    return (
      <div className="container py-5">


        <div className="row g-4">
          {/* Cart */}
          <div className="col-lg-8">
            <div className="card shadow-lg border-0 rounded-4">
 

              {/* Правая колонка — карта */}
              <div className="col-md-12">
                <h4>Укажите адрес на карте</h4>
                <p className="text-muted">
                  Нажмите на карту, чтобы поставить метку
                </p>
                <MapContainer
                  center={BISHKEK}
                  zoom={13}
                  style={{ height: 500, width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                  <MapClickHandler onMapClick={handleMapClick} />
                  <Marker position={[markerLat, markerLng]} />
                </MapContainer>
              </div>
            </div>
          </div>

      
        </div>
      </div>
    );
};

export default Map;