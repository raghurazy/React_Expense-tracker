import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./auth-context";
import ExpenseContext from "./expense-context";

const ExpenseProvider = props => {
  const [itemsArr, setItemsArr] = useState([]);
  const [editItems, updateEditItems] = useState(null);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if(localStorage.length == 0){
      setItemsArr([]);
    }
  }, [localStorage.length])

  const restoreItems = async () => {
    const email = localStorage['userEmail'].replace(/[\.@]/g, "");
    try {
      const res = await axios.get(`https://expense-tracker-ac87d-default-rtdb.firebaseio.com/${email}/expenses.json`)

      const data = res.data;
      if(data){
        const realData = Object.values(data).reverse();
        // console.log(realData)
          setItemsArr(realData);
      }
      
      
    } catch(error){
      alert(error)
    }
  };
  
  useEffect(() => {
    if(localStorage.length>0){
      restoreItems();
    }
  },[localStorage.length]);

  const addItemHandler = (item) => {
    setItemsArr([item, ...itemsArr]);
  };

  const editItemHandler = (item, filtered) => {
    updateEditItems(item);
    setItemsArr(filtered)
  }

  const removeItemHandler = async (item) => {
    const filtered = itemsArr.filter((ele) => ele !==item)
    setItemsArr([...filtered])
    const email = localStorage['userEmail'].replace(/[\.@]/g, "");
    try {
      const res = await axios.get(`https://expense-tracker-ac87d-default-rtdb.firebaseio.com/${email}/expenses.json`)

      const data = res.data;
      // console.log(data);
      const itemId = Object.keys(data).find((id) => data[id].id === item.id);
      try {
        const res = await axios.delete(`https://expense-tracker-ac87d-default-rtdb.firebaseio.com/${email}/expenses/${itemId}.json`)
      } catch(error) {
        alert(error);
      }
    } catch(error) {
      alert(error);
    }
      
    
  };

  const expenseContext = {
    items: itemsArr,
    editItems: editItems,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    editItem: editItemHandler,
    onLogin: restoreItems
  };

  return (
    <ExpenseContext.Provider value={expenseContext}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;



