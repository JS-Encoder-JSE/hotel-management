import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useFormik } from "formik";
import * as yup from "yup";
import { FaPen, FaUpload, FaUserCircle } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import Modal from '../../components/Modal';
import ConfirmOrder from '../../components/room/ConfirmOrder';

// form validation
const validationSchema = yup.object({
    // email: yup
    //     .string()
    //     .email("Enter a valid email")
    //     .required("Email is required"),
    // password: yup
    //     .string()
    //     .min(8, "Password should be of minimum 8 characters length")
    //     .required("Password is required"),
    description: yup
        .string()
        .required("Description is required")
        .min(20, "Description at least 20 characters length"),
});


const Profile = () => {
    const { user } = useAuth();
    const [imagePreview, setImagePreview] = useState(null);


    const formik = useFormik({
        initialValues: {
            userName: user.name,
            email: user.email,
            description: "",
            photo: null,
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
            const reader = new FileReader();

            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            if (values.photo) {
                reader.readAsDataURL(values.photo);
                formik.setFieldValue('photo', values.photo);
            }
        },
    });

    return (
        <div className={`relative max-w-xl bg-white rounded-2xl mx-auto p-8 pt-10 mt-20`}>
            <div className='absolute -top-16 inset-x-1/2 -translate-x-1/2 border-4 border-green-slimy rounded-full h-32 w-32'>
                {imagePreview ?
                    <img
                        src={imagePreview}
                        alt="Selected"
                        className="object-cover h-full w-full rounded-full"
                    />
                    :
                    <img
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2V3ynaT18VgjH2uGddnhnQQaa_OT6nzEOtw&usqp=CAU'
                        alt="Selected"
                        className="object-cover h-full w-full rounded-full"
                    />
                }
            </div>
            <form
                className="form-control grid grid-cols-1 gap-4 mt-10"
                onSubmit={formik.handleSubmit}
            >
                {/* name box */}
                <div className="flex items-center gap-5 py-2 pl-2 rounded-md glass">
                    <label htmlFor="name">Name: </label>
                    <p className='text-slate-600'>{user?.name}</p>
                </div>
                {/* Email box */}
                <div className="flex items-center gap-5 py-2 pl-2 rounded-md glass">
                    <label htmlFor="email">Email: </label>
                    <p className='text-slate-600'>{user?.email}</p>
                </div>
                {/* Password box */}
                <div className="flex items-center gap-5 py-2 pl-2 rounded-md glass">
                    <label htmlFor="email">Password: </label>
                    <p className='text-slate-600 mt-2 -mr-6'>********************</p>
                    <button onClick={() => window.fp_modal.showModal()}
                        type={`button`}
                        className="btn btn-sm bg-transparent hover:bg-transparent border-0 text-green-slimy rounded normal-case "
                    >
                        <FaPen className='text-md cursor-pointer' />
                    </button>
                    {/* modal */}
                    <Modal id={`fp_modal`}>
                        <ConfirmOrder />
                    </Modal>
                </div>
                {/* Description */}
                <div className="col-span-full flex flex-col gap-3">
                    <textarea
                        placeholder="Description"
                        name="description"
                        className="textarea textarea-md bg-transparent textarea-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy resize-none w-full"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.description && Boolean(formik.errors.description) ? (
                        <small className="text-red-600">
                            {formik.touched.description && formik.errors.description}
                        </small>
                    ) : null}
                </div>
                {/* photo box */}
                <div className="flex flex-col gap-3">
                    <label className="relative input input-md input-bordered border-gray-500/50 rounded  focus:outline-none bg-transparent flex items-center">
                        {formik.values.photo ? (
                            formik.values.photo.name.substring(
                                0,
                                formik.values.photo.name.lastIndexOf("."),
                            )
                        ) : (
                            <span className={`flex items-baseline space-x-1.5`}>
                                <FaUpload />
                                <span>Choose photo</span>
                            </span>
                        )}
                        <input
                            type="file"
                            name="photo"
                            className="absolute left-0 top-0 w-0 h-0 overflow-hidden"
                            accept="image/*"
                            onChange={(e) =>
                                formik.setFieldValue("photo", e.currentTarget.files[0])
                            }
                            onBlur={formik.handleBlur}
                        />
                    </label>
                    {formik.touched.photo && Boolean(formik.errors.photo) ? (
                        <small className="text-red-600">
                            {formik.touched.photo && formik.errors.photo}
                        </small>
                    ) : null}
                </div>
                {/* button */}
                <div className={`flex justify-between`}>
                    <button
                        type={"submit"}
                        className="btn btn-md w-full bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
                    >
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;