import React, { useState } from 'react';
import { FaRegEdit, FaRegTrashAlt, FaThList } from "react-icons/fa";
import { Link } from 'react-router-dom';

const AllInventory = () => {
    const [items, setItems] = useState([
        { name: 'Bed Sheet', quantity: 4 },
        { name: 'Pillow', quantity: 23 },
        { name: 'Cutlery', quantity: 45 },
        { name: 'Cookware', quantity: 10 },
        { name: 'Soap', quantity: 54 },
        { name: 'Tissue', quantity: 78 },
    ]);

    return (
        <div className={`space-y-10`}>
            <h3
                className={`flex bg-green-slimy text-2xl text-white max-w-3xl mx-auto py-3 px-6 rounded space-x-1.5`}
            >
                <FaThList />
                <span>Add Items</span>
            </h3>
            <div className="overflow-x-auto max-w-3xl mx-auto">
                <table className="table text-center">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index} className='text-lg'>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    {item.quantity}
                                </td>
                                <td>
                                    <button className='btn btn-ghost hover:bg-transparent'>
                                        <FaRegEdit className='text-xl text-red-500' />
                                    </button>
                                    <button className='btn btn-ghost hover:bg-transparent'>
                                        <FaRegTrashAlt className='text-xl text-green-slimy' />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link
                    to='/dashboard/add-inventory'
                    className="col-span-full btn btn-sm w-full bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
                >
                    Add Item
                </Link>
            </div >
        </div >
    );
};

export default AllInventory;