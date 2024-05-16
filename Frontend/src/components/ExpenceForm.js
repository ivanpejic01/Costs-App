import React from "react";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function ExpenceForm() {
  const location = useLocation();
  const [username, setUsername] = useState(location.state.username || "");
  const [selectedOption, setSelectedOption] = useState("");
  const [expenceTypes, setExpenceTypes] = useState("");
  const [textInput, setTextInput] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const [dateInput, setDateInput] = useState("");

  useEffect(() => {
    const fetchExpenceTypes = async () => {
      try {
        const response = await fetch("http://localhost:8080/expenceTypes");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setExpenceTypes(jsonData);
      } catch (error) {
        console.error("Error in fetching data ", error);
      }
    };
    fetchExpenceTypes();
  }, []);

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Funkcija koja se poziva kada se unese tekst
  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  };

  // Funkcija koja se poziva kada se unese broj
  const handleNumberChange = (event) => {
    setNumberInput(event.target.value);
  };

  // Funkcija koja se poziva kada se unese datum
  const handleDateChange = (event) => {
    setDateInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Ovdje možete postaviti logiku za obradu podataka forme
    console.log("Dropdown vrijednost:", selectedOption);
    console.log("Tekstualni unos:", textInput);
    console.log("Brojni unos:", numberInput);
    console.log("Datum:", dateInput);
    console.log("Username:", username);
    const formData = {
      username: username,
      expenceType: selectedOption,
      description: textInput,
      amount: numberInput,
      date: dateInput,
    };
    try {
      const response = await fetch("http://localhost:8080/expence", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response wasn't ok");
      }
      console.log("Podaci uspjesno poslani");
    } catch (error) {
      console.log("Error in sending data ", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>Prijavljeni korisnik: {username}</div>

      <Form.Group controlId="dropdown">
        <Form.Label>Vrsta prihoda: </Form.Label>
        <Form.Control
          as="select"
          value={selectedOption}
          onChange={handleDropdownChange}
          required
        >
          {expenceTypes ? (
            expenceTypes.map((expenceType) => (
              <option key={expenceType.id}>{expenceType.name}</option>
            ))
          ) : (
            <option>Nema podataka</option>
          )}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="text-input">
        <Form.Label>Opis: </Form.Label>
        <Form.Control
          type="text"
          value={textInput}
          onChange={handleTextChange}
        />
      </Form.Group>
      <Form.Group controlId="number-input">
        <Form.Label>Iznos(€): </Form.Label>
        <Form.Control
          type="number"
          value={numberInput}
          onChange={handleNumberChange}
        />
      </Form.Group>
      <Form.Group controlId="date-input">
        <Form.Label>Datum: </Form.Label>
        <Form.Control
          type="date"
          value={dateInput}
          onChange={handleDateChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Pošalji
      </Button>
    </Form>
  );
}
