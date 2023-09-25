import React from "react";

const ExpenseContext = React.createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (item) => {}
});

export default ExpenseContext;