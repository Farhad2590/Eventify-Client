import React from 'react';
import TitleAndSubheading from '../../Shared/TitleAndSubheading';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import Swal from 'sweetalert2';

const ManageMedia = () => {
    const axiosSecure = useAxiosSecure()
    const { refetch, data: media = [] } = useQuery({
        queryKey: ['manageMedia'],
        queryFn: async () => {
            const res = await axiosSecure.get('/gallery')
            console.log(res.data)
            return res.data;
        }
    });

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
                axiosSecure.delete(`/media/${_id}`)
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
        <div className=' mx-auto'>
            <TitleAndSubheading title="Manage Media "></TitleAndSubheading>

            <div className='w-full'>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Category</th>
                                <th>Image</th>

                                {/* <th>Action</th> */}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {media.map((media, index) => (
                                <tr key={media._id}>
                                    <th>{index + 1}</th>
                                    <td>{media.Category}</td>
                                    <td><img className='w-[220px]' src={media.src} alt="" />
                                    </td>
                                    {/* <td>{user.email}</td> */}
                                    {/* <td>{user.role}</td> */}

                                    <td>
                                        <button
                                            onClick={() => handleDelete(media._id)}
                                            className="btn text-red-400 mx-auto"
                                        >
                                            <RiDeleteBin6Fill />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageMedia;