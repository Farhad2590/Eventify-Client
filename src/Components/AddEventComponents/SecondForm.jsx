import {  useState } from "react";
import StepButtons from "./StepButtons";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep, submitSecondForm } from "./MultipleFormSlice";

import axios from "axios";

const SecondForm = () => {
    const selectedImages = useSelector(store => store.formInfo.formData.images)
    const currentStep = useSelector(store => store.formInfo.currentStep)
    const [isLoading,setIsLoading] = useState(false)
    const [images, setImages] = useState(selectedImages || [])
    const { handleSubmit } = useForm()
    
    
    const dispatch = useDispatch()
    const handleImage = async e => {
        setIsLoading(true)
        const files = Array.from(e.target.files);
        console.log('before', files);
        
                 const imageArray = files.map(async file => {
                    const formData = new FormData()
                    formData.append('image', file)
                    try {
                        await axios.post('https://api.imgbb.com/1/upload?key=df7d8ca9de8439e27997113848057067', formData)
                    .then(res=>
                       setImages(((prevImages)=>[...prevImages, res.data.data.url]))
                    )
                        
                    } catch (error) {
                       if(error){
                        return null
                       }
                        
                    }

                    
                 }
                 )
                 
                await Promise.all(imageArray)
                 setIsLoading(false)
                    console.log(images);

    }

    async function processData() {

        dispatch(setCurrentStep(currentStep + 1))
        dispatch(submitSecondForm(images))
    }
    console.log(images);

    return (
        <div className="m-10">
            <h3 className="text-center text-3xl">Event Image Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5 gap-5">
                {
                    images?.map((image, index) => <img key={index} className="h-56 rounded-md w-56 object-cover" src={image} alt='image' />)
                }
                {
                    isLoading && <p className="text-center text-2xl">Images are uploading...</p>
                }
            </div>
            <form onSubmit={handleSubmit(processData)}>
                <input onChange={handleImage} multiple type="file" className="file-input file-input-bordered file-input-info w-full max-w-xs" />
                <StepButtons handleSubmit={handleSubmit(processData)} />
            </form>
        </div>
    );
};

export default SecondForm;