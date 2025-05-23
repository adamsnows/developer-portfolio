require('dotenv').config();
const fetch = require('node-fetch');

/**
 * Fetches GitHub contributions for a user
 * @param {string} username - GitHub username
 * @returns {Promise<Object>} - Object with contribution information
 */
async function fetchGithubContributions(username) {
  try {
    // GraphQL query to get the contribution calendar
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

    // Call GitHub GraphQL API with token
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

      // Check if we have valid data
      if (
        graphqlData.data &&
        graphqlData.data.user &&
        graphqlData.data.user.contributionsCollection &&
        graphqlData.data.user.contributionsCollection.contributionCalendar
      ) {
        const calendarData =
          graphqlData.data.user.contributionsCollection.contributionCalendar;

        // Extract contributions by day
        const contributionsByDay = {};

        // Process the GraphQL API data
        calendarData.weeks.forEach((week) => {
          week.contributionDays.forEach((day) => {
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

/**
 * Calculates days without contributions since the specified start year
 * @param {Object} contributions - Object with contributions by day
 * @param {number} startYear - Initial year to calculate from
 * @returns {Object} - JSON with non-contribution days grouped by year and month
 */
function calculateNonContributionDays(contributions, startYear) {
  const startDate = new Date(`${startYear}-01-01T00:00:00Z`);
  const today = new Date();
  const nonContributionDays = [];

  // Loop through each day from start date to today
  const currentDate = new Date(startDate);
  while (currentDate <= today) {
    const dateStr = currentDate.toISOString().split("T")[0];

    // If we don't have contributions for this day or the value is 0, add it to the list
    if (!contributions[dateStr] || contributions[dateStr] === 0) {
      nonContributionDays.push(dateStr);
    }

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return generateNonContributionReport(nonContributionDays);
}

/**
 * Generates a detailed report of days without contribution
 * @param {string[]} nonContributionDays - Array with dates without contribution
 * @returns {Object} - Report organized by year and month
 */
function generateNonContributionReport(nonContributionDays) {
  const report = {};

  // Organize by year and month
  nonContributionDays.forEach(dateStr => {
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
  Object.keys(report).forEach(year => {
    Object.keys(report[year]).forEach(month => {
      const days = report[year][month];
      report[year][month] = {
        days,
        count: days.length,
        // Categorize days by day of week (0 = Sunday, 6 = Saturday)
        byDayOfWeek: days.reduce((acc, dateStr) => {
          const dayOfWeek = new Date(dateStr).getDay();
          acc[dayOfWeek] = (acc[dayOfWeek] || 0) + 1;
          return acc;
        }, {})
      };
    });

    // Add totals for the year
    const totalDaysInYear = Object.values(report[year]).reduce(
      (total, monthData) => total + monthData.count,
      0
    );

    report[year].total = totalDaysInYear;
  });

  return {
    nonContributionDays,
    total: nonContributionDays.length,
    reportByDate: report
  };
}

/**
 * Main function that runs the script
 */
async function main() {
  try {
    const username = process.argv[2] || 'adamsnows';
    const startYear = parseInt(process.argv[3] || '2023');

    console.log(`Searching for days without contribution for ${username} since ${startYear}...`);

    // Fetch contribution data
    const contributionsData = await fetchGithubContributions(username);

    if (!contributionsData || !contributionsData.contributions) {
      throw new Error("Failed to fetch GitHub contributions");
    }

    // Calculate days without commits since the specified year
    const nonContributionData = calculateNonContributionDays(
      contributionsData.contributions,
      startYear
    );

    // Add context information
    const result = {
      username,
      startYear,
      endDate: new Date().toISOString().split('T')[0],
      ...nonContributionData
    };

    // Print formatted JSON result
    console.log(JSON.stringify(result, null, 2));

    // Optional: Save result to file
    const fs = require('fs');
    fs.writeFileSync(
      `${username}-non-contribution-days-${startYear}-to-present.json`,
      JSON.stringify(result, null, 2)
    );
    console.log(`Result saved in ${username}-non-contribution-days-${startYear}-to-present.json`);

  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the script
main();
