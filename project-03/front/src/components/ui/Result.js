import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const Result = ({ result }) => {
  return (
    <Link to={`/profile/${result.usernameOwner}`} className="results-card">
      <Card
        border={"light"}
        className="justify-content-center align-items-center"
      >
        <Card.Img
          variant="top"
          src={result.imgPath}
          style={{ width: 100 }}
          className="my-2"
        />
        <Card.Body className=" btn">
          <Card.Title className="titles h4">{result.name}</Card.Title>
          <Card.Text className="text">{result.description}</Card.Text>
          <Card.Text className="titles h5">${result.priceLend}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default Result;
