import React, { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Optional: Loading state

  useEffect(() => {
    // Fetching data from the REST Countries API
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => {
        if (!response.ok) {
          // If the response is not OK, throw an error to be caught in the catch block
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
        setIsLoading(false); // Even on error, stop loading
      });
  }, []);

  // Filtering countries based on the search term
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Inline styles for the components
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
      backgroundColor: "#ffffff",
      padding: "20px",
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
        />
      </div>

      {/* Container for Country Cards */}
      <div style={styles.container}>
        {isLoading ? (
          <p>Loading...</p> // Optional: Loading indicator
        ) : (
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
        )}
      </div>
    </>
  );
}

export default App;
