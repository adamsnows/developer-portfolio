import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  RiCloudLine,
  RiCodeSSlashLine,
  RiDatabase2Line,
  RiSecurePaymentLine,
  RiServerLine,
  RiTerminalBoxLine,
} from "react-icons/ri";
import { useInView } from "react-intersection-observer";

import {
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  staggerContainer,
} from "@/components/Animations/AdvancedTransition";
import ClientOnly from "@/components/Animations/ClientOnly";

type BackendCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
};

const BackendCard = ({
  icon,
  title,
  description,
  delay = 0,
}: BackendCardProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      transition={{ delay }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 flex flex-col items-center text-center shadow-lg hover:bg-white/10 transition-all"
    >
      <div className="text-primary text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-white/70">{description}</p>
    </motion.div>
  );
};

const BackendExpertise = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const terminalRef = useRef<HTMLPreElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
  }, [controls, inView]);

  useEffect(() => {
    if (inView && terminalRef.current && !hasAnimated.current) {
      hasAnimated.current = true;
      const terminal = terminalRef.current as HTMLPreElement;
      const text = `$ node server.js
Initializing server...
Connecting to database...
Connection successful!
Setting up routes...
API endpoints registered
Middleware configured
Starting server on port 3000
Server is running on http://localhost:3000
Ready to handle requests...`;

      const lines = text.split("\n");
      let lineIndex = 0;

      terminal.innerHTML = "";

      const typeNextLine = () => {
        if (lineIndex < lines.length) {
          const line = lines[lineIndex];
          const lineElement = document.createElement("div");
          terminal.appendChild(lineElement);

          let charIndex = 0;
          const typeChar = () => {
            if (charIndex < line.length) {
              lineElement.textContent += line[charIndex];
              charIndex++;
              setTimeout(typeChar, Math.random() * 50 + 10);
            } else {
              lineIndex++;
              setTimeout(typeNextLine, 300);
            }
          };

          typeChar();
        }
      };

      setTimeout(typeNextLine, 1000);
    }
  }, [inView]);

  return (
    <section className="py-5 pb-10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl opacity-30"></div>
      </div>

      <div className="container mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          animate={controls}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            Back-End Expertise
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg">
            Robust, secure and scalable architectures for high-performance
            applications
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <motion.div
            className="absolute top-1/2 left-1/2 inset-x-1/2 w-64 md:w-80 h-64 md:h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none z-0"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <BackendCard
            icon={<RiServerLine />}
            title="RESTful API"
            description="API development following best standards and practices, with complete documentation via Swagger/OpenAPI."
            delay={0.1}
          />

          <BackendCard
            icon={<RiDatabase2Line />}
            title="Databases"
            description="Expertise in SQL and NoSQL, efficient data modeling, optimized queries, and cache implementation."
            delay={0.2}
          />

          <BackendCard
            icon={<RiSecurePaymentLine />}
            title="Security"
            description="Implementation of JWT authentication, OAuth, protection against SQL injection and other common attacks."
            delay={0.3}
          />

          <BackendCard
            icon={<RiTerminalBoxLine />}
            title="Microservices"
            description="Distributed architecture, service communication, load balancing, and system resilience."
            delay={0.4}
          />

          <BackendCard
            icon={<RiCloudLine />}
            title="Cloud & DevOps"
            description="Deployment on AWS, Azure, containerization with Docker, orchestration with Kubernetes, CI/CD."
            delay={0.5}
          />

          <BackendCard
            icon={<RiCodeSSlashLine />}
            title="Advanced Node.js"
            description="Mastery of Express, NestJS, asynchronous processes, streams, workers, and performance optimization."
            delay={0.6}
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 "
        >
          <motion.div
            variants={fadeInLeft}
            className="bg-white/10 rounded-lg border border-white/10 p-6 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="ml-2 text-xs text-white/60">server.js</div>
            </div>
            <ClientOnly>
              <pre
                ref={terminalRef}
                className="font-mono text-xs text-green-400 bg-black/70 p-4 rounded h-[250px] overflow-y-auto"
              ></pre>
            </ClientOnly>
          </motion.div>

          <motion.div variants={fadeInRight} className="space-y-6">
            <h3 className="text-2xl font-bold">System Architecture</h3>
            <p className="text-white/80 text-justify">
              I build backend systems focused on performance, scalability, and
              security, using software engineering best practices to ensure
              clean, testable, and easily maintainable code.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Design patterns and SOLID principles</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Automated testing and TDD</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Layered and hexagonal architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Distributed systems and horizontal scalability</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Advanced monitoring and logging</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BackendExpertise;
