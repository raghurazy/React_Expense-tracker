import React, { useContext, useEffect } from "react";
import ExpenseContext from "../../store/expense-context";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

import classes from "./ExpenseList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expense-slice";
import axios from "axios";
import { Button } from "react-bootstrap";

const ExpenseList = (props) => {
  // const expCtx = useContext(ExpenseContext);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const expense = useSelector((state) => state.expenseStore);

  const editClickHandler = (item) => {
    const filter = expense.items.filter((ele) => ele !== item);
    // expense.editItem(item, filter);
    dispatch(expenseActions.editItem({ item: item, filtered: filter }));
  };

  const dltClickHandler = async (item) => {
    // expCtx.removeItem(item);
    dispatch(expenseActions.removeItem(item));
    const email = auth.userEmail.replace(/[\.@]/g, "");
    try {
      const res = await axios.get(
        `https://expense-tracker-ac87d-default-rtdb.firebaseio.com/${email}/expenses.json`
      );

      const data = res.data;
      const Id = Object.keys(data).find((eleId) => data[eleId].id === item.id);
      try {
        const res = await axios.delete(
          `https://expense-tracker-ac87d-default-rtdb.firebaseio.com/${email}/expenses/${Id}.json`
        );
      } catch (error) {
        alert(error);
      }
    } catch (error) {
      alert(error);
    }
  };

  const restoreItems = async () => {
    const email = auth.userEmail.replace(/[\.@]/g, "");
    try {
      const res = await axios.get(
        `https://expense-tracker-ac87d-default-rtdb.firebaseio.com/${email}/expenses.json`
      );

      const data = res.data;
      if (data) {
        const realData = Object.values(data).reverse();
        console.log(realData);
        // setItemsArr(realData);
        dispatch(expenseActions.setItems(realData));
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (auth.userEmail !== null) {
      restoreItems();
    }
  }, [auth.userEmail]);

  let total = 0;
  expense.items.forEach((element) => {
    total += Number(element.enteredAmt);
  });

  return (
    <section className={classes.listCon}>
      <div className={classes.container}>
        <h1>Expenses</h1>
        <div className={classes.totalAmt}>
          <h3>Total expense</h3>
          {total>=10000 && <Button variant="danger">Activate Premium</Button>}
          <span>{total}</span>
        </div>
        {total>=10000 && <p style={{color: 'red'}}>*Please Activate Premium total expenses more than 10000</p>}
      </div>
      <ul>
        {expense.items.map((i, index) => (
          <li className={classes.listItem} key={index}>
            <div className={classes.date}>{i.date}</div>
            <h3 className={classes.category}>{i.category.toUpperCase()}</h3>
            <div className={classes.des}>{i.enteredDes}</div>
            <div className={classes.Amt}>{i.enteredAmt}</div>
            <div className={classes.btn}>
              <button
                className={classes.edit}
                onClick={() => editClickHandler(i)}
              >
                <AiFillEdit />
              </button>
              <button
                className={classes.dlt}
                onClick={() => dltClickHandler(i)}
              >
                <AiFillDelete />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ExpenseList;