import { useDispatch, useSelector } from "react-redux";
import StepButtons from "./StepButtons";
import { Button } from "@mui/material";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { submitForm } from "./MultipleFormSlice";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Review = () => {

    const formData = useSelector(store => store.formInfo.formData)
    const axiosSecure = useAxiosSecure()
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()

        axiosSecure.post('/add-event', formData)
            .then(res => {
                if (res.data) {
                    dispatch(submitForm())
                    toast.success('The Event has been successfully added!')
                    setTimeout(() => {
                        navigate('/dashboard/manage-event')
                    }, 1500)
                }
            })
            .catch(error => {
                toast.error(error.message)
            })

    }
    return (
        <div>
            <div className="border border-blue-400 rounded-lg my-10 p-2 md:p-5 lg:p-10">
                <h3 className="text-3xl text-center mb-5 font-semibold ">Please have a look before submitting</h3>
                <div>
                    <div className="space-y-5 grid">

                        <h3 className="font-semibold text-xl">Package Name: {formData.package}</h3>
                        <h3 className="font-semibold text-xl">Category: {formData.category}</h3>


                        <h3 className="font-semibold text-xl">Photography Team: {formData.photography}</h3>
                        <h3 className="font-semibold text-xl">Price: {formData.price}</h3>


                        <h3 className="font-semibold text-xl">Videography: {formData.videography}</h3>
                        <h3 className="font-semibold  text-xl">Features: {formData.features}</h3>
                    </div>
                    <h3 className="font-semibold mt-5 text-xl">Images:</h3>
                    <div className="flex flex-wrap my-5 gap-5">

                        {formData?.images?.map((image, index) => <img key={index} className="w-40 h-40 object-cover" src={image}></img>)}
                    </div>

                </div>
            </div>
            <div className="flex justify-end items-center">
                <StepButtons />
                <Button onClick={handleSubmit} type='submit' sx={{ fontSize: '16px', textTransform: 'none', border: '1px solid #3A86FF', backgroundColor: 'white', color: 'black', ':hover': { backgroundColor: 'pink', border: '1px solid pink' } }}>
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default Review;