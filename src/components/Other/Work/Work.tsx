import { motion, useAnimation } from "framer-motion";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import "swiper/css";
import "swiper/css/effect-coverflow";
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
  fadeInRight,
  fadeInUp,
  staggerContainer,
} from "@/components/Animations/AdvancedTransition";
import ProjectCard from "@/components/Other/ProjectCard/ProjectCard";
import { Button } from "@/components/Other/UI/button";
import { workData } from "@/data/work";
import {
  RiArrowRightLine,
  RiCodeBoxLine,
  RiDatabase2Line,
} from "react-icons/ri";

const Work = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
  }, [controls, inView]);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        {
          backgroundPositionX: "0%",
        },
        {
          backgroundPositionX: "100%",
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "linear",
        }
      );
    }
  }, []);

  return (
    <section className="relative py-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>
      </div>

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="initial"
        animate={controls}
        className="container mx-auto xl:flex xl:justify-between relative z-10"
      >
        <motion.div
          variants={fadeInUp}
          className="max-w-[400px] mx-auto my-auto
          xl:mx-0 text-center xl:text-left xl:h-fit
          flex flex-col justify-center items-center xl:justify-center
          xl:items-start"
        >
          <h2
            ref={titleRef}
            className="section-title mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-300%"
          >
            ÚLTIMOS PROJETOS
          </h2>
          <p className="text-sm mb-8 leading-relaxed">
            Cada projeto reflete um compromisso com a{" "}
            <span className="text-primary font-medium">inovação</span>,{" "}
            <span className="text-primary font-medium">eficiência</span> e uma
            experiência de usuário excepcional, demonstrando habilidades
            abrangentes e um entendimento profundo das necessidades de
            desenvolvimento moderno.
          </p>

          <div className="mb-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                variants={fadeInUp}
                className="flex items-start py-4 p-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <RiCodeBoxLine className="text-primary text-xl mt-1 mr-1 w-20" />
                <div>
                  <h3 className="font-medium mb-1">Front-End Expertise</h3>
                  <p className="text-xs text-white/70">
                    Interfaces avançadas com React, Next.js e animações
                    sofisticadas
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="flex items-start p-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <RiDatabase2Line className="text-primary text-xl mt-1 mr-1 w-20" />
                <div>
                  <h3 className="font-medium mb-1">Back-End Robusto</h3>
                  <p className="text-xs text-white/70">
                    APIs eficientes, bancos de dados otimizados e arquitetura
                    escalável
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          <Link
            className="mt-auto group mx-auto"
            href="/projects"
            aria-label="projetos"
          >
            <Button className="gap-x-2">
              TODOS PROJETOS{" "}
              <RiArrowRightLine className="transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          variants={fadeInRight}
          className="xl:max-w-[780px] top-0 mt-10 xl:mt-0 overflow-visible"
        >
          <div className="relative">
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
              className="h-fit rounded-xl relative z-10 p-6 pb-14 my-6 mx-4"
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
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
                horizontalClass: "swiper-pagination-horizontal",
              }}
              navigation={true}
              loop={true}
              speed={800}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            >
              {workData.slice(0, 6).map((project: any, index: number) => {
                return (
                  <SwiperSlide
                    key={index}
                    style={{ width: "320px", height: "auto" }}
                    className="rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                  >
                    <motion.div transition={{ duration: 0.3 }}>
                      <ProjectCard project={project} />
                    </motion.div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Work;
