import React from 'react';

const RenewView = () => {
    return (
        <div>
            
    <h1 className={`text-2xl text-center mb-8`}>Client Information </h1>
<footer className={`footer px-10 text-white-content bg-white p-20 rounded`}>
  <nav >
    <header className={`footer-title underline py-2 `}>Client Information</header> 
    <p>Client Name : </p>
    <p>Hotel Address : </p>
    <p>Contact Number :</p>
    <p>Client Email :</p>
  </nav> 
  <nav >
    <header className="footer-title underline py-2">Bill-Information</header> 
  <p>Bill From Date : </p>
  <p>Bill To Date : </p>
 
  </nav> 
  <nav >
    <header className="footer-title underline py-2">Payment-Information</header> 
  <p>Cash  : </p>
  <p>Card  : </p>
  <p>Mobile Banking  : </p>
 
  </nav> 
  <nav >
    <header className="footer-title underline  py-2">Other Information </header> 
    <p>Number Of Hotels : </p>
    <p>Status : </p>
    <p></p>

  </nav>
</footer> 
        </div>
    );
};

export default RenewView;