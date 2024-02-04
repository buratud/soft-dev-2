import React, { useContext, useState } from "react";
import { Typography, Rating } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { userContext } from "../App";
function Writereview(props) {
  const {user} = useContext(userContext)
  const user_id = 1
  const { dormID } = props;
  const [star ,setStar] = useState(0)
  const [comment ,setComment] = useState("")
  const sendReview = () => {
    axios.post("http://localhost:3001/write_review",{
      dorm_id:dormID,
      writer_id:user_id,
      star:star,
      comment:comment
    }).then(()=>{window.location.reload()})
    
  }
  
  if (!!user.actor){
    return (
      <div className="bg-white mb-[10px] rounded-lg shadow-md p-0">
        <Box sx={{ flexGrow: 1, overflow: "hidden", p: 2 }}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <AccountCircleIcon sx={{ fontSize: 45 }} />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography noWrap>name</Typography>
              <Rating size="large" name="simple-controlled" value={star} onChange={(e) => {setStar(Number(e.target.value))}}/>
            </Grid>
          </Grid>
          <TextField
            size="small"
            fullWidth
            id="outlined-basic"
            placeholder="write review..."
            variant="outlined"
            value={comment}
            onChange={(e) => {setComment(e.target.value)}}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                sendReview()
              }
            }}
            onkey
          />
        </Box>
      </div>
    );
  }
}

export default Writereview;
