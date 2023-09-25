import React, { useContext } from "react";
import ExpenseContext from "../../store/expense-context";

import classes from "./ExpenseList.module.css";

const ExpenseList = (props) => {
  const expCtx = useContext(ExpenseContext);
    
  return (
    <section className={classes.listCon}>
        <h1>Expenses</h1>
      <ul>
        {expCtx.items.map((i, index) => (
          <li className={classes.listItem} key={index}>
              <div className={classes.date}>{i.date}</div>
              <h3 className={classes.category}>{i.category.toUpperCase()}</h3>
              <div className={classes.des}>{i.enteredDes}</div>
              <div className={classes.Amt}>{i.enteredAmt}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ExpenseList;