import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { RiAlignJustify } from "react-icons/ri";

import Logo from "@/components/Other/Logo/Logo";
import Socials from "@/components/Other/Socials/Socials";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/Other/UI/sheet";
import { links } from "@/data/nav";
import Link from "next/link";

// Animações para os elementos do menu
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

export const MobileNav = () => {
  const path = usePathname();
  const sheetCloseRef = useRef<HTMLButtonElement>(null);

  const handleLinkClick = () => {
    // Fechar o menu ao clicar em um link
    sheetCloseRef.current?.click();
  };

  return (
    <Sheet>
      <SheetTrigger>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <RiAlignJustify className="cursor-pointer text-3xl" />
        </motion.div>
      </SheetTrigger>
      <SheetContent className="bg-black/30 backdrop-blur-md border-l border-white/10 ">
        {/* Botão oculto que será usado para fechar o Sheet */}
        <SheetClose ref={sheetCloseRef} className="hidden" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col items-center justify-between h-full py-10 relative"
        >
          {/* Gradiente decorativo */}
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-primary/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-secondary/20 to-transparent pointer-events-none" />

          {/* Logo */}
          <motion.div variants={itemVariants}>
            <Logo />
          </motion.div>

          {/* Links de Navegação */}
          <div className="flex flex-col items-center gap-y-8 py-12">
            {links.map((link, index) => {
              const isActive = link.path === path;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={link.path}
                    className={`relative text-2xl font-medium transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-white hover:text-primary/80"
                    }`}
                    onClick={handleLinkClick}
                  >
                    {link.name.toUpperCase()}
                    {isActive && (
                      <motion.span
                        layoutId="activeMenuHighlight"
                        className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-secondary"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Ícones Sociais */}
          <motion.div variants={itemVariants}>
            <Socials
              containerStyles="flex gap-x-5"
              iconsStyles="text-2xl hover:text-primary transition-colors duration-300"
              onIconClick={handleLinkClick}
            />
          </motion.div>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
};
