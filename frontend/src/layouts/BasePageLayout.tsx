import { ReactNode } from "react";
import { COLORS } from "../constants/colors";

type Props = {
  children: ReactNode;
};

const BasePageLayout = ({ children }: Props) => {
  const pageStyle: React.CSSProperties = {
    padding: "48px 64px",
    minHeight: "100vh",
    background: COLORS.secondary.s01,
  };

  return <div style={pageStyle}>{children}</div>;
};

export default BasePageLayout;
