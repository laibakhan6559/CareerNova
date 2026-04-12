import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function InteractionChart() {
  const [currentValue, setCurrentValue] = React.useState(1580);
  
  const generateInitialData = () => {
    const labels = [];
    const data = [];
    
    for (let i = 11; i >= 0; i--) {
      labels.push(`${12 - i}m`);
      const baseValue = 1200 + (11 - i) * 35;
      const randomVariation = Math.floor(Math.random() * 100) - 50;
      data.push(Math.max(800, baseValue + randomVariation));
    }
    
    return { labels, data };
  };

  const [chartData, setChartData] = React.useState(() => {
    const initial = generateInitialData();
    return {
      labels: initial.labels,
      datasets: [
        {
          label: "Interactions",
          data: initial.data,
          borderColor: "rgb(6, 182, 212)",
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 250);
            gradient.addColorStop(0, "rgba(6, 182, 212, 0.25)");
            gradient.addColorStop(1, "rgba(6, 182, 212, 0)");
            return gradient;
          },
          pointBackgroundColor: "rgb(6, 182, 212)",
          pointBorderColor: "rgba(6, 182, 212, 0.3)",
          pointBorderWidth: 4,
          pointRadius: 5,
          pointHoverRadius: 7,
          fill: true,
          tension: 0.4,
          borderWidth: 3,
        },
      ],
    };
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prev) => {
        const newLabels = [...prev.labels.slice(1), `now`];
        const newData = [...prev.datasets[0].data.slice(1)];
        
        const lastValue = newData[newData.length - 1];
        const trend = Math.random() > 0.35 ? 1 : -1;
        const change = Math.floor(Math.random() * 80) * trend;
        const newValue = Math.max(600, Math.min(2200, lastValue + change));
        newData.push(newValue);
        
        setCurrentValue(newValue);
        
        return {
          labels: newLabels,
          datasets: [{ ...prev.datasets[0], data: newData }],
        };
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        padding: 12,
        titleFont: { size: 12, weight: "600" },
        bodyFont: { size: 13, weight: "700" },
        cornerRadius: 10,
        displayColors: false,
        callbacks: {
          title: (items) => `Time: ${items[0].label}`,
          label: (context) => `📈 ${context.raw.toLocaleString()} interactions`,
        },
      },
    },
    animation: {
      duration: 600,
      easing: "easeOutQuart",
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: { 
          color: "rgba(255, 255, 255, 0.04)", 
          drawBorder: false 
        },
        ticks: { 
          color: "rgba(255, 255, 255, 0.5)", 
          padding: 10,
          font: { size: 11 },
          callback: (v) => v >= 1000 ? `${(v/1000).toFixed(1)}k` : v,
        },
        border: { display: false },
      },
      x: {
        grid: { display: false },
        ticks: {
          color: "rgba(255, 255, 255, 0.5)",
          padding: 8,
          font: { size: 10 },
        },
        border: { display: false },
      },
    },
    interaction: { mode: "nearest", axis: "x", intersect: false },
  };

  const percentChange = ((currentValue - 1200) / 1200 * 100).toFixed(1);
  const isUp = percentChange > 0;

  return (
    <div className="chart-card card">
      <div className="chart-header">
        <h3>User interaction</h3>
        <span className="live-badge pulse">● LIVE</span>
      </div>
      <div className="chart-highlight">
        <span className="highlight-value">{currentValue.toLocaleString()}</span>
        <span className={`highlight-change ${isUp ? 'up' : 'down'}`}>
          {isUp ? '↑' : '↓'} {Math.abs(percentChange)}%
        </span>
      </div>
      <div className="chart-container-line">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}


