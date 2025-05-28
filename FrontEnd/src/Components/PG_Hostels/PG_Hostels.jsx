



import React, { useState } from "react";
import hostelstyles from "./PgHostels.module.css";

function PgHostel() {
  const hostelData = [
    {
      name: "Feel Home Girls Hostel",
      price: 5500,
      image: "./PgHostels/hostel1.jpg",
      features: ["WiFi", "Meals", "Laundry"],
      gender: "Girls",
    },
    {
      name: "Sunshine Boys Hostel",
      price: 5000,
      image: "./PgHostels/hostel2.jpg",
      features: ["WiFi", "Meals", "Laundry"],
      gender: "Boys",
    },
    {
      name: "Sri Balaji Boys Hostel",
      price: 6000,
      image: "./PgHostels/hostel3.jpg",
      features: ["WiFi", "Meals","Laundry"],
      gender: "Boys",
    },
    {
      name: "Sri Durga Boys Hostel",
      price: 5500,
      image: "./PgHostels/hostel4.jpg",
      features: ["WiFi","Meals", "Laundry"],
      gender: "Boys",
    },
    {
      name: "Vidya Boys Hostel",
      price: 5500,
      image: "./PgHostels/hostel5.jpg",
      features: ["WiFi","Meals", "Laundry"],
      gender: "Boys",
    },
    {
      name: "Vidya Girls Hostel",
      price: 5500,
      image: "./PgHostels/hostel6.jpg",
      features: ["WiFi","Meals", "Laundry"],
      gender: "Girls",
    },
    {
      name: "Krupa Boys Hostel",
      price: 5500,
      image: "./PgHostels/hostel7.jpg",
      features: ["WiFi","Meals", "Laundry"],
      gender: "Boys",
    },
    {
      name: "Krupa Girls Hostel",
      price: 5500,
      image: "./PgHostels/hostel8.jpg",
      features: ["WiFi","Meals", "Laundry"],
      gender: "Girls",
    },
    {
      name: "Padmasri Boys Hostel",
      price: 5500,
      image: "./PgHostels/hostel9.jpg",
      features: ["WiFi","Meals", "Laundry"],
      gender: "Boys",
    },
    {
      name: "Anantha Lakshmi Boys Hostel",
      price: 5500,
      image: "./PgHostels/hostel10.jpg",
      features: ["WiFi","Meals", "Laundry"],
      gender: "Boys",
    },
  ];

  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");

  const filteredHostels = hostelData.filter((hostel) => {
    const searchTerm = search.toLowerCase();
    const matchesGender =
      genderFilter === "All" || hostel.gender === genderFilter;

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
            <div
              className={hostelstyles.btns}
              onClick={() => setGenderFilter("All")}
            >
              <button>All</button>
            </div>
            <div
              className={hostelstyles.btns}
              onClick={() => setGenderFilter("Boys")}
            >
              <button>BOYS</button>
            </div>
            <div
              className={hostelstyles.btns}
              onClick={() => setGenderFilter("Girls")}
            >
              <button>GIRLS</button>
            </div>
          </div>
        </div>

        <div className={hostelstyles.second}>
          <div className={hostelstyles.cards}>
            {filteredHostels.map((hostel, index) => (
              <div className={hostelstyles.card} key={index}>
                <img src={hostel.image} alt={hostel.name} />
                <div className={hostelstyles.content}>
                  <h1>{hostel.name}</h1>
                  <h3>₹ {hostel.price}</h3>
                  <div className={hostelstyles.features}>
                    {hostel.features.includes("WiFi") && (
                      <div className={hostelstyles.wifi}>
                        <i className="fa-solid fa-wifi"></i> WiFi
                      </div>
                    )}
                    {hostel.features.includes("Meals") && (
                      <div className={hostelstyles.meals}>
                        <i className="fa-solid fa-utensils"></i> Meals
                      </div>
                    )}
                    {hostel.features.includes("Laundry") && (
                      <div className={hostelstyles.meals}>
                        <i className="fa-solid fa-soap"></i> Laundry
                      </div>
                    )}
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
                      <button>View More</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredHostels.length === 0 && (
              <p>No hostels match your search.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PgHostel;
