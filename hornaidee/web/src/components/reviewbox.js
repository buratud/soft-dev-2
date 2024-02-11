import React from "react";
import { Typography, Rating } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "react-responsive-carousel/lib/styles/carousel.min.css";
function Reviewbox(props) {
  const { name, star, comment } = props;
  
  return (
    <div className="bg-white mb-[10px] rounded-lg shadow-md p-0">
      <Box sx={{ flexGrow: 1, overflow: "hidden", width: 300, p: 2 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <AccountCircleIcon sx={{ fontSize: 45 }} />
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap>{name}</Typography>
            <Rating
              size="large"
              name="simple-controlled"
              value={star}
              readOnly
            />
          </Grid>
        </Grid>
        <p>{comment}</p>
      </Box>
    </div>
  );
}

export default Reviewbox;
