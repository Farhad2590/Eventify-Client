import useAxiosSecure from "../../hooks/useAxiosSecure";
import TitleAndSubheading from "../../Shared/TitleAndSubheading";
import { useQuery } from "@tanstack/react-query";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from "react-router-dom";
import PreviewIcon from '@mui/icons-material/Preview';
import { Box, Modal, Button } from "@mui/material";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import FeedbackIcon from '@mui/icons-material/Feedback';



const ModeratorFeedback = () => {
    const axiosSecure = useAxiosSecure();
    const [open, setOpen] = useState(false)
    const { user } = useAuth()
    const [event, setEvent] = useState(null)
    const { data, refetch } = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/events')
            return data

        }
    })
    const handleOpen = (data) => {
        setEvent(data)
        setOpen(true)
    };
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const message = e.target.review.value;

        const review = {
            eventId: event?._id,
            event_name: event?.package_name,
            moderator_name: user.displayName,
            feedback: message,
            moderator_email: user?.email
        }
        console.log(review);
        

        axiosSecure.post('/add-feedback', review)
            .then(res => {
                if (res) {
                    e.target.reset()
                    toast.success('Review has been successfully added')
                    setOpen(false)
                }
            })

    }
    return (
        <div className="container mx-auto">
            <TitleAndSubheading title="Feedback"></TitleAndSubheading>
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
                                        <ul tabIndex={0} className="dropdown-content border border-blue-500 menu bg-base-100 space-y-1  rounded-box z-[1] w-40 p-2 shadow text-white">
                                            <li><Link className="btn bg-blue-500 text-white" to={`/events/${d?._id}`}><PreviewIcon className="text-2xl" />View</Link></li>
                                            <li className="bg-blue-500 text-white rounded-lg">
                                                <Button onClick={()=> handleOpen(d)} color="white" className="btn  text-white"><FeedbackIcon className="text-2xl text-white" />Feedback</Button>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box border={2} borderRadius={2} borderColor={'#3A86FF'} sx={style}>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col max-w-xl p-8 shadow-sm rounded-xl lg:p-12 dark:bg-gray-50 dark:text-gray-800">
                                    <div className="flex flex-col items-center w-full">
                                        <h2 className="text-3xl font-semibold text-center">Feedback!</h2>
                                        <div className="flex flex-col items-center py-6 space-y-3">
                                            <span className="text-center">Please share anything you want about the event?</span>
                                        </div>
                                        <div className="flex flex-col w-full">
                                            <textarea rows="4" name="review" placeholder="Message..." className="p-4 rounded-md border border-black resize-none dark:text-gray-800 dark:bg-gray-50"></textarea>
                                            <input className="border w-full mt-5 px-4 py-3 rounded-lg hover:opacity-50 bg-[#3A86FF]  text-white text-lg font-medium" type="submit" value="Submit" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </Box>
                    </Modal>

                </table>
            </div>
        </div>
    );
};

export default ModeratorFeedback;