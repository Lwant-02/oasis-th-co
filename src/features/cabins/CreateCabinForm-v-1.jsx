import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabin";
import toast from "react-hot-toast";
import StyledFormRow from "../../ui/FormRow";

function CreateCabinForm() {
  //Use React Hook Form
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created!");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }

  //Just want to know that this is exist
  function onError(error) {
    // console.log(error);
  }
  //Here when the err is got, the handleSubmit will not call onSubmit and will call onError instead!
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <StyledFormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required!" })}
        />
      </StyledFormRow>

      <StyledFormRow
        label="Maximum capacity"
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required!",
            min: {
              value: 1,
              message: "Capacity should be at least 1!",
            },
          })}
        />
      </StyledFormRow>

      <StyledFormRow
        label="Regular price"
        error={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required!",
            min: {
              value: 1,
              message: "Capacity should be at least 1!",
            },
          })}
        />
      </StyledFormRow>

      <StyledFormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          {...register("discount", {
            required: "This field is required!",
            validate: (value) =>
              Number(getValues().regularPrice) > Number(value) ||
              "Discount should be less than regular price",
          })}
        />
      </StyledFormRow>

      <StyledFormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required!" })}
        />
      </StyledFormRow>

      <StyledFormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", { required: "This field is required!" })}
        />
      </StyledFormRow>

      <StyledFormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Add cabin</Button>
      </StyledFormRow>
    </Form>
  );
}

export default CreateCabinForm;
