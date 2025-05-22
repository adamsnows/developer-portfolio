import { RiHomeFill, RiMailFill } from "react-icons/ri";

import Form from "@/components/Other/Form/Form";

const Contact = () => {
  return (
    <section>
      <div className="container mx-auto">
        <div
          className="grid xl:grid-cols-2 pt-12 xl:h-[480px]
        xl:mb-24"
        >
          <div className="flex flex-col justify-center">
            <div
              className="flex items-center gap-x-4 text-primary
            text-lg mb-4"
            >
              <span className="w-[30px] h-[2px] bg-primary"></span>
              Hey, Adam!
            </div>
            <h1 className="h1 max-w-md mb-8">Let&apos;s work together?</h1>
            <p className="subtitle max-w-[400px]">
              Ready to turn ideas into reality? Whether it&apos;s a project, a
              collaboration, or just to say hi, leave a message below. I&apos;m
              all ears and looking forward to starting this journey together!
            </p>
          </div>
          <div
            className="hidden xl:flex w-full
          bg-contact_illustration
          bg-contain bg-top bg-no-repeat"
          ></div>
        </div>
        <div className="grid xl:grid-cols-2 mb-24 xl:mb-32">
          <div
            className="flex flex-col gap-y-4 xl:gap-y-14
          mb-12 xl:mb-24 text-base xl:text-lg"
          >
            <div className="flex items-center gap-x-8">
              <RiMailFill size={18} className="text-primary" />
              <div>adamangelow@gmail.com</div>
            </div>
            <div className="flex items-center gap-x-8">
              <RiHomeFill size={18} className="text-primary" />
              <div>Natal, RN, Brazil</div>
            </div>
          </div>
          <Form />
        </div>
      </div>
    </section>
  );
};

export default Contact;
