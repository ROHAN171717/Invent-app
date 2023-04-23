import React from "react";

const InfoBox = ({ icon, title, count, bgColor }) => {
  return (
    <div className="inline-block p-4 px-6 mr-3 mb-3 rounded-lg" style={{ backgroundColor: bgColor }}>
      <div className="flex">
        <div className="text-5xl mt-2 font-bold">{icon}</div>
        <div className="ml-2">
          <h1 className="text-2xl">{title}</h1>
          <h1 className="text-3xl font-bold">{count}</h1>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
