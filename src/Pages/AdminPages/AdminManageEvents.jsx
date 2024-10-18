import useAxiosSecure from "../../hooks/useAxiosSecure";
import TitleAndSubheading from "../../Shared/TitleAndSubheading";
import { useQuery } from "@tanstack/react-query";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from "react-router-dom";
import PreviewIcon from '@mui/icons-material/Preview';
import { MdDeleteForever } from "react-icons/md";
import EditIcon from '@mui/icons-material/Edit';
import Swal from "sweetalert2";



const AdminManageEvents = () => {
    const axiosSecure = useAxiosSecure();
    const { data, refetch } = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/events')
            return data

        }
    })

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            iconColor: "#3A86FF",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-event/${id}`)
                    .then(res => {
                        if (res) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                                iconColor: "#3A86FF"
                            })
                        }
                    })
            }
        });
    }

    return (
        <div className="container mx-auto">
            <TitleAndSubheading title="Manage Events"></TitleAndSubheading>
            <div className="p-6 overflow-scroll px-0">
                <table className="mt-4 w-full table-auto ">
                    <thead>
                        <tr>
                            {["Event", "Category", "Price", "Actions"].map((head) => (
                                <th key={head} className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                    <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                                        {head}
                                    </p>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((d, index) => (
                            <tr key={index}>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{d.package_name}</p>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{d.category}</p>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{d.price}</p>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <div className="dropdown dropdown-end">
                                        <div tabIndex={0} role="button" className="btn m-1"><MoreHorizIcon /></div>
                                        <ul tabIndex={0} className="dropdown-content border border-blue-500 menu bg-base-100 space-y-1  rounded-box z-[1] w-40 p-2 shadow">
                                            <li><Link className="btn bg-blue-500 text-white" to={`/events/${d?._id}`}><PreviewIcon className="text-2xl" />View</Link></li>
                                            <li><Link to={`/dashboard/edit-event/${d?._id}`} className="btn bg-blue-500  text-white"><EditIcon className="text-2xl " />Edit</Link></li>
                                            <li><button onClick={() => handleDelete(d?._id)} className="btn bg-blue-500 text-white"><MdDeleteForever className="text-2xl " />Delete</button></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AdminManageEvents;