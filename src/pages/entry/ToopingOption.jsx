import React from "react";
import { Col } from "react-bootstrap";

export default function ToopingOption(props) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img style={{ width: "75%" }} src={`https://localhost:3030/${props.imagePath}`} alt={`${props.name} topping`} />
    </Col>
  );
}
