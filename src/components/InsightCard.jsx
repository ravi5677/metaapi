import React from "react";

const InsightCard = ({ CardTitle, TitleValue }) => {
  return (
    <div className="insightCard">
      <h4>
        {CardTitle} - {TitleValue}
      </h4>
    </div>
  );
};

export default InsightCard;
