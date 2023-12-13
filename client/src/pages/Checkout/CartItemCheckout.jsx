import React, { useContext } from "react";
import { ListItem, ListItemText, Typography } from "@mui/material";

export const CartItemCheckout = (props) => {

  return (
    <div className="description">
      <ListItem sx={{ py: 1, px: 0 }}>
        <ListItemText />
        <Typography variant="body2"></Typography>
      </ListItem>
      <button> - </button>
          
          <button> + </button>
    </div>
  );
};