import { createSlice } from "@reduxjs/toolkit"

const initialData = {
        formData: {},
        currentStep: 1
    }

export const formSlice = createSlice({
    name: 'form',
    initialState: initialData,
    reducers: {
        submitFirstForm: (state,actions)=>{
            state.formData = {...state.formData, ...actions.payload}
        },
        submitSecondForm: (state,actions)=>{
            state.formData = {...state.formData,images:actions.payload}
        },
        submitForm: (state)=>{
            state.formData = {},
            state.currentStep = 1
        },
        
        setCurrentStep: (state,actions)=>{
            state.currentStep = actions.payload;
        }
    }
})


export const {submitFirstForm, submitSecondForm,submitForm ,setCurrentStep} = formSlice.actions;
export default formSlice.reducer;