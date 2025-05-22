import ClientOnly from "@/components/Animations/ClientOnly";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/Other/UI/card";
import { fetchGithubContributions } from "@/services/github";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface GithubContributionsChartProps {
  username?: string;
}

const GithubContributionsChart = ({
  username = "adamsnows",
}: GithubContributionsChartProps) => {
  const [contributions, setContributions] = useState<Record<
    string,
    number
  > | null>(null);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContributions = async () => {
      try {
        setIsLoading(true);
        const data = await fetchGithubContributions(username);
        if (data) {
          console.log("GitHub contributions data received:", data);
          setContributions(data.contributions);
          setTotalContributions(data.totalContributions);
        }
      } catch (err) {
        setError("Erro ao carregar contribuições do GitHub");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadContributions();
  }, [username]);

  // Função para determinar a cor baseada no número de contribuições
  const getContributionColor = (count: number) => {
    if (count === 0) return "bg-gray-900 hover:bg-gray-800";
    if (count <= 2) return "bg-primary/20 hover:bg-primary/30";
    if (count <= 5) return "bg-primary/40 hover:bg-primary/50";
    if (count <= 8) return "bg-primary/70 hover:bg-primary/80";
    return "bg-primary hover:bg-primary/90";
  };

  // Agrupar as contribuições por dia da semana e mês
  const renderContributionGrid = () => {
    if (!contributions) return null;

    const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const months = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];

    // Obter datas das contribuições e ordenar
    const dates = Object.keys(contributions).sort();
    if (dates.length === 0) return null;

    // Determinar o primeiro dia para começar o grid
    const firstDate = new Date(dates[0]);
    const lastDate = new Date(dates[dates.length - 1]);

    // Criar um array com todos os dias do intervalo
    const allDates: string[] = [];
    const currentDate = new Date(firstDate);
    while (currentDate <= lastDate) {
      allDates.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Agrupar os dias por semana
    const weeks: string[][] = [];
    let currentWeek: string[] = [];

    allDates.forEach((date) => {
      const dayOfWeek = new Date(date).getDay();

      // Se for o primeiro dia da semana (domingo) e já temos alguns dias
      // na semana atual, começamos uma nova semana
      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      // Adicionar a data à semana atual
      currentWeek.push(date);

      // Se for o último dia do array, adicionamos a semana atual às semanas
      if (date === allDates[allDates.length - 1]) {
        weeks.push(currentWeek);
      }
    });

    // Determinar os meses a serem exibidos
    const monthLabels: { month: number; startIndex: number }[] = [];
    let currentMonth = -1;

    allDates.forEach((date, index) => {
      const month = new Date(date).getMonth();
      if (month !== currentMonth) {
        monthLabels.push({ month, startIndex: index });
        currentMonth = month;
      }
    });

    return (
      <div className="flex flex-col space-y-2">
        {/* Rótulos de meses para layout horizontal */}
        <div className="flex justify-between mb-1">
          {[0, 2, 4, 6, 8, 10].map((monthIndex) => (
            <div
              key={`month-${monthIndex}`}
              className="text-xs text-center text-gray-400 flex-1"
            >
              {months[monthIndex]}
            </div>
          ))}
        </div>

        {/* Grid de contribuições - Layout Horizontal */}
        <div className="flex flex-col">
          {/* Rótulos de dias da semana - Horizontal */}
          <div className="flex justify-between mb-1 pl-2">
            {days.map((day, index) => (
              <div
                key={day}
                className="w-3 md:w-4 text-xs text-gray-400 text-center"
              >
                {index % 3 === 0 ? day.charAt(0) : ""}
              </div>
            ))}
          </div>

          {/* Células de contribuição - Horizontal */}
          <div className="grid grid-rows-7 grid-flow-col gap-1">
            {[0, 1, 2, 3, 4, 5, 6].map((dayOfWeek) => (
              <div key={dayOfWeek} className="flex gap-1">
                {weeks.map((week, weekIndex) => {
                  const date = week.find(
                    (d) => new Date(d).getDay() === dayOfWeek
                  );
                  if (!date)
                    return (
                      <div
                        key={`empty-${weekIndex}-${dayOfWeek}`}
                        className="w-3 h-3 md:w-4 md:h-4"
                      />
                    );

                  const count = contributions[date] || 0;
                  const formattedDate = new Date(date).toLocaleDateString(
                    "pt-BR",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  );

                  return (
                    <motion.div
                      key={date}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.2,
                        delay: weekIndex * 0.01 + dayOfWeek * 0.02,
                      }}
                      className={`w-3 h-3 md:w-4 md:h-4 rounded-sm ${getContributionColor(
                        count
                      )} cursor-pointer transition-colors`}
                      title={`${formattedDate}: ${count} contribuição${
                        count !== 1 ? "s" : ""
                      }`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legenda */}
        <div className="flex flex-wrap justify-end items-center text-xs text-gray-400 pt-1 gap-1">
          <span>Menos</span>
          <div className="w-3 h-3 bg-gray-900 rounded-sm"></div>
          <div className="w-3 h-3 bg-primary/20 rounded-sm"></div>
          <div className="w-3 h-3 bg-primary/40 rounded-sm"></div>
          <div className="w-3 h-3 bg-primary/70 rounded-sm"></div>
          <div className="w-3 h-3 bg-primary rounded-sm"></div>
          <span>Mais</span>
        </div>
      </div>
    );
  };

  return (
    <ClientOnly>
      <Card className="w-full overflow-hidden backdrop-blur-sm bg-background/70 border border-primary/20 shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <CardTitle className="text-lg md:text-xl text-primary">
              {"Github's Contributions"}
            </CardTitle>
            <span className="text-sm text-muted-foreground">
              {totalContributions} contributions in the last year
            </span>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center text-muted-foreground p-4 flex flex-col items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-primary/60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p>Não foi possível carregar as contribuições do GitHub</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 px-3 py-1 bg-primary/20 hover:bg-primary/30 rounded-md text-sm transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          ) : !contributions ||
            Object.values(contributions).every((val) => val === 0) ? (
            <div className="text-center text-muted-foreground p-4 flex flex-col items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-primary/60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
              <p>Nenhuma contribuição encontrada no último ano</p>
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-3 py-1 bg-primary/20 hover:bg-primary/30 rounded-md text-sm transition-colors"
              >
                Ver perfil no GitHub
              </a>
            </div>
          ) : (
            <div className="overflow-x-auto pb-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                {renderContributionGrid()}
              </motion.div>
            </div>
          )}
        </CardContent>
      </Card>
    </ClientOnly>
  );
};

export default GithubContributionsChart;
