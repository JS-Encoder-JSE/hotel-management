import React from 'react';

const AdminOwnerView = () => {
    return (
        <div>
            
    <h1 className={`text-2xl text-center mb-8`}>Client Information </h1>
<footer className={`footer px-10 text-white-content bg-white p-20 rounded`}>
  <nav >
    <header className={`footer-title underline py-2 `}>Client Information</header> 
    <p>Client Name : Jon Dow</p>
    <p>Hotel Address : Kolkata</p>
    <p>Contact Number : +98812554</p>
    <p>Client Email : jondoe@gmail.com</p>
  </nav> 
  <nav >
    <header className="footer-title underline py-2">Bill-Information</header> 
  <p>Bill From Date :12-10-2023 </p>
  <p>Bill To Date : 14-10-2023</p>
 
  </nav> 
  <nav >
    <header className="footer-title underline py-2">Payment-Information</header> 
  <p>Cash  : $5000 </p>
  <p>Card  : $00</p>
  <p>Mobile Banking  : $00</p>
 
  </nav> 
  <nav >
    <header className="footer-title underline  py-2">Other Information </header> 
    <p>Number Of Hotels : 02</p>
    <p>Status : Active</p>
    <p></p>

  </nav>
</footer> 
        </div>
    );
};

export default AdminOwnerView;