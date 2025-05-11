import { Component, Input, ElementRef, Renderer2, OnDestroy, AfterViewInit } from '@angular/core';

declare const echarts: any;

@Component({
    selector: 'e-seva-echart',
    template: `<div [id]="chartId" class="chart-container" #chartRef></div>`,
    styles: [`
    .chart-container {
      width: 100%;
      height: 100%;
      min-height: 300px;
    }
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `]
})
export class EchartComponent implements AfterViewInit, OnDestroy {
    @Input() chartOption: any = {};
    @Input() chartId: string = "";
    public chartInstance: any;
    public resizeObserver: any;

    constructor(public elRef: ElementRef, public renderer: Renderer2) {
        this.resizeChart = this.resizeChart.bind(this);
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.initChart();
            this.resizeObserver = new ResizeObserver(() => {
                this.resizeChart();
            });
            const chartDom = document.getElementById(this.chartId);
            if (chartDom) {
                this.resizeObserver.observe(chartDom);
            }
            window.addEventListener('resize', this.resizeChart);
        });
    }

    ngOnDestroy(): void {
        window.removeEventListener('resize', this.resizeChart);
        if (this.chartInstance) {
            this.chartInstance.dispose();
        }
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }

    initChart(): void {
        const chartDom = document.getElementById(this.chartId);
        if (chartDom) {
            this.chartInstance = echarts.init(chartDom);
            if (this.chartOption) {
                this.chartInstance.setOption(this.chartOption);
            }
        }
    }

    resizeChart(): void {
        if (this.chartInstance) {
            this.chartInstance.resize();
        }
    }
}
