import React, { useContext, useRef } from "react";
import { Button } from "react-bootstrap";
import ExpenseContext from "../../store/expense-context";

import classes from "./ExpenseForm.module.css";
const ExpenseForm = () => {
    const amtInputRef = useRef();
    const desInputRef = useRef();
    const dateRef = useRef();
    const cateRef = useRef();

    const expCtx = useContext(ExpenseContext);
    console.log(expCtx);
    const clickAddHandler = (e) => {
        e.preventDefault();
        const expDetail = {
            enteredAmt: amtInputRef.current.value,
            enteredDes: desInputRef.current.value,
            date: dateRef.current.value,
            category: cateRef.current.value
        };
        
        console.log(expDetail);
        expCtx.addItem(expDetail);
    }

  return (
    <section className={classes.expenseCon}>
      <form>
        <section>
          <div className={classes.amt}>
            <label htmlFor="Amount">Amount</label>
            <input type="number" ref={amtInputRef} />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input type="text" ref={desInputRef} />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input type="date" ref={dateRef} />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <select ref={cateRef}>
              <option value="food">Food</option>
              <option value="petrol">Petrol</option>
              <option value="salary">Salary</option>
              <option value="other">Other</option>
            </select>
          </div>
        </section>
        <Button type="submit" onClick={clickAddHandler}>Add Expense</Button>
      </form>
    </section>
  );
};

export default ExpenseForm;