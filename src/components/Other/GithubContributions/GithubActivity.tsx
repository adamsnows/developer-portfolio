import { motion } from "framer-motion";
import GithubContributionsChart from "./GithubContributionsChart";

const GithubActivity = () => {
  return (
    <section className="lg:py-4 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 z-[-1] opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-primary/30 blur-3xl"></div>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-3 mb-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-white/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Github Activity
          </motion.h2>

          <motion.div
            className="w-20 h-1 bg-white/20 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />

          <motion.p
            className="text-center text-white/50 max-w-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            View my most recent contributions to open source projects and
            personal repositories.
          </motion.p>
        </div>

        <div className="mx-auto">
          <GithubContributionsChart
            username={process.env.NEXT_PUBLIC_GITHUB_USERNAME || "adamsnows"}
          />

          {/* GitHub Sponsors Card */}
          <motion.div
            className="mt-8 w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-lg overflow-hidden border border-primary/20 bg-background/50 backdrop-blur-sm p-1 w-full">
              <iframe
                src={`https://github.com/sponsors/${
                  process.env.NEXT_PUBLIC_GITHUB_USERNAME || "adamsnows"
                }/card`}
                title={`Sponsor ${
                  process.env.NEXT_PUBLIC_GITHUB_USERNAME || "adamsnows"
                }`}
                className="rounded-md w-full block h-[305px]  md:h-[135px]"
                style={{
                  border: 0,
                  width: "100%",
                }}
                loading="lazy"
              />
            </div>
          </motion.div>

          <div className="mt-6 text-center">
            <motion.a
              href="https://github.com/adamsnows"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-primary transition-colors border border-primary/20 rounded-md px-4 py-2 hover:bg-primary/10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              See the Github profile
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GithubActivity;
