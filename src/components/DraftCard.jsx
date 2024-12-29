import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const DraftCard = ({ draft }) => {
  // Format the created_at timestamp to a readable format
  const formattedDate = new Date(draft.created_at).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const navigate=useNavigate();

  return (
    <Card
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        height: "80px",
        padding: "12px",
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          transform: "translateY(-2px)",
        },
        "&:hover .arrow": {
          transform: "translateX(0)",
        },
      }}
      onClick={()=>{navigate('/builder',{state:{ draft: draft }});}}
    >
      <CardContent
        sx={{
          padding: "8px 16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "bold" }}>
          {draft.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#757575", fontSize: "0.85rem", marginTop: "4px" }}
        >
          {formattedDate}
        </Typography>
      </CardContent>
      <Box
        className="arrow"
        sx={{
          position: "absolute",
          top: "50%",
          right: "4px",
          transform: "translateX(100%)",
          transition: "transform 0.3s ease-in-out",
          display: "flex",
          alignItems: "center",
        }}
      >
        <ArrowForwardIcon sx={{ color: "#757575" }} />
      </Box>
    </Card>
  );
};

export default DraftCard;
