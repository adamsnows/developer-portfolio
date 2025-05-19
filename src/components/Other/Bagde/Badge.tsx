import { BagdeInterface } from "@/interfaces/BagdeInterface";
import CountUp from "react-countup";

const Badge = ({
  containerStyles,
  icon,
  endCountNum,
  endCountText,
  badgeText,
  text,
}: BagdeInterface) => {
  // Se text for fornecido, renderize um badge simples com texto
  if (text) {
    return (
      <div
        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary ${containerStyles}`}
      >
        {text}
      </div>
    );
  }

  // Caso contrário, renderize o badge com CountUp
  return (
    <div className={`badge ${containerStyles}`}>
      {icon && <div className="text-3xl text-primary">{icon}</div>}
      <div className="flex items-center gap-x-2">
        {endCountNum && (
          <div className="text-4xl leading-none font-bold text-primary">
            <CountUp end={endCountNum} delay={1} duration={4} />
            {endCountText}
          </div>
        )}
        <div
          className="max-w-[70px] leading-none text-xs
          font-medium text-white"
        >
          {badgeText}
        </div>
      </div>
    </div>
  );
};

export default Badge;
