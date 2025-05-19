import Image from "next/image";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Other/UI/card";

import { reviewsData } from "@/data/reviews";

const Reviews = () => {
  return (
    <section className="py-10 mb-12 xl:mb-20 relative overflow-hidden">
      {/* Background decoration */}
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
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/4 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl opacity-30"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.2, 0.4, 0.2],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
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
          FEEDBACKS
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
              rotate: 10,
              stretch: 0,
              depth: 100,
              modifier: 2,
              slideShadows: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            loop={true}
            speed={700}
            modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
            className="h-fit p-6 pb-16 mx-2"
          >
            {reviewsData.map((person: any, index: number) => {
              return (
                <SwiperSlide
                  key={index}
                  style={{ width: "400px", height: "auto" }}
                  className="rounded-xl overflow-hidden"
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-secondary/20 border border-white/10 backdrop-blur-sm shadow-lg p-6 min-h-[400px] overflow-hidden hover:shadow-primary/10 hover:shadow-xl transition-all duration-300">
                      <CardHeader className="p-0 mb-6">
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
                            <CardTitle className="text-xl text-white">{person.name}</CardTitle>
                            <p className="text-sm text-white/70">{person.job}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardDescription className="text-white/80 leading-relaxed text-sm overflow-y-auto max-h-[280px] pr-2 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent">
                        {person.review}
                      </CardDescription>
                      
                      <div className="absolute bottom-4 right-4 opacity-20">
                        <svg 
                          width="32" 
                          height="32" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
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
