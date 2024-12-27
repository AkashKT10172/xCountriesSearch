import React, { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch data from the REST Countries API
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCountries(data);
        setIsLoading(false); // Data fetched successfully
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setIsLoading(false); // Stop loading even if there's an error
      });
  }, []);

  // Filter countries based on the search term
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Inline styles for various components
  const styles = {
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
    container: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      padding: "100px 20px 20px 20px", // Adjusted padding to account for fixed header
      minHeight: "100vh",
      backgroundColor: "#f0f0f0",
    },
    header: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      backgroundColor: "#f8f8f8",
      padding: "10px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      zIndex: "1000",
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
      maxWidth: "400px", // Ensures the search bar doesn't get too wide on large screens
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
            <div key={country.cca3} style={styles.card} className="countryCard">
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
