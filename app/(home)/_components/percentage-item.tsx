import React, { ReactNode } from "react";

interface PercentageItemProps {
  title: string;
  percentage: number;
  icon: ReactNode;
}

const PercentageItem = ({ title, percentage, icon }: PercentageItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-white bg-opacity-[4%] p-2">{icon}</div>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      <p className="text-sm font-bold">{percentage ? percentage : "0"}%</p>
    </div>
  );
};

export default PercentageItem;
