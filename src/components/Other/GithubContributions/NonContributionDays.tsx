import ClientOnly from "@/components/Animations/ClientOnly";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/Other/UI/card";
import {
  fetchNonContributionDays,
  generateNonContributionReport,
} from "@/services/github-non-contribution";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface NonContributionDaysProps {
  username?: string;
  startYear?: number;
}

const NonContributionDays = ({
  username = "adamsnows",
  startYear = 2023,
}: NonContributionDaysProps) => {
  const [nonContributionData, setNonContributionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<Record<string, any>>({});

  useEffect(() => {
    const loadNonContributionDays = async () => {
      try {
        setIsLoading(true);
        const data = await fetchNonContributionDays(username, startYear);
        if (data) {
          setNonContributionData(data);
          // Gerar relatório organizado dos dias sem contribuição
          const generatedReport = generateNonContributionReport(
            data.nonContributionDays
          );
          setReport(generatedReport);
        }
      } catch (err) {
        setError("Erro ao carregar dias sem contribuição do GitHub");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadNonContributionDays();
  }, [username, startYear]);

  // Nomes dos dias da semana
  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  // Nomes dos meses
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  // Renderizar o relatório de dias sem contribuição
  const renderReport = () => {
    return (
      <div className="space-y-4">
        {Object.keys(report)
          .sort()
          .map((year) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-3"
            >
              <h3 className="text-lg font-medium text-primary">
                {year} - {report[year].total} dias sem commit
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.keys(report[year])
                  .filter((month) => month !== "total")
                  .sort()
                  .map((monthKey) => {
                    const monthData = report[year][monthKey];
                    const monthIndex = parseInt(monthKey) - 1;

                    if (!monthData || monthIndex < 0) return null;

                    return (
                      <Card
                        key={`${year}-${monthKey}`}
                        className="backdrop-blur-sm bg-background/70 border border-primary/20"
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md">
                            {monthNames[monthIndex]} - {monthData.count} dias
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-muted-foreground">
                            <div className="mb-2">
                              <strong>Por dia da semana:</strong>
                              <div className="grid grid-cols-7 gap-1 mt-1">
                                {dayNames.map((day, index) => (
                                  <div key={day} className="text-center">
                                    <div className="text-xs">
                                      {day.charAt(0)}
                                    </div>
                                    <div
                                      className={`mt-1 text-sm ${
                                        monthData.byDayOfWeek[index]
                                          ? "text-primary"
                                          : "text-gray-500"
                                      }`}
                                    >
                                      {monthData.byDayOfWeek[index] || 0}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <details className="mt-3">
                              <summary className="cursor-pointer text-primary/80 hover:text-primary">
                                Ver todos os dias ({monthData.days.length})
                              </summary>
                              <div className="mt-2 max-h-32 overflow-y-auto text-xs">
                                <ul className="space-y-1">
                                  {monthData.days.map((day: string) => {
                                    const date = new Date(day);
                                    const formattedDate =
                                      date.toLocaleDateString("pt-BR", {
                                        weekday: "short",
                                        day: "2-digit",
                                        month: "2-digit",
                                      });
                                    return (
                                      <li
                                        key={day}
                                        className="py-1 border-b border-gray-700"
                                      >
                                        {formattedDate}
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            </details>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            </motion.div>
          ))}
      </div>
    );
  };

  return (
    <ClientOnly>
      <Card className="w-full overflow-hidden backdrop-blur-sm bg-background/70 border border-primary/20 shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <CardTitle className="text-lg md:text-xl text-primary">
              {"Dias sem Commits desde " + startYear}
            </CardTitle>
            {nonContributionData && (
              <span className="text-sm text-muted-foreground">
                Total: {nonContributionData.total} dias sem commits
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center text-muted-foreground p-4">
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 px-3 py-1 bg-primary/20 hover:bg-primary/30 rounded-md text-sm"
              >
                Tentar novamente
              </button>
            </div>
          ) : !nonContributionData ? (
            <div className="text-center text-muted-foreground p-4">
              <p>Nenhum dado encontrado</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {renderReport()}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </ClientOnly>
  );
};

export default NonContributionDays;
