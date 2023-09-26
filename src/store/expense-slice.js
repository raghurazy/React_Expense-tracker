import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

// const dltItem = createAsyncThunk("expenses/dltItem", async (itemId) => {
//   const auth = useSelector((state) => state.auth);
//   const email = auth.userEmail.replace(/[\.@]/g, "");
//   console.log(email)
//   try {
//     const res = await axios.get(
//       `https://myreact-expense-tracker-default-rtdb.firebaseio.com/${email}/expenses.json`
//     );

//     const data = res.data;
//     // console.log(data);
//     const Id = Object.keys(data).find((eleId) => data[eleId].id === itemId);
//     try {
//       const res = await axios.delete(
//         `https://myreact-expense-tracker-default-rtdb.firebaseio.com/${email}/expenses/${Id}.json`
//       );
//       console.log('ok')
//     } catch (error) {
//       alert(error);
//     }
//   } catch (error) {
//     alert(error);
//   }
// });

const initialState = {
  items: [],
  editItems: null,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addItem(state, action) {
      state.items = [action.payload, ...state.items];
      // console.log(state);
    },
    removeItem(state, action) {
      const itemId = action.payload.id;
      state.items = state.items.filter((item) => item.id !== itemId);
    },
    editItem(state, action) {
        state.editItems = action.payload.item;
        state.items = action.payload.filtered;
    },
    setItems(state, action) {
        state.items = action.payload;
    },

    setEditItemsNull(state) {
        state.editItems = null;
    },
    setItemsEmpty(state) {
        state.items = [];
    }
    
  },
});
console.log(initialState.items);

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;