import React, { Fragment } from "react";
import ExpenseProvider from "../../store/ExpenseContext";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

const Expense = () => {
  return (
    <Fragment>
      <ExpenseForm />
      <ExpenseList />
    </Fragment>
  );
};

export default Expense;