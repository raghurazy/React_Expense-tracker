import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "../../store/auth-context";
import ExpenseContext from "../../store/expense-context";
import { expenseActions } from "../../store/expense-slice";

import classes from "./ExpenseForm.module.css";
const ExpenseForm = () => {
  const amtInputRef = useRef();
  const desInputRef = useRef();
  const dateRef = useRef();
  const cateRef = useRef();
  const formRef = useRef();

  // const expCtx = useContext(ExpenseContext);
  // const authCtx = useContext(AuthContext);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const expense = useSelector((state) => state.expenseStore);
  console.log(expense.editItems);
  useEffect(() => {
    if (expense.editItems !== null) {
      amtInputRef.current.value = expense.editItems.enteredAmt;
      desInputRef.current.value = expense.editItems.enteredDes;
      dateRef.current.value = expense.editItems.date;
      cateRef.current.value = expense.editItems.category;
      // dispatch(expenseActions.setEditItemsNull());
    }
  }, [expense.editItems]);

  const clickAddHandler = async (e) => {
    e.preventDefault();
    if (expense.editItems !== null) {
      // expCtx.removeItem(expCtx.editItems);
      dispatch(expenseActions.removeItem(expense.editItems));
      // expense.editItems = null;
      dispatch(expenseActions.setEditItemsNull());
    }
    const expDetail = {
      id: Math.random().toString(),
      enteredAmt: amtInputRef.current.value,
      enteredDes: desInputRef.current.value,
      date: dateRef.current.value,
      category: cateRef.current.value,
    };
    formRef.current.reset();
    const email = auth.userEmail.replace(/[\.@]/g, "");
    try {
      const res = await axios.post(
        `https://expense-tracker-ac87d-default-rtdb.firebaseio.com/${email}/expenses.json`,
        expDetail
      );
    } catch (error) {
      alert(error);
    }
    // expCtx.addItem(expDetail);
    dispatch(expenseActions.addItem(expDetail));
    formRef.current.reset();
  };

  return (
    <section className={classes.expenseCon}>
      <form ref={formRef}>
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
        <Button type="submit" onClick={clickAddHandler}>
          Add Expense
        </Button>
      </form>
    </section>
  );
};

export default ExpenseForm;
          


         