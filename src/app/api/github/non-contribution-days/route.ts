import { NextRequest, NextResponse } from "next/server";

// Configure this route as dynamic
export const dynamic = "force-dynamic";

// Função principal para lidar com a requisição GET
export async function GET(request: NextRequest) {
  try {
    // Obter o username da query ou usar o padrão
    const searchParams = request.nextUrl.searchParams;
    const username =
      searchParams.get("username") ||
      process.env.GITHUB_USERNAME ||
      "adamsnows";

    const startYear = Number(searchParams.get("startYear")) || 2023;

    // Buscar dados de contribuições
    const contributionsData = await fetchGithubContributions(username);

    if (!contributionsData || !contributionsData.contributions) {
      return NextResponse.json(
        { error: "Failed to fetch GitHub contributions" },
        { status: 500 }
      );
    }

    // Calcular dias sem commit desde 2023
    const nonContributionDays = calculateNonContributionDays(
      contributionsData.contributions,
      startYear
    );

    return NextResponse.json({
      username,
      nonContributionDays,
      total: nonContributionDays.length,
      startYear,
    });
  } catch (error) {
    console.error("Error processing non-contribution days:", error);
    return NextResponse.json(
      { error: "Failed to process non-contribution days" },
      { status: 500 }
    );
  }
}

// Função para buscar as contribuições do GitHub de um usuário
async function fetchGithubContributions(username: string) {
  try {
    // Query GraphQL para obter o calendário de contribuições
    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  color
                }
              }
            }
          }
        }
      }
    `;

    // Chamar a API GraphQL do GitHub com o token atualizado
    const graphqlResponse = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    if (graphqlResponse.ok) {
      const graphqlData = await graphqlResponse.json();

      // Verificar se temos dados válidos
      if (
        graphqlData.data &&
        graphqlData.data.user &&
        graphqlData.data.user.contributionsCollection &&
        graphqlData.data.user.contributionsCollection.contributionCalendar
      ) {
        const calendarData =
          graphqlData.data.user.contributionsCollection.contributionCalendar;

        // Extrair contribuições por dia
        const contributionsByDay: Record<string, number> = {};

        // Processar os dados da API GraphQL
        calendarData.weeks.forEach((week: any) => {
          week.contributionDays.forEach((day: any) => {
            contributionsByDay[day.date] = day.contributionCount;
          });
        });

        return {
          username,
          totalContributions: calendarData.totalContributions,
          contributions: contributionsByDay,
          startDate: Object.keys(contributionsByDay).sort()[0],
          endDate: new Date().toISOString().split("T")[0],
        };
      }
    }

    throw new Error("Failed to fetch GitHub contributions data");
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    throw error;
  }
}

// Função para calcular os dias sem contribuição desde o ano inicial especificado
function calculateNonContributionDays(
  contributions: Record<string, number>,
  startYear: number
): string[] {
  const startDate = new Date(`${startYear}-01-01T00:00:00Z`);
  const today = new Date();
  const nonContributionDays: string[] = [];

  // Loop por cada dia desde a data de início até hoje
  const currentDate = new Date(startDate);
  while (currentDate <= today) {
    const dateStr = currentDate.toISOString().split("T")[0];

    // Se não temos contribuições para este dia ou o valor é 0, adicione-o à lista
    if (!contributions[dateStr] || contributions[dateStr] === 0) {
      nonContributionDays.push(dateStr);
    }

    // Avançar para o próximo dia
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return nonContributionDays;
}
