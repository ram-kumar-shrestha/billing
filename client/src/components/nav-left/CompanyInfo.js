import React from "react";

const company_name = "Company Name ";
const address = "Address";

const CompanyInfo = () => {
  return (
    <>
      <div className="logo">
        <img
          src={`${process.env.PUBLIC_URL}/images/logo.svg`}
          // src="./iamges/logo.svg"
          alt="company logo"
        />
      </div>
      <div className="info">
        <h1>{company_name}</h1>
        <h4>{address}</h4>
      </div>
    </>
  );
};

export default CompanyInfo;
