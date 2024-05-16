import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./styles/loggedin.css";
import { Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function LoggedIn() {
  const { logout, user } = useAuth0();
  const navigate = useNavigate();
  const [accountBalance, setAccountBalance] = useState("");
  const [incomes, setIncomes] = useState("");
  const [expences, setExpences] = useState("");
  const [incomesBalance, setIncomesBalance] = useState("");
  const [incomesThisMonth, setIncomesThisMonth] = useState("");

  useEffect(() => {
    const fetchAccountBalance = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/users/balance?username=${user.name}`
        );
        if (!response.ok) {
          throw new Error("Network error!");
        }
        const jsonData = await response.json();
        setAccountBalance(jsonData);
        console.log(accountBalance);
      } catch (error) {
        console.error("Error in fetching data ", error);
      }
    };

    fetchAccountBalance();
  }, [user.name]);

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/users/incomes?username=${user.name}`
        );
        if (!response.ok) {
          throw new Error("Network error");
        }
        const jsonData = await response.json();
        setIncomes(jsonData);
        console.log(incomes);
      } catch (error) {
        console.error("Error in fetching data ", error);
      }
    };
    fetchIncomes();
  }, [user.name]);

  useEffect(() => {
    const fetchExpences = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/users/expences?username=${user.name}`
        );
        if (!response.ok) {
          throw new Error("Network error");
        }
        const jsonData = await response.json();
        setExpences(jsonData);
        console.log(expences);
      } catch (error) {
        console.error("Error in fetching data ", error);
      }
    };
    fetchExpences();
  }, [user.name]);

  const addIncome = () => {
    navigate("/incomeForm", { state: { username: user.name } });
  };

  const addExpence = () => {
    navigate("/expenceForm", { state: { username: user.name } });
  };

  const backHome = () => {
    navigate("/");
  };

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const dateFormat = `${day}.${month}.${year}`;

  useEffect(() => {
    const getIncomesThisMonth = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/users/incomes/${month}/${year}`
        );
        if (!response.ok) {
          throw new Error("Network error");
        }
        const jsonData = await response.json();
        setIncomesThisMonth(jsonData);
      } catch (error) {
        console.log("Error in fetching data!");
      }
    };

    getIncomesThisMonth();
  }, [user.name]);
  return (
    <div className="login-container">
      <div className="navbar">
        <div className="navbar-left" onClick={() => backHome()}>
          <span>Početna stranica</span>
        </div>
        <div className="navbar-center">
          <div className="balance-date-wrapper">
            <Nav>
              Ukupno stanje računa:{" "}
              <span className="balance">{accountBalance.balance} €</span>
            </Nav>
            <Nav>Datum: {dateFormat}</Nav>
          </div>
        </div>
        <div className="navbar-right">
          <Nav>
            <div>{user.name}</div>
            <button onClick={() => logout()}>Odjava</button>
          </Nav>
        </div>
      </div>

      <div className="costs-container">
        <div className="incomes-container">
          <div className="costs-title">Prihodi ovaj mjesec</div>
          <div className="incomes-group">
            {incomesThisMonth &&
              incomesThisMonth.incomesGrouped.map((income) => {
                return (
                  <div className="income" key={income.id}>
                    {income.name}: {income.coalesce} €
                  </div>
                );
              })}
          </div>
          <div className="add-income">
            <div className="income-bottom">
              Ukupno: {accountBalance.incomes} €
            </div>
            <div className="income-bottom" onClick={() => addIncome()}>
              Dodaj prihod
            </div>
          </div>
        </div>
        <div className="expences-container">
          <div className="costs-title">Rashodi ovaj mjesec</div>
          <div className="expences-group">
            {expences &&
              expences.expencesGrouped.map((expense) => {
                return (
                  <div className="expense" key={expense.id}>
                    {expense.name}: {expense.coalesce} €
                  </div>
                );
              })}
          </div>
          <div className="add-expence">
            <div className="expence-bottom">
              Ukupno: {accountBalance.expences} €
            </div>
            <div className="expence-bottom" onClick={() => addExpence()}>
              Dodaj rashod
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
