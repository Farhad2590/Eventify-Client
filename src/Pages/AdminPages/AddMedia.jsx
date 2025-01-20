import React from 'react';
import TitleAndSubheading from '../../Shared/TitleAndSubheading';
import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import axios from 'axios';

const AddMedia = () => {
    const image_hosting_key = '7024c2b5ee1ff1d194a16bf99e0d57f7';
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    const axiosSecure = useAxiosSecure()

    const {
        control,
        setValue,
        register,
        handleSubmit,
        reset

    } = useForm();


    // '/uploadMedia',
    const onSubmit = async (data) => {
        console.log(data)
        console.log(data.category)
        // Step 1: Upload the image
        const formData = new FormData();
        formData.append('image', data.src[0]); // Append the file from input

        try {
            // Uploading image to the image hosting API
            const response = await axios.post(image_hosting_api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data)
            if (response.data.success) {
                const galleryItem = {
                    Category: data.category,
                    src: response.data.data.display_url

                }
                console.log(response.data.data.display_url)
                const addGallery = await axiosSecure.post('/uploadMedia', galleryItem);
                console.log(addGallery.data)
                if (addGallery.data.insertedId) {
                    reset();
                    Swal.fire({

                        icon: "success",
                        title: 'Media Added',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }


            else {
                console.error('Image upload failed:', response.data.message);
                alert('Failed to upload the image.');
            }

        } catch (error) {
            console.error('Error during image upload or saving category data:', error);
            alert('An error occurred while uploading the image or saving the category.');
        }
    };








    return (
        <div>
            <TitleAndSubheading title="Add Media Form"></TitleAndSubheading>




            {/* category */}

            {/* bg-[#cfe8fc] p-10 */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='bg-[#cfe8fc] p-10 '>
                    <div className="relative  my-2">
                        <p className='text-lancelot font-medium mb-2'>Select Category</p>
                        <select
                            id="id-04"
                            name="category"
                            required
                            className="peer relative h-10 w-full appearance-none rounded border border-slate-200 bg-white px-4 text-sm text-black outline-none transition-all focus:border-emerald-500 focus-visible:outline-none focus:focus-visible:outline-none disabled:cursor-not-allowed"
                            {...register('category', { required: true })}
                        >
                            <option disabled selected>Select Category</option>
                            <option value="Wedding">Wedding</option>
                            <option value="Concert">Concert</option>
                            <option value="Birthdays">Birthdays</option>
                            <option value="Festival">Festival</option>
                            <option value="Newyear">Newyear</option>
                            <option value="Conference">Conference</option>

                        </select>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="pointer-events-none absolute bottom-2.5 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-emerald-500 peer-disabled:cursor-not-allowed"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-labelledby="title-04 description-04"
                            role="graphics-symbol"
                        >
                            <title id="title-04">Arrow Icon</title>
                            <desc id="description-04">Arrow icon of the select list.</desc>
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    {/*<!-- End Rounded base basic select --> */}


                    {/*<!-- Component: Button large file input --> */}
                    <div className="relative my-6 inline-flex w-full items-center gap-2 rounded border border-slate-200 text-sm text-slate-500 bg-white">
                        <input
                            id="file-upload"
                            name="src"
                            type="file"
                            className="peer order-2 [&::file-selector-button]:hidden "

                            {...register('src', { required: true })}
                        />
                        <label
                            for="file-upload"
                            className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded bg-blue-500 px-6 text-sm font-medium tracking-wide text-white transition duration-300   focus-visible:outline-none peer-disabled:cursor-not-allowed "
                        >
                            {" "}
                            Upload a file{" "}
                        </label>
                    </div>
                    {/*<!-- End Button large file input --> */}

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type='submit'
                    >
                        SAVE
                    </Button>


                    {/* <input type="submit" value="Add Media" className="btn   text-white bg-green-400 " /> */}

                </div>
            </form>




        </div>
    );
};

export default AddMedia;