import React from 'react';
import { FaRegEdit, FaRupeeSign } from 'react-icons/fa';
import { getCurrentDateWithDay, getformatDateTime, versionControl } from '../../utils/utils';
import EditExpensesView from './EditExpensesView';
import logo from "../../assets/logo.png"
import Footer from '../Footer';
import { Link } from 'react-router-dom';


const ShowAllExpenseViewPrint = ({itemExpense,totalItemsAmount}) => {
    return (
       <div className='p-4'>
        <div className='mb-10'>
        <div >
            <img className='w-24 h-24 mx-auto' src={logo} alt="DHK LOGO" />
        </div>
        <h1 className='text-center text-3xl'>DAK Hospitality LTD </h1>
        <p className='text-center'>Print Date : <span className='text-center ml-2'>{new Date().toLocaleDateString()}</span></p>
        </div>

         <div>
                 <div>
          <h1 className={`text-2xl text-center`}> Expenses Information</h1>
        </div>
        <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Date</th>
                  <th>Items Name</th>
                  <th>Quantity</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                {itemExpense?.items?.map((item, idx) => {
                  return (
                    <tr
                    key={idx}
                      className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}
                    >
                      <th>{++idx}</th>
                      <td>{getformatDateTime(itemExpense?.date)}</td>
                      <td>{item?.name}</td>
                      <td>{item?.quantity}</td>
                      <td>{item?.description}</td>
                      <td>
                          
                            <span><FaRupeeSign className="inline" />{item?.price}</span>
                      </td>
                      <td>{item?.remark}</td>
                      <td>
                       
                        <dialog id="my_modal_3" className="modal">
                          <div className="modal-box">
                            <form method="dialog">
                              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                              </button>
                            </form>
                            <EditExpensesView />
                          </div>
                        </dialog>
                      </td>
                     
                    </tr>
                  );
                })}
              </tbody>
              
            </table>
           <div className={`flex justify-end mr-14   md:ms-[20rem] mt-4 gap-2`}>
            <h1>Grand Total :</h1>
           <div>

                          <FaRupeeSign className='inline' />

                            <span>{totalItemsAmount}</span>

                        </div>
           </div>
          </div> 
        </div>
        <div className=' absolute bottom-0 w-full mb-4 mx-auto right-0' >
          <h3 className='text-center'>
            Powered by{" "}
            <Link className={`text-green-slimy text-lg font-semibold`} to={`https://jsencoder.com/`} target="_blank">
              JS Encoder
            </Link>
            . Copyright &copy; {new Date().getFullYear()}. All rights reserved. Version {versionControl} </h3>
        </div>
       </div>
    );
};

export default ShowAllExpenseViewPrint;