import { PropsWithChildren } from "react";

export const Price: React.FC<{ value?: number } & PropsWithChildren> = ({
  value = 0,
  children,
}) => {
  const data = value || Number.parseFloat(children?.toString() || "0");
  return (
    <span>
      {Intl.NumberFormat("en-EN").format(data)}
      <span style={{ fontSize: "0.9em", paddingLeft: "0.1em" }}>$</span>
    </span>
  );
};
