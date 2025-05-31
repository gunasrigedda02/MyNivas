import React, { useState } from "react";
import hostelstyles from "./PgHostel.module.css";

function PgHostel() {
  const hostelData = [
    {
      name: "Feel Home Girls Hostel",
      price: 5500,
      image: "./hostel2.jpg",
      features: ["WiFi", "Meals", "Laundry"],
      gender: "Girls",
      description: "Feel at home with quality meals, laundry, and high-speed WiFi.",
    },
    {
      name: "Sunshine Boys Hostel",
      price: 5000,
      image: "./hostel1.jpg",
      features: ["WiFi", "Meals", "Laundry"],
      gender: "Boys",
      description: "Bright and clean accommodation with meals and WiFi included.",
    },
    {
      name: "Sri Balaji Boys Hostel",
      price: 6000,
      image: "./hostel3.jpg",
      features: ["WiFi", "Meals", "Laundry"],
      gender: "Boys",
    },
    {
      name: "Sri Durga Boys Hostel",
      price: 5500,
      image: "./hostel4.jpg",
      features: ["WiFi", "Meals", "Laundry"],
      gender: "Boys",
    },
    {
      name: "Vidya Boys Hostel",
      price: 5500,
      image: "./hostel5.jpg",
      features: ["WiFi", "Meals", "Laundry"],
      gender: "Boys",
    },
    {
      name: "Vidya Girls Hostel",
      price: 5500,
      image: "./hostel6.jpg",
      features: ["WiFi", "Meals", "Laundry"],
      gender: "Girls",
    },
    {
      name: "Krupa Boys Hostel",
      price: 5500,
      image: "./hostel7.jpg",
      features: ["WiFi", "Meals", "Laundry"],
      gender: "Boys",
    },
    {
      name: "Krupa Girls Hostel",
      price: 5500,
      image: "./hostel8.jpg",
      features: ["WiFi", "Meals", "Laundry"],
      gender: "Girls",
    },
    {
      name: "Padmasri Boys Hostel",
      price: 5500,
      image: "./hostel9.jpg",
      features: ["WiFi", "Meals", "Laundry"],
      gender: "Boys",
    },
    {
      name: "Anantha Lakshmi Boys Hostel",
      price: 5500,
      image: "./hostel10.jpg",
      features: ["WiFi", "Meals", "Laundry"],
      gender: "Boys",
    },
    {
      name: "Sri Venkateswara Girls Hostel",
      price: 5500,
      image: "./hostel11.jpg",
      features: ["WiFi", "Meals", "Laundry"],
      gender: "Girls",
    },
    {
      name: "Karthikeya Boys Hostel",
      price: 5500,
      image: "./hostel12.jpg",
      features: ["WiFi", "Meals", "Laundry"],
      gender: "Boys",
    },
    
  ];

  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState(null);

  const filteredHostels = hostelData.filter((hostel) => {
    const searchTerm = search.toLowerCase();
    const matchesGender = genderFilter === "All" || hostel.gender === genderFilter;
    return (
      matchesGender &&
      (
        hostel.name.toLowerCase().includes(searchTerm) ||
        hostel.price.toString().includes(searchTerm) ||
        hostel.features.some((feature) =>
          feature.toLowerCase().includes(searchTerm)
        )
      )
    );
  });

  const openModal = (hostel) => {
    setSelectedHostel(hostel);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedHostel(null);
    setModalOpen(false);
  };

  return (
    <>
      <div className={hostelstyles.wholecontainer}>
        <div className={hostelstyles.first}>
          <div className={hostelstyles.search}>
            <form>
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search by name, price, or feature..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
          <div className={hostelstyles.threebtns}>
            {["All", "Boys", "Girls"].map((type) => (
              <div
                key={type}
                className={hostelstyles.btns}
                onClick={() => setGenderFilter(type)}
              >
                <button>{type.toUpperCase()}</button>
              </div>
            ))}
          </div>
        </div>

        <div className={hostelstyles.second}>
          <div className={hostelstyles.cards}>
            {filteredHostels.map((hostel, index) => (
              <div className={hostelstyles.card} key={index}>
                <img src={hostel.image} alt={hostel.name} />
                <div className={hostelstyles.content}>
                  <h2>{hostel.name}</h2>
                  <h3>₹ {hostel.price}</h3>
                  <div className={hostelstyles.features}>
                    {hostel.features.map((feature, i) => (
                      <div key={i} className={hostelstyles.featureItem}>
                        <i className={`fa-solid fa-${feature === "WiFi" ? "wifi" : feature === "Meals" ? "utensils" : "soap"}`}></i>
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className={hostelstyles.more}>
                    <div>
                      Rating{" "}
                      <i className="fa-regular fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                    </div>
                    <div className={hostelstyles.viewmore}>
                      <button onClick={() => openModal(hostel)}>View More</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredHostels.length === 0 && <p>No hostels match your search.</p>}
          </div>
        </div>
      </div>

     
      {modalOpen && selectedHostel && (
        <div className={hostelstyles.modal}>
          <div className={hostelstyles.overlay} onClick={closeModal}></div>
          <div className={hostelstyles.modalcontent}>
            <h1 style={{color:"navy"}}>{selectedHostel.name}</h1>
            <img className={hostelstyles.modalimage}
              src={selectedHostel.image}
              alt={selectedHostel.name}
              
            />
            <p style={{ marginTop: "50px" }}><strong>description:</strong>{selectedHostel.description}</p>
            <p><strong>Price:</strong> ₹ {selectedHostel.price}</p>
            <p><strong>Gender:</strong> {selectedHostel.gender}</p>
            <div className={hostelstyles.rooms}>
              <p><strong>Rooms:</strong></p>
              <div><img className={hostelstyles.smallimage}
              src={selectedHostel.image}
              alt={selectedHostel.name}/>
              
              
            
            </div>
            </div>
            <p><strong>Facilities:</strong> {selectedHostel.features.join(", ")}</p>
            <button className={hostelstyles.close} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default PgHostel;
