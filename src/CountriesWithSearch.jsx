import React, { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => {
        // Log the status so Cypress (or your tests) can confirm it is 200
        console.log("API call success with status:", response.status);
        if (!response.ok) {
          // Log the error status as well
          console.error("API call failed with status:", response.status);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCountries(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError(err);
        setIsLoading(false);
      });
  }, []);

  // Filter countries based on the search term
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Inline styles
  const styles = {
    header: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      backgroundColor: "#f8f8f8",
      padding: "10px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      zIndex: 1000,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    searchInput: {
      width: "50%",
      padding: "10px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      maxWidth: "400px",
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      padding: "100px 20px 20px 20px", // account for fixed header
      minHeight: "100vh",
      backgroundColor: "#f0f0f0",
    },
    card: {
      width: "200px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      margin: "10px",
      padding: "10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      backgroundColor: "#fff",
    },
    flagImage: {
      width: "100px",
      height: "60px",
      objectFit: "cover",
      marginBottom: "10px",
    },
    countryName: {
      fontSize: "18px",
      textAlign: "center",
      color: "#333",
    },
    loading: {
      fontSize: "24px",
      color: "#555",
    },
    error: {
      fontSize: "20px",
      color: "red",
      textAlign: "center",
    },
  };

  return (
    <>
      {/* Header with Search Bar */}
      <div style={styles.header}>
        <input
          type="text"
          placeholder="Search for countries..."
          style={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search for countries"
        />
      </div>

      {/* Container for Country Cards */}
      <div style={styles.container}>
        {isLoading ? (
          <p style={styles.loading}>Loading...</p>
        ) : error ? (
          <p style={styles.error}>
            Failed to load countries. Please try again later.
          </p>
        ) : filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div key={country.cca3} className="countryCard" style={styles.card}>
              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                style={styles.flagImage}
              />
              <h2 style={styles.countryName}>{country.name.common}</h2>
            </div>
          ))
        ) : (
          <p style={styles.loading}>No countries found.</p>
        )}
      </div>
    </>
  );
}

export default App;
