import React, { useState } from 'react';
import { FaRegEdit, FaRegTrashAlt, FaThList } from "react-icons/fa";
import { Link } from 'react-router-dom';

const AllInventory = () => {
    const [items, setItems] = useState([
        { id: 1, name: 'Bed Sheet', quantity: 4, inUse: 2 },
        { id: 2, name: 'Pillow', quantity: 23, inUse: 3 },
        { id: 3, name: 'Cutlery', quantity: 45, inUse: 32 },
        { id: 4, name: 'Cookware', quantity: 10, inUse: 5 },
        { id: 5, name: 'Soap', quantity: 54, inUse: 4 },
        { id: 6, name: 'Tissue', quantity: 78, inUse: 34 },
    ]);

    const handleDelete = (id) => {
        // item remove/delete code will be add gere. 
    }

    return (
        <div className={`space-y-10`}>
            <h3
                className={`flex bg-green-slimy text-2xl text-white max-w-3xl mx-auto py-3 px-6 rounded space-x-1.5`}
            >
                <FaThList />
                <span>All Items</span>
            </h3>
            <div className="overflow-x-auto max-w-3xl mx-auto">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Items in Use</th>
                            <th>Available Quantity</th>
                            <th>Total Quantity</th>
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
                                    {item.inUse}
                                </td>
                                <td>
                                    {
                                        item.quantity - item.inUse 
                                    }
                                </td>
                                <td>
                                    {item.quantity}
                                </td>
                                <td>
                                    <Link
                                    to='/dashboard/add-inventory'
                                    className='btn btn-ghost hover:bg-transparent'>
                                        <FaRegEdit className='text-xl text-red-500' />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className='btn btn-ghost hover:bg-transparent'
                                    >
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