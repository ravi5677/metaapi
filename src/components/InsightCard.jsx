import React from "react";

const InsightCard = ({ CardTitle, TitleValue }) => {
  return (
    <div className="insightCard">
      <h4>
        {CardTitle.replace(/([A-Z])/g, " $1")
          .trim()
          .toUpperCase()}
      </h4>
      <h3>{TitleValue}</h3>
    </div>
  );
};

export default InsightCard;
