import React, { ReactNode } from "react";
import { COLORS } from "../constants/colors";

type Props = {
  title: string;
  leftHeaderChildren?: ReactNode;
  headerChildren?: ReactNode;
};

const PageHeader = ({ title, leftHeaderChildren, headerChildren }: Props) => {
  const headerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    justifyContent: "space-between",
  };

  const leftHeaderStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "24px",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "40px",
    fontWeight: 700,
    color: COLORS.secondary.s10,
    margin: 0,
    flexShrink: 0,
  };

  return (
    <div style={headerStyle}>
      <div style={leftHeaderStyle}>
        <h1 style={titleStyle}>{title}</h1>
        {leftHeaderChildren}
      </div>
      {headerChildren}
    </div>
  );
};

export default PageHeader;
