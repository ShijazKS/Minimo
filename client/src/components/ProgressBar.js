import React from "react";
import { Progress } from "antd";

const ProgressBar = ({mainH,mainHv,fHv,sHv,fv,sv}) => {
  return (
    <div className="flex-col text-center rounded-lg shadow-lg bordered-2xl pb-8 mb-4 item-center justify-center md:ml-2 md:mr-2 w-full md:w-1/2 bg-slate-50">
      <h4 className="font-bold my-2">{mainH} : {mainHv}</h4>
      <h4 className="mb-2 font-bold">
        <span className="circle"></span> Income: {fHv}{" "}
        <span className="circle circle-2 "></span> Expense:{" "}
        {sHv}
      </h4>
      <div className="">
        <Progress
          type="circle"
          strokeColor={"green"}
          percent={!isNaN(fv) ? fv.toFixed(0) : 0}
        />
        <Progress
          className="mx-2"
          type="circle"
          strokeColor={"red"}
          percent={!isNaN(sv) ? sv.toFixed(0) : 0}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
