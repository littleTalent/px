<template>
  <div class="highcharts-container"></div>
</template>

<script>
import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
import SolidGauge from "highcharts/modules/solid-gauge";
HighchartsMore(Highcharts);
SolidGauge(Highcharts);
export default {
  name: "infoCircle",
  props: ["title", "num", "color", "ipNum", "width", "height"],
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.iniSolidgauge();
  },
  methods: {
    iniSolidgauge() {
      var params = {
        title: this.title,
        num: parseInt(this.num),
        color: this.color,
        ipNum: parseInt(this.ipNum),
      };
      var options = {
        chart: {
          type: "solidgauge",
          height: "100%",
        },
        title: null,
        tooltip: {
          enabled: false, // 关闭图表自带的提示框属性
        },
        pane: {
          startAngle: 0, // 开始的角度0
          endAngle: 360, // 结束角度360
          background: {
            backgroundColor: "#F0F2F5",
            innerRadius: "60%",
            outerRadius: "100%",
            // shape: 'arc',
            borderWidth: 0,
          },
        },
        credits: {
          enabled: false, // 关闭版权标志
        },
        yAxis: {
          title: {
            useHTML: true,
            text: `<span style="color:#999;margin:0">${params.title}：</span><span style='font-weight:bold;margin:0'>${params.num}</span>`,
            x: 0,
            y: parseInt(this.height) / 2 + 14,
          },
          min: 0, // 圆环y值的最小值
          max: params.ipNum, // 圆环y值得最大值
          lineWidth: 0,
          tickPositions: [], // 关闭刻度
        },
        plotOptions: {
          solidgauge: {
            dataLabels: {
              // 设置图表的标签样式
              enabled: true,
              style: {
                color: "#666",
                fontWeight: "normal",
              },
            },
            linecap: "square", //  带颜色部分的的圆环边角是矩形或者圆形
            stickyTracking: false,
            rounded: false,
            cursor: "pointer", // 鼠标选中样式
          },
        },
        series: [
          {
            name: params.title,
            data: [
              {
                color: params.color,
                radius: "100%",
                innerRadius: "60%",
                y: params.num,
                dataLabels: {
                  borderWidth: 0,
                  enabled: true,
                  formatter: function () {
                    var percentage = parseInt((this.y / params.ipNum) * 100);
                    return percentage + "%";
                  },
                  x: 0,
                  y: -10, // 自定义数据标签的位置
                },
              },
            ],
          },
        ],
      };
      this.$el.style.width = this.width || "100px";
      this.$el.style.height = this.height || "100px";
      this.chart = new Highcharts.Chart(this.$el, options);
    },
  },
};
</script>
