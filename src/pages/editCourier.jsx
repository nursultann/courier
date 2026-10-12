import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditCourier = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);

    const getCourier = async () => {
        try {
            const response = await axios.get(
                `https://695ff14b7f037703a81543ad.mockapi.io/courier/${id}`
            );
            setName(response.data.name || "");
            setPhone(response.data.phone || "");
            setEmail(response.data.email|| "");
        } catch (error) {
            console.error("Ошибка загрузки:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateCourier = async () => {
        try {
            await axios.put(
                `https://695ff14b7f037703a81543ad.mockapi.io/courier/${id}`,
                {
                    name,
                    phone,
                    email,
                }
            );

            alert("Курьер успешно обновлён");
            navigate("/courierList");
        } catch (error) {
            console.error("Ошибка обновления:", error);
            alert("Не удалось обновить курьера");
        }
    };

    useEffect(() => {
        getCourier();
    }, []);

    if (loading) {
        return <h2>Загрузка...</h2>;
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-primary text-white text-center">
                            <h3 className="mb-0">Edit Courier</h3>
                        </div>
    
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label ps-2 fw-bold pt-3">
                                    Name Courier
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter name"
                                />
                            </div>
    
                            <div className="mb-3">
                                <label className="form-label ps-2 fw-bold pt-3">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Enter phone"
                                />
                            </div>
    
                            <div className="mb-3">
                                <label className="form-label ps-2 ps-2 fw-bold pt-3">
                                    Email
                                </label>
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="Enter description"
                                />
                            </div>
    
                            <div className="d-grid">
                                <button
                                    className="btn btn-primary btn-lg mt-2"
                                    onClick={updateCourier}
                                >
                                    💾 Save
                                </button>
                            </div>
                        </div>
    
                        <div className="card-footer text-center text-muted">
                            Courier Edit Page
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    
};

export default EditCourier;
