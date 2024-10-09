import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import TitleAndSubheading from '../../Shared/TitleAndSubheading';
import Swal from 'sweetalert2';
import { RiDeleteBin6Fill } from "react-icons/ri";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['requestToAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            console.log(res.data)
            return res.data;

        }

    });

    const handleAdmin = (user) => {

        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is Admin now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                }
                else {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is already Admin `,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })




    }
    const handleModerator = (user) => {

        axiosSecure.patch(`/users/moderator/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is Moderator now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                }
                else {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is already Moderator `,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })




    }

    const handleDelete = _id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/user/${_id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });

                        }
                        refetch()
                    })

            }
        });
    }

    return (
        <div className='container mx-auto'>

            <TitleAndSubheading title="Manage Users " ></TitleAndSubheading>



            {/* user form */}
            <div className='w-full'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>

                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th> Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                users.map((user, index) =>
                                    // console.log(item);
                                    <tr>

                                        <th>{index + 1}</th>

                                        <td>{user.name} </td>
                                        <td>{user.email}</td>
                                        <td>{user.role === 'admin' ? 'admin' : user.role === 'moderator' ? 'moderator' : 'user'}</td>
                                        <td>
                                            {/* {user.role === 'admin' ? 'Admin' : <button
                                                onClick={() => handleMakeAdmin(user._id)}
                                                className="btn text-black  "><FaUser className='text-[#D1A054]'></FaUser></button>} */}
                                            <button

                                                onClick={() => handleAdmin(user)}

                                                className="btn text-black  m-2">Make Admin</button>

                                            <button
                                                onClick={() => handleModerator(user)}
                                                className="btn text-black m-2">Make Moderator
                                            </button>

                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="btn text-red-400 mx-auto  "><RiDeleteBin6Fill />
                                            </button>
                                        </td>

                                        <td className="flex gap-2 m-2">


                                        </td>
                                    </tr>
                                )
                            }


                        </tbody>


                    </table>
                </div>
            </div>

        </div>
    );
};

export default ManageUsers;