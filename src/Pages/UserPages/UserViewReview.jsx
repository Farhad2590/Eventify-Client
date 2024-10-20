import React, { useEffect, useState } from 'react';
import TitleAndSubheading from '../../Shared/TitleAndSubheading';
import { Box, Button, Modal } from '@mui/material';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useAuth from '../../hooks/useAuth';
import { Rating, ThinRoundedStar } from '@smastrom/react-rating';

const UserViewReview = () => {
    const axiosSecure = useAxiosSecure()
    const [open, setOpen] = useState(false)
    const [reviews, setReviews] = useState([])
    const [singleReview, setSingleReview] = useState(null)
    const { user } = useAuth()
    console.log('single', singleReview);

    const handleOpen = (review) => {
        console.log(review);

        setSingleReview(review)
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
    const myStyles = {
        itemShapes: ThinRoundedStar,
        activeFillColor: '#3A86FF',
        inactiveFillColor: '#3A86FF50',
    }

    useEffect(() => {
        if (user) {
            axiosSecure.get(`/review/${user?.email}`)
                .then(res => {
                    setReviews(res?.data)
                })
                .catch(err => {
                    console.log(err);

                })
        }

    }, [])

    return (
        <div className="w-full mx-auto">
            <TitleAndSubheading title="View Reviews"></TitleAndSubheading>

            <table className="w-full text-left border border-separate rounded border-slate-200" cellSpacing="0">
                <tbody>
                    <tr>
                        <th scope="col" className="h-12 px-6 text-sm font-medium text-center border-l first:border-l-0 stroke-slate-700 text-white bg-blue-500">Event Name</th>
                        <th scope="col" className="h-12 px-6 text-sm font-medium text-center border-l first:border-l-0 stroke-slate-700 text-white bg-blue-500">Email</th>
                        <th scope="col" className="h-12 px-6 text-sm font-medium text-center border-l first:border-l-0 stroke-slate-700 text-white bg-blue-500">Review</th>

                    </tr>
                    {
                        reviews?.map((review) => {
                            return <tr key={review._id}>
                                <th scope="row" className="h-12 px-6 text-sm text-center transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{review?.event_name}</th>
                                <td className="h-12 text-center px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{user?.email}</td>
                                <td className="h-12 flex items-center justify-center px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 "><Button onClick={() => handleOpen(review)}><VisibilityIcon className="text-2xl " /></Button></td>

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
                    <div className="flex flex-col max-w-xl p-8 shadow-sm rounded-xl lg:p-12 dark:bg-gray-50 dark:text-gray-800">
                        <div className="flex flex-col items-center w-full">
                            <h2 className="text-3xl font-semibold text-center">Your opinion matters!</h2>
                            <div className="flex flex-col items-center py-6 space-y-3">
                                <span className="text-center">How was your experience?</span>
                                <div>
                                    <Rating
                                        itemStyles={myStyles}
                                        style={{ maxWidth: 180 }}
                                        value={singleReview?.rating}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col w-full">
                                <textarea value={singleReview?.review} rows="4" name="review" placeholder="Message..." className="p-4 rounded-md border border-black resize-none dark:text-gray-800 dark:bg-gray-50"></textarea>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default UserViewReview;