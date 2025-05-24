import { motion } from "framer-motion";
import { RiHomeFill, RiMailFill, RiWhatsappLine } from "react-icons/ri";

import AdvancedTextAnimation from "@/components/Animations/AdvancedTextAnimation";
import {
  fadeInUp,
  staggerContainer,
} from "@/components/Animations/AdvancedTransition";
import FloatingElement from "@/components/Animations/FloatingElement";
import TextReveal from "@/components/Animations/TextReveal";

const Contact = () => {
  return (
    <section className="min-h-screen relative overflow-hidden justify-center flex flex-col items-center">
      {/* Animated glowing orbs */}
      <motion.div
        className="absolute top-[20%] left-[15%] w-24 h-24 bg-primary/30 rounded-full filter blur-2xl mix-blend-screen"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-[30%] right-[10%] w-32 h-32 bg-secondary/20 rounded-full filter blur-2xl mix-blend-screen"
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-[60%] left-[5%] w-16 h-16 bg-primary/40 rounded-full filter blur-2xl mix-blend-screen"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute top-[10%] right-[20%] w-20 h-20 bg-secondary/30 rounded-full filter blur-2xl mix-blend-screen"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 3,
        }}
      />

      {/* Original background decorations */}
      <motion.div
        className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"
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
        className="absolute bottom-1/3 left-0 w-80 h-80 bg-secondary/5 rounded-full filter blur-3xl"
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

      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="pt-12 xl:pt-24"
        >
          <div className="flex flex-col justify-center text-center max-w-3xl mx-auto">
            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-x-4 text-primary text-lg mb-4 justify-center">
                <span className="w-[30px] h-[2px] bg-primary"></span>
                <TextReveal text="Hey, Adam!" className="text-xl" />
                <span className="w-[30px] h-[2px] bg-primary"></span>
              </div>
              <h1 className="h1 mb-8">Let&apos;s Connect!</h1>
              <AdvancedTextAnimation
                text="Ready to turn ideas into reality? I'm always excited to discuss new projects, collaborations, or just have a friendly chat about technology."
                animationStyle="fade"
                className="subtitle mb-12"
                speed={0.02}
              />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="grid gap-8 md:grid-cols-2 mb-12"
            >
              <FloatingElement
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300"
                duration={5}
                distance={10}
              >
                <a href="mailto:adamangelow@gmail.com">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="text-4xl text-primary">
                      <RiMailFill />
                    </div>
                    <h3 className="text-xl font-semibold">Email</h3>
                    <span className="text-white/70 hover:text-primary transition-colors">
                      adamangelow@gmail.com
                    </span>
                    <p className="text-sm text-white/50">
                      Available for inquiries 24/7
                    </p>
                  </motion.div>
                </a>
              </FloatingElement>

              <FloatingElement
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300"
                duration={5}
                distance={10}
                delay={0.2}
              >
                <a
                  href="https://wa.me/5584991398170"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="text-4xl text-primary">
                      <RiWhatsappLine />
                    </div>
                    <h3 className="text-xl font-semibold">WhatsApp</h3>
                    <span
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-primary transition-colors"
                    >
                      +55 (84) 99139-8170
                    </span>
                    <p className="text-sm text-white/50">
                      Quick responses during business hours
                    </p>
                  </motion.div>
                </a>
              </FloatingElement>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="flex items-center gap-x-4 text-white/70 justify-center mb-2">
                <RiHomeFill size={18} />
                <span>Natal, RN, Brazil</span>
              </div>
              <p className="text-sm text-white/50">
                Available for remote work worldwide and open to local
                opportunities depending on the offer
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
