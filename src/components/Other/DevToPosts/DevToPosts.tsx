import { motion, useAnimation } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
  fadeInLeft,
  fadeInUp,
  staggerContainer,
} from "@/components/Animations/AdvancedTransition";
import { Button } from "@/components/Other/UI/button";
import { devtoPostsData } from "@/data/devtoPosts";
import { fetchDevtoPosts } from "@/services/devto";
import {
  RiArrowRightLine,
  RiArticleLine,
  RiHeart3Fill,
  RiMessageLine,
} from "react-icons/ri";

interface Post {
  title: string;
  cover: string;
  tags: string[];
  date: string;
  reactions: number;
  comments: number;
  url: string;
  excerpt: string;
}

const DevToPostCard = ({ post }: { post: Post }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden h-full shadow-xl">
      <div className="relative h-40 overflow-hidden">
        <Image
          src={post.cover || "/projects/devto-default.png"}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          width={500}
          height={200}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "/projects/devto-default.png";
            console.log(
              "Erro ao carregar imagem, usando fallback:",
              post.cover
            );
          }}
          unoptimized={
            post.cover?.includes("dev.to") ||
            post.cover?.includes("amazonaws.com")
          }
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {post.tags.slice(0, 2).map((tag: string, idx: number) => (
            <span
              key={idx}
              className="text-xs font-medium bg-primary/90 px-2 py-1 rounded text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-4 bg-slate-800 relative z-10">
        <h3 className="font-semibold mb-2 text-sm h-10 line-clamp-2 text-white">
          {post.title}
        </h3>
        <p className="text-xs text-gray-300 mb-3 h-12 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <RiHeart3Fill className="text-red-500" />
              <span>{post.reactions}</span>
            </div>
            <div className="flex items-center gap-1">
              <RiMessageLine className="text-primary" />
              <span>{post.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DevToPosts = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const titleRef = useRef<HTMLHeadingElement>(null);

  const [posts, setPosts] = useState<Post[]>(devtoPostsData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [initialSlide, setInitialSlide] = useState<number>(1);
  const [swiperInstance, setSwiperInstance] = useState<null>(null);

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

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedPosts = await fetchDevtoPosts("adamsnows");
        if (fetchedPosts.length > 0) {
          setPosts(fetchedPosts);
          // Definir o slide inicial como 1 (o segundo post) para garantir que sempre haja um slide à esquerda
          const initialSlideNumber = Math.min(
            Math.max(fetchedPosts.length > 3 ? 1 : 0, 1),
            fetchedPosts.length - 1
          );
          setInitialSlide(initialSlideNumber);
        }
      } catch (err) {
        console.error("Erro ao buscar posts do DEV.TO:", err);
        setError(
          "Não foi possível carregar os artigos. Usando dados locais como fallback."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Atualiza o Swiper quando os posts são carregados ou quando o swiperInstance muda
  useEffect(() => {
    if (swiperInstance && !isLoading && posts.length > 0) {
      // Maior timeout para garantir que o DOM está totalmente renderizado
      const timer = setTimeout(() => {
        try {
          swiperInstance.update();
          swiperInstance.slideToLoop(initialSlide, 0, false);
        } catch (e) {
          console.warn("Erro ao atualizar o swiper:", e);
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [swiperInstance, posts, isLoading, initialSlide]);

  return (
    <section className="relative pt-[170px] overflow-visible">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="initial"
        animate={controls}
        className="container pb-[100px] -mb-10 mx-auto xl:flex xl:flex-row-reverse xl:justify-between relative z-10 overflow-visible"
      >
        <motion.div
          variants={fadeInUp}
          className="max-w-[400px] mx-auto mb-8 xl:mb-0
          xl:mx-0 text-center xl:text-right xl:h-fit
          flex flex-col justify-center items-center xl:justify-center
          xl:items-end"
        >
          <h2
            ref={titleRef}
            className="section-title mb-4 bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent bg-300%"
          >
            PUBLICAÇÕES
          </h2>
          <p className="text-sm mb-8 leading-relaxed">
            Compartilho meus conhecimentos e experiências através de artigos no{" "}
            <span className="text-primary font-medium">DEV.TO</span>, abordando
            temas relevantes sobre{" "}
            <span className="text-primary font-medium">
              desenvolvimento web
            </span>{" "}
            e boas práticas de programação.
          </p>

          <div className="mb-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                variants={fadeInUp}
                className="flex flex-row-reverse items-start p-3 py-4 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <RiArticleLine className="text-secondary text-xl mt-1 ml-1 w-20" />
                <div className="text-right">
                  <h3 className="font-medium mb-1">Artigos Técnicos</h3>
                  <p className="text-xs text-white/70">
                    Tutoriais, dicas e melhores práticas para desenvolvimento
                    web
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="flex flex-row-reverse items-start p-3 py-4 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <RiArticleLine className="text-secondary text-xl mt-1 ml-1 w-20" />
                <div className="text-right">
                  <h3 className="font-medium mb-1">Tendências Tech</h3>
                  <p className="text-xs text-white/70">
                    Análises e insights sobre as novidades no mundo da
                    tecnologia
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          <Link
            className="mt-auto group mx-auto"
            href="https://dev.to/adamsnows"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="dev.to articles"
          >
            <Button className="gap-x-2 text-white">
              VER NO DEV.TO{" "}
              <RiArrowRightLine className="transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          variants={fadeInLeft}
          className="xl:max-w-[800px] lg:max-w-[700px] md:max-w-[600px] sm:max-w-[500px] max-w-full mt-10 xl:mt-0 overflow-visible"
        >
          <div className="relative z-0 overflow-visible">
            <motion.div
              className="absolute -top-20 -left-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none z-0"
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
              className="absolute bottom-0 left-0 w-60 h-60 bg-primary/20 rounded-full blur-3xl pointer-events-none z-0"
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
              className="h-fit rounded-xl relative z-30 p-6 pb-14 my-6 mx-4"
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={3}
              spaceBetween={10}
              initialSlide={initialSlide}
              coverflowEffect={{
                rotate: 20,
                stretch: 25,
                depth: 250,
                modifier: 1.5,
                slideShadows: true,
              }}
              autoplay={{
                delay: 7000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              loop={true}
              speed={800}
              modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
              onSwiper={(swiper) => {
                if (swiper && typeof window !== "undefined") {
                  setTimeout(() => setSwiperInstance(swiper), 100);
                }
              }}
            >
              {isLoading ? (
                <SwiperSlide
                  style={{ width: "400px", height: "auto" }}
                  className="flex items-center justify-center"
                >
                  <div className="flex flex-col items-center justify-center h-64 bg-slate-800 border border-slate-700 rounded-xl p-6">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
                    <p className="text-sm text-white/70">
                      Carregando artigos...
                    </p>
                  </div>
                </SwiperSlide>
              ) : error ? (
                <SwiperSlide
                  style={{ width: "350px", height: "auto" }}
                  className="flex items-center justify-center"
                >
                  <div className="flex flex-col items-center justify-center h-64 bg-slate-800 border border-slate-700 rounded-xl p-6 text-center">
                    <p className="text-sm text-red-400 mb-2">{error}</p>
                    <p className="text-xs text-white/70">
                      Usando dados de exemplo como fallback.
                    </p>
                  </div>
                </SwiperSlide>
              ) : (
                posts.map((post: Post, index: number) => (
                  <SwiperSlide
                    key={index}
                    style={{ width: "350px", height: "auto" }}
                    className="rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                  >
                    <Link
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative z-10"
                    >
                      <motion.div
                        transition={{ duration: 0.3 }}
                        className="z-20 relative"
                      >
                        <DevToPostCard post={post} />
                      </motion.div>
                    </Link>
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default DevToPosts;
