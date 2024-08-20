/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import useEditCabin from "./useEditCabin";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";

function CreateCabinForm({cabinToEdit={},onCloseModal}) {


 const {id:editId, ...editValues}= cabinToEdit;
 const {isCreating,createCabin} = useCreateCabin()
  const {isEditing,editCabin} = useEditCabin();
 const isEditSession = Boolean(editId)

  const {register,handleSubmit,reset,getValues,formState}= useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const {errors}= formState;
  
     
  const isWorking = isCreating || isEditing;

  function onSubmit(data){
    const image= typeof data.image === "string" ? data.image :data.image[0]
    if(isEditSession) editCabin({newCabinData:{...data,image},id:editId},{
      onSuccess:(data)=>{
        reset();
        onCloseModal?.()
      }
    })
      
    else createCabin({...data,image:image}
      ,{  onSuccess:(data)=>{
        reset();
        onCloseModal?.()
      }});
    
  }

  function onError(errors) {
    // console.log(errors)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit,onError)} type={onCloseModal? "Modal":"regular"}>
       <FormRow label="Cabin Name" error={errors?.name?.message}>
             <Input type="number" id="name" {...register("name",{
              required:"This field is required",
             })} disabled={isCreating}
             />
        </FormRow>
    
        <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
             <Input type="number" id="maxCapacity" {...register("maxCapacity",{
              required:"This field is required",
              min:{
                value:1,
                message:"Capacity should be at least 1"
              },
          
             })} disabled={isWorking}/>
        </FormRow>

        <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
             <Input type="number" id="regularPrice" {...register("regularPrice",{
              required:"This field is required",
              min:{
                value:1,
                message:"Price should be at least 1"
              },
             })} disabled={isWorking} />
        </FormRow>

        <FormRow label="Discount" error={errors?.discount?.message}>
             <Input type="number" id="discount" defaultValue={0} {...register("discount",{
              required:"This field is required",
              validate: (value)=>
               value <= getValues().regularPrice || "Discount should be less than Regular price"

             })} disabled={isWorking} />
        </FormRow>
        <FormRow label="Description of Cabin" error={errors?.description?.message}>
             <Textarea id="description" {...register("description",{
              required:"This field is required",
             })} disabled={isWorking}/>
        </FormRow>

        <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false:   "This field is required",
          })}
        />
      </FormRow>
    
        <FormRow>
            <Button variation="secondary" type="reset" onClick={()=>onCloseModal?.()}>Cancel</Button>
            <Button disabled={isWorking}>{isEditSession ? "Edit Cabin":"Create New Cabin"}</Button>
        </FormRow>
    </Form>
  );
}
export default CreateCabinForm;