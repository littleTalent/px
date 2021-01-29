<template>
  <div class="highcharts-container"></div>
</template>

<script>
import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
HighchartsMore(Highcharts);

// 格式化时间
function formatTime(date) {
  var yyyy = date.getFullYear();
  var mm = format0(date.getMonth() + 1);
  var dd = format0(date.getMonth());
  var h = format0(date.getHours());
  var m = format0(date.getMinutes());
  var s = format0(date.getSeconds());
  return yyyy + "-" + mm + "-" + dd + " " + h + ":" + m + ":" + s;
}
// 格式化时间  补0
function format0(val) {
  return val < 10 ? "0" + val : val;
}
export default {
  name: "flowInfo",
  props: ["lineData"],
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      console.log(this.$el);
      let options = {
        chart: {
          type: "areaspline",
          // type: 'spline',
          margin: [60, 80, 50, 70],
        },
        credits: {
          enabled: false,
        },
        legend: false,
        title: null,
        xAxis: {
          type: "datetime",
          labels: {
            overflow: "justify",
            formatter: function () {
              return (
                new Date(this.value).getHours() +
                ":" +
                format0(new Date(this.value).getMinutes())
              );
            },
          },
          title: {
            text: "时间",
            align: "high",
            x: 50,
            y: -25,
            style: {
              "font-weight": "bold",
            },
          },
        },
        yAxis: {
          title: {
            useHTML: true,
            text: "Kb/s",
            rotation: 0,
            align: "high",
            y: -30,
            x: 40,
            style: {
              color: "#252525",
            },
          },
          labels: {
            formatter: function () {
              return this.value / 1000 + "k";
            },
          },
          min: 0,
          minorGridLineWidth: 0,
          gridLineWidth: 1,
          alternateGridColor: null,
          gridLineDashStyle: "Dash",
          gridLineColor: "#eee",
          lineWidth: 1,
          lineColor: "#d9d9d9",
        },
        tooltip: {
          useHTML: true,
          formatter: function () {
            var start = formatTime(new Date(this.x - 1800000));
            var end = formatTime(new Date(this.x));
            return `<span>时间： ${start}~${end}</span><br/>
                    <span class="blue-dot"></span><span>流量速度：${this.y} Kb/s</span>`;
          },
        },
        plotOptions: {
          areaspline: {
            lineWidth: 1.5,
            lineColor: "#3aa0fe",
            states: {
              hover: {
                lineWidth: 2,
              },
            },
            marker: {
              enabled: false,
            },
            pointInterval: 1800000, // 0.5h
            pointStart: new Date(2009, 9, 6, 10, 0, 0).getTime(),
          },
        },
        series: [
          {
            name: "流量速度",
            data: this.lineData,
            // dashStyle:"dash",
            color: {
              linearGradient: {
                x1: 0,
                x2: 0,
                y1: 0,
                y2: 1,
              },
              stops: [
                [0, "#9dd0ff"],
                [1, "#fff"],
              ],
            },
          },
        ],
      };
      this.$el.style.width = "100%";
      this.$el.style.height = "350px";
      this.chart = new Highcharts.Chart(this.$el, options);
    },
  },
};
</script>

