import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { RiExternalLinkFill, RiGithubFill } from "react-icons/ri";

import SafeImage from "@/components/Other/SafeImage/SafeImage";
import { Badge } from "@/components/Other/UI/badge";
import { Card, CardHeader } from "@/components/Other/UI/card";

import { ProjectCardInterface } from "@/interfaces/ProjectInterface";

const ProjectCard = ({ project, specialStyle, id }: ProjectCardInterface) => {
  const cardClass = specialStyle ? "min-description-height" : "";
  const [isHovered, setIsHovered] = useState(false);

  // Different background styles based on where the card is used
  const cardBackground = specialStyle
    ? "bg-white/5 backdrop-blur-sm" // Transparent for Projects page
    : "bg-slate-800/95"; // Solid for Home page

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card
        id={id?.toString()}
        className={`group overflow-hidden relative h-full border border-white/10 ${cardBackground} shadow-xl hover:shadow-primary/20 transition-all duration-300`}
      >
        <CardHeader className="p-0">
          <div
            className={`relative w-full h-72
           flex items-center justify-center ${
             specialStyle ? "bg-secondary/40" : "bg-slate-900"
           } bg-work_project_bg xl:bg-no-repeat overflow-hidden xl:bg-contain`}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/50 to-secondary/50 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.8 : 0 }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                scale: isHovered ? 1.05 : 1,
                filter: isHovered ? "blur(2px)" : "blur(0px)",
              }}
              transition={{ duration: 0.4 }}
            >
              <SafeImage
                className="absolute shadow-2xl translate-y-1/2 -translate-x-1/2 top-0 left-1/2"
                src={project.image}
                width={300}
                height={135}
                alt={`${project.name} Project Image`}
                customStyle={{
                  objectFit: "contain",
                }}
                unoptimized={true}
              />
            </motion.div>

            <div className="flex gap-x-4 z-20 relative">
              {project.link && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{
                    y: isHovered ? 0 : 20,
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Link
                    target="_blank"
                    href={project.link}
                    aria-label={"Ver projeto online"}
                    className={`${
                      specialStyle
                        ? "bg-white/20 backdrop-blur-sm"
                        : "bg-slate-700"
                    } w-[54px] h-[54px]
                    rounded-full flex justify-center items-center
                    transition-all duration-200 border border-white/30
                    hover:bg-primary hover:border-primary`}
                  >
                    <RiExternalLinkFill className="text-white text-xl" />
                  </Link>
                </motion.div>
              )}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: isHovered ? 0 : 20,
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Link
                  target="_blank"
                  href={project.github}
                  aria-label={"Ver código no GitHub"}
                  className={`${
                    specialStyle
                      ? "bg-white/20 backdrop-blur-sm"
                      : "bg-slate-700"
                  } w-[54px] h-[54px]
                  rounded-full flex justify-center items-center
                  transition-all duration-200 border border-white/30
                  hover:bg-primary hover:border-primary`}
                >
                  <RiGithubFill className="text-white text-xl" />
                </Link>
              </motion.div>
            </div>
          </div>
        </CardHeader>
        <div className="h-64 px-8 py-6 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Badge
              className={`uppercase text-sm font-medium mb-2 absolute top-4
              left-5 ${
                specialStyle ? "bg-white/10 backdrop-blur-sm" : "bg-slate-700"
              } border border-white/20
              text-white hover:bg-primary/80 transition-colors duration-300`}
            >
              {project.category}
            </Badge>
          </motion.div>

          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-xl font-bold mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              {project.name}
            </p>
            <p className={`text-white/70 text-sm ${cardClass} line-clamp-4`}>
              {project.description}
            </p>
          </motion.div>

          <motion.div
            className="absolute -bottom-10 -right-10 w-20 h-20 rounded-full bg-primary/30 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
