import { FaWhatsapp } from "react-icons/fa";

const WhatsappButton = () => {
  const phoneNumber = "5584991398170";
  const message = encodeURIComponent(
    "Olá! Vi seu portfólio e gostaria de conversar sobre um projeto."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 text-white bg-primary rounded-full shadow-lg hover:bg-opacity-90 hover:scale-110 transition-all duration-300"
      aria-label="Contato via WhatsApp"
      style={{
        boxShadow: "0 0 15px rgba(122, 144, 255, 0.7)",
        animation: "pulse 2s infinite",
      }}
    >
      <FaWhatsapp className="text-4xl" />
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 15px rgba(122, 144, 255, 0.7);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(122, 144, 255, 0.9);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 15px rgba(122, 144, 255, 0.7);
          }
        }
      `}</style>
    </a>
  );
};

export default WhatsappButton;
