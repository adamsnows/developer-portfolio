interface NonContributionResponse {
  username: string;
  nonContributionDays: string[];
  total: number;
  startYear: number;
}

export const fetchNonContributionDays = async (
  username: string,
  startYear: number = 2023
): Promise<NonContributionResponse | null> => {
  try {
    const timestamp = new Date().getTime(); // Add timestamp to prevent caching
    const response = await fetch(
      `/api/github/non-contribution-days?username=${username}&startYear=${startYear}&_=${timestamp}`,
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub non-contribution days");
    }

    const data: NonContributionResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching GitHub non-contribution days:", error);
    return null;
  }
};

// Function to generate a report of days without contribution by month
export const generateNonContributionReport = (
  nonContributionDays: string[]
): Record<string, any> => {
  const report: Record<string, any> = {};

  // Organize by year and month
  nonContributionDays.forEach((dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // JavaScript months are 0-indexed

    if (!report[year]) {
      report[year] = {};
    }

    const monthKey = month < 10 ? `0${month}` : `${month}`;
    if (!report[year][monthKey]) {
      report[year][monthKey] = [];
    }

    report[year][monthKey].push(dateStr);
  });

  // Add statistics by month
  Object.keys(report).forEach((year) => {
    Object.keys(report[year]).forEach((month) => {
      const days = report[year][month];
      report[year][month] = {
        days,
        count: days.length,
        // Categorize days by day of week (0 = Sunday, 6 = Saturday)
        byDayOfWeek: days.reduce(
          (acc: Record<number, number>, dateStr: string) => {
            const dayOfWeek = new Date(dateStr).getDay();
            acc[dayOfWeek] = (acc[dayOfWeek] || 0) + 1;
            return acc;
          },
          {}
        ),
      };
    });

    // Add totals for the year
    const totalDaysInYear = Object.values(report[year]).reduce(
      (total: number, monthData: any) => total + monthData.count,
      0
    );

    report[year].total = totalDaysInYear;
  });

  return report;
};
