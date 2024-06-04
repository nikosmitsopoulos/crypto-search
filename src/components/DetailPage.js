import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./DetailPage.css";

const DetailPage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.example.com/details/${id}`
        );
        setDetails(response.data);
      } catch (error) {
        setError("Error fetching details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="detail-page">
      <h1>{details.name}</h1>
      <p>{details.description}</p>
      {/* Display other details */}
    </div>
  );
};

export default DetailPage;
