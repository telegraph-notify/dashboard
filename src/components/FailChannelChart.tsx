import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FailChannelsChart = ({ logs, chartLabels, parseDates, datesObj }) => {
  // return an array of all the "failed" logs
  const getAllFailed = () => {
    const failedDates = logs.filter((log) => {
      if (log.status === "Notification not sent - channel disabled by user") {
        return log;
      }
    });
    return failedDates;
  };

  // filter failed logs based on channels and dates
  const failEmailCount = () => {
    const failedLogs = getAllFailed();
    let failedCounts = { ...datesObj };
    let emailLogs = failedLogs.filter((log) => log.channel === "email");
    return parseDates(emailLogs, failedCounts);
  };
  const emailData = failEmailCount();

  const failInAppCount = () => {
    const failedLogs = getAllFailed();
    let failedCounts = { ...datesObj };
    let inappLogs = failedLogs.filter((log) => log.channel === "in-app");
    return parseDates(inappLogs, failedCounts);
  };
  const inappData = failInAppCount();

  // data to pass to the Line Chart
  const data = {
    labels: chartLabels.length > 0 ? chartLabels : ["No Data"],
    datasets: [
      {
        label: "in-app",
        data: inappData,
        borderColor: "#3F51B5",
      },
      {
        label: "email",
        data: emailData,
        borderColor: "#FEBE10",
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Failed Outgoing Channels",
        font: {
          size: 24, // Set the font size of the title (in pixels)
          family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", // Optionally specify a font family
          weight: "bold", // Set the font weight (optional)
          lineHeight: 1.5, // Line height (optional)
        },
        color: "#333", // Optionally change the title color
      },
    },
  };

  return (
    <div
      className="SuccessChannelsChart"
      style={{
        border: "1px solid grey", // Box border color and thickness
        padding: "10px", // Space between the content and the border
        borderRadius: "8px", // Optional: Rounded corners
        margin: "20px", // Optional: Adds space around the border, outside of the div
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default FailChannelsChart;