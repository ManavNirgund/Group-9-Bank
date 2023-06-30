import { styled } from "@mui/material/styles";
import { Card } from "@mui/material";

export const Product = styled(Card)(({ theme }) => ({
  display: "flex",
  backgroundColor: "antiquewhite",
  alignItems: "center",
  margin: theme.spacing(2, 2),
  justifyContent: "center",
  height: "150px",
  width: "200px",
  minWidth: '200px',
}));
