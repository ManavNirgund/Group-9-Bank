import FavoriteIcon from "@mui/icons-material/Favorite";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";

export const roles = {
    CUSTOMER: "CUSTOMER",
    MANAGER: "MANAGER",
  };

  export const genders = {
    Male: 'Male',
    Female: 'Female',
  }

  export const account = {
    SAVINGS: 'Savings',
    CURRENT: 'Current'
  }

  export const items = [
    { id: 1, name: "Transaction", icon: <FavoriteIcon />, to: "/transaction" },
    { id: 2, name: "Loan", icon: <ProductionQuantityLimitsIcon />, to: "/loan" },
    { id: 5, name: "Credit Cards", icon: <FavoriteIcon />, to: "/credit" },
    { id: 6, name: "Gift Cards", icon: <ProductionQuantityLimitsIcon />, to: "/gift" },
  ];