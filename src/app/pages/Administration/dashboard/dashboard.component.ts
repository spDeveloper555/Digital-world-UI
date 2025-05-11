import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { AppService } from '../../../services/app.service'
@Component({
  selector: 'e-seva-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(public authService: AuthService, public appService: AppService) { }
  public servies: any = [];
  public isLoading: boolean = true;
  public lineChartOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Paid', 'In progress']
    },
    xAxis: {
      type: 'category',
      data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Paid',
        data: [100, 80, 80, 50, 140, 60, 100],
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#2196f3'  // Blue line
        }
      },
      {
        name: 'In progress',
        data: [50, 80, 60, 120, 80, 100, 60],
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#3e3e59'  // Dark line
        }
      }
    ]
  };
  public barChartOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Paid', 'In progress']
    },
    xAxis: {
      type: 'category',
      data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Paid',
        data: [100, 80, 80, 50, 140, 60, 100],
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#2196f3'  // Blue line
        }
      },
      {
        name: 'In progress',
        data: [50, 80, 60, 120, 80, 100, 60],
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#3e3e59'  // Dark line
        }
      }
    ]
  };
  public pieChartOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' }
        ]
      }
    ]
  };
}
