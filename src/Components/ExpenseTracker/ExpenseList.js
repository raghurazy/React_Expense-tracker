import React, { useContext } from "react";
import ExpenseContext from "../../store/expense-context";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

import classes from "./ExpenseList.module.css";

const ExpenseList = (props) => {
  const expCtx = useContext(ExpenseContext);

  const editClickHandler = (item) => {
      const filter = expCtx.items.filter((ele) => ele !== item)
      expCtx.editItem(item,filter);
  }

  const dltClickHandler = item => {
    expCtx.removeItem(item);
  };

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
            <div className={classes.btn}>
              <button className={classes.edit} onClick={()=>editClickHandler(i)}>
                <AiFillEdit />
              </button>
              <button className={classes.dlt} onClick={()=>dltClickHandler(i)}>
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