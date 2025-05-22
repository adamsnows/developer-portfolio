import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  RiArrowRightFill,
  RiMailFill,
  RiMessageFill,
  RiUserFill,
} from "react-icons/ri";

import { Button } from "@/components/Other/UI/button";
import { Input } from "@/components/Other/UI/input";
import { Textarea } from "@/components/Other/UI/textarea";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/router";
import { toast } from "sonner";

export type FormData = {
  name: string;
  message: string;
  email: string;
};

const Form: FC = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const router = useRouter();

  const onSendSubmit: SubmitHandler<FormData> = async (data) => {
    const templateParams = {
      name: data.name,
      message: data.message,
      email: data.email,
      url: window.location.href,
    };

    const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      throw new Error("Environment variables are not set correctly.");
    }

    try {
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      if (response.status === 200) {
        reset();
        toast.success("Your message has been sent successfully! Thank you");
        router.push("/");
      } else {
        toast.error(response.text);
      }
    } catch (error) {
      toast.error(
        "An error occurred while sending the form. Please try again later."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSendSubmit)}
      className="flex flex-col gap-y-4"
    >
      <div className="relative flex items-center">
        <Input
          type="name"
          id="name"
          placeholder="Name"
          {...register("name", { required: true })}
        />
        <RiUserFill className="absolute right-6" size={20} />
      </div>
      <div className="relative flex items-center">
        <Input
          type="email"
          id="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        <RiMailFill className="absolute right-6" size={20} />
      </div>
      <div className="relative flex items-center">
        <Textarea
          placeholder="Type your message"
          {...register("message", { required: true })}
        />
        <RiMessageFill className="absolute top-4 right-6" size={20} />
      </div>
      <Button className="flex items-center gap-x-1 max-w-[166px]">
        Send
        <RiArrowRightFill size={20} />
      </Button>
    </form>
  );
};

export default Form;
