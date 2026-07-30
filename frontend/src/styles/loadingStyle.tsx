import { CSSProperties } from "react";
import { COLORS } from "../constants/colors";

const loadingStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "48px",
  fontSize: "18px",
  color: COLORS.secondary.s08,
};

export default loadingStyle;
