import { motion } from "framer-motion";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Other/UI/card";

import { reviewsData } from "@/data/reviews";

const formatReviewText = (text: string) => {
  const highlightKeywords = (text: string) => {
    const keywords = [
      "excelente",
      "incrível",
      "talentoso",
      "habilidade",
      "profissional",
      "comunicação",
      "conhecimento",
      "inovadoras",
      "proativo",
      "dedicado",
      "capacitado",
    ];

    const regex = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");

    return text.split(" ").map((word, i) => {
      const cleanWord = word.replace(/[.,!?;:]/g, "").toLowerCase();
      if (keywords.includes(cleanWord)) {
        return (
          <span key={i} className="text-primary font-medium">
            {word}{" "}
          </span>
        );
      }
      return word + " ";
    });
  };

  if (text.length > 100 && !text.includes("\n")) {
    const sentences = text.split(/(?<=[.!?])\s+/);

    const paragraphs = [];
    for (let i = 0; i < sentences.length; i += 2) {
      const paragraph = sentences.slice(i, i + 2).join(" ");
      paragraphs.push(paragraph);
    }

    return paragraphs.map((p, index) => (
      <p key={index} className={index !== 0 ? "mt-3" : ""}>
        {highlightKeywords(p)}
      </p>
    ));
  }

  return text.split("\n").map((paragraph, index) => (
    <p key={index} className={index !== 0 ? "mt-3" : ""}>
      {highlightKeywords(paragraph)}
    </p>
  ));
};

const Reviews = () => {
  return (
    <section className="py-10 mb-12 xl:mb-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-40"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-0 w-80 h-80 bg-secondary/10 rounded-full filter blur-3xl opacity-40"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl opacity-30"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.2, 0.4, 0.2],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2,
          }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false, amount: 0.3 }}
          className="section-title mb-12 text-center mx-auto bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-300%"
        >
          LINKEDIN FEEDBACKS
        </motion.h2>

        <div className="relative mx-auto max-w-[1200px]">
          {/* Destaques visuais para o carrossel */}
          <motion.div
            className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none z-0"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none z-0"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1,
            }}
          />

          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 20,
              stretch: 25,
              depth: 250,
              modifier: 1.5,
              slideShadows: true,
            }}
            // autoplay={{
            //   delay: 7000,
            //   disableOnInteraction: false,
            //   pauseOnMouseEnter: true,
            // }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              horizontalClass: "swiper-pagination-horizontal",
            }}
            navigation={true}
            loop={true}
            speed={700}
            modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
            className="h-fit rounded-xl relative z-10 p-6 pb-14 my-6 mx-4"
          >
            {reviewsData.map((person: any, index: number) => {
              return (
                <SwiperSlide
                  key={index}
                  style={{ width: "400px", height: "auto" }}
                  className="rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                >
                  <motion.div transition={{ duration: 0.3 }}>
                    <Card className="border border-white/10 shadow-lg p-6 pt-5 min-h-[400px] overflow-hidden hover:shadow-primary/10 hover:shadow-xl transition-all duration-300">
                      <CardHeader className="p-0 mt-4 mb-4">
                        <div className="flex items-center gap-x-5">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-secondary/40 rounded-full blur-md opacity-75"></div>
                            <Image
                              src={person.avatar}
                              width={80}
                              height={80}
                              alt={`Foto de ${person.name}`}
                              className="rounded-full relative border-2 border-white/20"
                            />
                          </div>

                          <div className="flex flex-col">
                            <CardTitle className="text-xl text-white">
                              {person.name}
                            </CardTitle>
                            <p className="text-sm text-white/70">
                              {person.job}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardDescription className="text-white/90 leading-relaxed text-sm overflow-y-auto max-h-[230px] pr-2 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent relative">
                        <div className="relative">
                          {formatReviewText(person.review)}
                          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
                        </div>
                      </CardDescription>

                      <div className="absolute top-4 left-4 opacity-30">
                        <svg
                          width="36"
                          height="36"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="rotate-180 text-primary"
                        >
                          <path
                            d="M9.5 8.5L8 14.5L4 17.5L3 16L6 13.5L7 9L9.5 8.5ZM19.5 8.5L18 14.5L14 17.5L13 16L16 13.5L17 9L19.5 8.5Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>

                      <div className="absolute bottom-4 right-4 opacity-30">
                        <svg
                          width="36"
                          height="36"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-secondary"
                        >
                          <path
                            d="M9.5 8.5L8 14.5L4 17.5L3 16L6 13.5L7 9L9.5 8.5ZM19.5 8.5L18 14.5L14 17.5L13 16L16 13.5L17 9L19.5 8.5Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </Card>
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
