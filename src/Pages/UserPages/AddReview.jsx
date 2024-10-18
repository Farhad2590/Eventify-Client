import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TitleAndSubheading from "../../Shared/TitleAndSubheading";
import useAuth from "../../hooks/useAuth";
import RateReviewIcon from '@mui/icons-material/RateReview';
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Modal } from "@mui/material";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import { toast } from "react-toastify";


const AddReview = () => {
    const axiosSecure = useAxiosSecure()
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(0);
    const [event, setEvent] = useState(null)
    const navigate = useNavigate()

    const handleOpen = (data) => {
        setEvent(data)
        setOpen(true)
    };
    const handleClose = () => setOpen(false);
    const { user } = useAuth()

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
            user_name: user.displayName,
            photo: user.photoURL,
            rating: rating,
            review: message,
            user_email: user?.email
        }

        axiosSecure.post('/add-review', review)
            .then(res => {
                if (res) {
                    e.target.reset()
                    setRating(0)
                    toast.success('Review has been successfully added')
                    setTimeout(() => {
                        navigate('/dashboard/user/reviews')
                    }, 1500)
                }
            })

    }

    useEffect(() => {
        axiosSecure.get(`/completedEvents/${user?.email}`)
            .then(res => {
                const filter = res?.data.filter(event => event.review === "")
                setData(filter)
            })
            .catch(error => {
                console.log(error);
            })

    }, [])
    return (
        <div className="w-full mx-auto">
            <TitleAndSubheading title="Add Review"></TitleAndSubheading>

            <table className="w-full text-left border border-separate rounded border-slate-200" cellSpacing="0">
                <tbody>
                    <tr>
                        <th scope="col" className="h-12 px-6 text-sm font-medium text-center border-l first:border-l-0 stroke-slate-700 text-white bg-blue-500">Event Name</th>
                        <th scope="col" className="h-12 px-6 text-sm font-medium text-center border-l first:border-l-0 stroke-slate-700 text-white bg-blue-500">Event Price</th>
                        <th scope="col" className="h-12 px-6 text-sm font-medium text-center border-l first:border-l-0 stroke-slate-700 text-white bg-blue-500">Email</th>
                        <th scope="col" className="h-12 px-6 text-sm font-medium text-center border-l first:border-l-0 stroke-slate-700 text-white bg-blue-500">Review</th>

                    </tr>
                    {
                        data?.map((d) => {
                            return <tr key={d._id}>
                                <th scope="row" className="h-12 px-6 text-sm text-center transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{d?.package_name}</th>
                                <td className="h-12 text-center px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{d?.price}</td>
                                <td className="h-12 text-center px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{user?.email}</td>
                                <td className="h-12 flex items-center justify-center px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 "><Button onClick={() => handleOpen(d)}><RateReviewIcon className="text-2xl " /></Button></td>
                            </tr>
                        })
                    }

                </tbody>
            </table>
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
                                <h2 className="text-3xl font-semibold text-center">Your opinion matters!</h2>
                                <div className="flex flex-col items-center py-6 space-y-3">
                                    <span className="text-center">How was your experience?</span>
                                    <div>
                                        <Rating

                                            style={{ maxWidth: 180 }}
                                            value={rating}
                                            onChange={setRating}
                                        />
                                    </div>
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
        </div>
    );
};

export default AddReview;