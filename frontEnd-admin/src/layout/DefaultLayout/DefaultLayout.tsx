import React from "react";
import SliderBar from "../../components/SliderBar/SliderBar";
import { DefaultLayoutProps } from "../../types/Type";

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div>
      <SliderBar />
      {children}
    </div>
  );
};

export default DefaultLayout;
