import SubmitButton from "@/app/UIElements/FormElements/SubmitButton";
import TextArea from "@/app/UIElements/FormElements/TextArea";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  comment: string;
};

const CommentEditor = ({
  initialText = "",
  sendRequestFunction,
  editMode = false,
  secondaryFunction = () => {},
}: {
  initialText?: string;
  sendRequestFunction: Function;
  editMode?: boolean;
  secondaryFunction?: Function;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ hasError: boolean; text: string }>({
    hasError: false,
    text: "",
  });

  const { register, handleSubmit, reset, watch, setValue, getValues } =
    useForm<Inputs>({
      defaultValues: {
        comment: initialText,
      },
    });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      await sendRequestFunction(data.comment);
      reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        setError({ hasError: true, text: error.message });
      } else {
        setError({
          hasError: true,
          text: "There is some error in the server. Please try again.",
        });
      }
    }
    setIsLoading(false);
  });

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 100) {
      setValue("comment", e.target.value);
    } else {
      setValue("comment", getValues("comment"));
    }
  };

  useEffect(() => {
    if (error.hasError) {
      setTimeout(
        () => setError((perv) => (perv = { ...perv, hasError: false })),
        3000
      );
    }
  }, [error.hasError]);
  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={onSubmit}>
      <div className="relative">
        <TextArea
          register={{
            ...register("comment", { maxLength: 100, max: 100 }),
          }}
          name="comment"
          changeHandler={changeHandler}
        />
        <span className="absolute">{watch("comment").length}/100</span>
        {error.hasError && (
          <span className="absolute left-1/2 -translate-x-1/2 text-danger">
            {error.text}
          </span>
        )}
      </div>
      {editMode ? (
        <div className="flex gap-2 justify-end w-full">
          <button
            className="w-fit px-4  border border-primary rounded-full py-1.5 block hover:bg-primary hover:text-neutral text-xs"
            onClick={() => secondaryFunction()}
            type="button"
          >
            Cancel
          </button>
          <SubmitButton
            loading={isLoading}
            extraStyle="w-fit px-4 text-xs py-1.5 sm:text-xs"
            text="Update"
          />
        </div>
      ) : (
        <SubmitButton
          loading={isLoading}
          extraStyle="w-fit px-5 ml-auto"
          text="Submit"
        />
      )}
    </form>
  );
};

export default CommentEditor;
