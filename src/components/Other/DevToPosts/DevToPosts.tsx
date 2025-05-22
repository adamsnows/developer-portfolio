import { motion, useAnimation } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import type { Swiper as SwiperType } from "swiper";
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

const DevToPostCard = ({
  post,
  isPriority = false,
}: {
  post: Post;
  isPriority?: boolean;
}) => {
  return (
    <div className="bg-background/90 border border-slate-700 rounded-xl overflow-hidden h-full shadow-xl">
      <div className="relative overflow-hidden">
        <Image
          src={post.cover || "/projects/devto-default.png"}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          width={500}
          height={200}
          priority={isPriority}
          style={{ width: "100%", height: "auto" }}
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
              className="text-xs font-medium bg-secondary/90 px-2 py-1 rounded text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-4 bg-background/90 relative z-10">
        <h3 className="font-semibold mb-2 text-sm h-10 line-clamp-2 text-white">
          {post.title}
        </h3>
        <p className="text-xs text-gray-300 mb-3 h-12 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>
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
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false); // Estado separado para animação de refresh
  const [error, setError] = useState<string | null>(null);
  const [initialSlide, setInitialSlide] = useState<number>(1);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verificar inicialmente
    checkMobile();

    // Adicionar listener para mudanças de tamanho
    window.addEventListener("resize", checkMobile);

    // Limpar o listener
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  const fetchPosts = useCallback(async () => {
    // Inicia ambos os estados de loading e refreshing
    setIsLoading(true);
    setIsRefreshing(true);
    setError(null);

    // Registra o tempo de início para garantir animação mínima de 1 segundo
    const startTime = Date.now();

    try {
      const fetchedPosts = await fetchDevtoPosts("adamsnows");

      if (fetchedPosts.length > 0) {
        // Animação suave para atualizar os posts
        const oldPostsLength = posts.length;

        // Atualiza os posts
        setPosts(fetchedPosts);

        // Feedback visual sobre a atualização
        if (oldPostsLength !== fetchedPosts.length) {
        }

        // Definir o slide inicial como 1 (o segundo post) para garantir que sempre haja um slide à esquerda
        const initialSlideNumber = Math.min(
          Math.max(fetchedPosts.length > 3 ? 1 : 0, 1),
          fetchedPosts.length - 1
        );
        setInitialSlide(initialSlideNumber);
      }
    } catch (err) {
      console.error("Erro ao buscar posts do DEV.TO:", err);
      setError("Could not load articles. Using local data as fallback.");
    } finally {
      // Calcula quanto tempo se passou desde o início da requisição
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 1000 - elapsedTime); // Garante pelo menos 1 segundo de animação

      // Finaliza o loading imediatamente
      setIsLoading(false);

      // Mas mantém a animação de refresh por pelo menos 1 segundo
      if (remainingTime > 0) {
        setTimeout(() => {
          setIsRefreshing(false);
        }, remainingTime);
      } else {
        setIsRefreshing(false);
      }
    }
  }, [posts.length]);

  // Effect that runs on mount and when document visibility changes
  useEffect(() => {
    // Fetch posts on initial load
    fetchPosts();

    // Set up visibility change listener to refetch when tab becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchPosts();
      }
    };

    // Add event listener for visibility change
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Clean up the event listener
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchPosts]);

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
    <section className="relative xl:pt-[170px] overflow-visible">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="initial"
        animate={controls}
        className="container pt-10 -mt-10 pb-[100px] -mb-10 mx-auto xl:flex xl:flex-row-reverse xl:justify-between relative z-10 overflow-visible px-4 md:px-6 lg:px-8"
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
            PUBLICATIONS
          </h2>
          <p className="text-justify text-sm mb-8 leading-relaxed">
            I share my knowledge and experiences through articles on{" "}
            <span className="text-primary font-medium">DEV.TO</span>, addressing
            relevant topics about{" "}
            <span className="text-primary font-medium">web development</span>{" "}
            and programming best practices.
          </p>

          <div className="mb-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                variants={fadeInUp}
                className="flex flex-row-reverse items-start p-3 py-4 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <RiArticleLine className="text-secondary text-xl mt-1 ml-1 w-20" />
                <div className="text-right">
                  <h3 className="font-medium mb-1">Technical Articles</h3>
                  <p className="text-xs text-white/70">
                    Tutorials, tips, and best practices for web development
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="flex flex-row-reverse items-start p-3 py-4 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <RiArticleLine className="text-secondary text-xl mt-1 ml-1 w-20" />
                <div className="text-right">
                  <h3 className="font-medium mb-1">Tech Trends</h3>
                  <p className="text-xs text-white/70">
                    Analysis and insights on the latest in technology
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              className="group"
              href="https://dev.to/adamsnows"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="dev.to articles"
            >
              <Button className="gap-x-2 text-white">
                VIEW ON DEV.TO{" "}
                <RiArrowRightLine className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInLeft}
          className="xl:max-w-[800px] lg:max-w-[700px] md:max-w-[600px] sm:max-w-[500px] max-w-full mt-10 xl:mt-0 overflow-visible"
        >
          <div className="relative z-0 overflow-visible">
            <motion.div
              className="absolute top-0 left-0  w-64 md:w-80 h-64 md:h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none z-0"
              animate={{
                scale: [0.5, 1, 0.5],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute right-20 top-20  w-60 h-60 bg-primary/30 rounded-full blur-3xl pointer-events-none z-0"
              animate={{
                scale: [0.5, 1, 0.5],
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
              className="h-fit rounded-xl relative z-30 p-6 pb-14 my-6 mx-auto w-full"
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              spaceBetween={10}
              initialSlide={initialSlide}
              slidesPerGroup={1} // Adding slidesPerGroup to fix the loop warning
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
              loop={posts.length >= 3}
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
                  className="flex items-center justify-center mx-auto"
                  style={{
                    width: isMobile ? "280px" : "350px",
                    height: "auto",
                  }}
                >
                  <div className="flex flex-col items-center justify-center h-64 bg-background/90 border border-slate-700 rounded-xl p-6 w-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
                    <p className="text-sm text-white/70">Loading articles...</p>
                  </div>
                </SwiperSlide>
              ) : error ? (
                <SwiperSlide
                  className="flex items-center justify-center mx-auto"
                  style={{
                    width: isMobile ? "280px" : "350px",
                    height: "auto",
                  }}
                >
                  <div className="flex flex-col items-center justify-center h-64 bg-background/90 border border-slate-700 rounded-xl p-6 text-center w-full">
                    <p className="text-sm text-red-400 mb-2">{error}</p>
                    <p className="text-xs text-white/70">
                      Using sample data as fallback.
                    </p>
                  </div>
                </SwiperSlide>
              ) : (
                posts.map((post: Post, index: number) => (
                  <SwiperSlide
                    key={index}
                    className="rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 mx-auto"
                    style={{
                      width: isMobile ? "280px" : "350px",
                      height: "auto",
                    }}
                  >
                    <Link
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative z-10 w-full"
                    >
                      <motion.div
                        transition={{ duration: 0.3 }}
                        className="z-20 relative"
                      >
                        <DevToPostCard post={post} isPriority={index === 0} />
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
