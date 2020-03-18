import { Component, OnInit } from '@angular/core';
import { EnergyService } from '../energy.service';
import { Chart } from 'angular-highcharts' ;

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.css']
})
export class FridgeComponent implements OnInit {
  start = '0';
  stop = '1';
  temps : any;
  temp1 : any;
  status : any = 'OFF';
  dataRefresher : any;
  chart: Chart;
  dataArray = [];
  constructor(private service:EnergyService) {
    this.loadTemp();
    this.refreshData();
   }

  ngOnInit() {
    this.init();
  }
   startButton()
   {
         this.start = '1';
         this.status = 'ON';
         //this.chart.addPoint(this.temp1);
         //alert(this.start);
        
        // this.refreshData();
         this.service.doget(this.start);

   }
   stopButton()
   {
     this.stop = '0';
     this.status = 'OFF';
    // alert('stop'+this.stop);
     this.stopData();
     this.service.doget(this.stop);
   }

   loadTemp(){
    console.log('hello');
    
   const observable =this.service.get();
    
     observable.subscribe((response) => {
       const result=response.toString();
      
       var data=JSON.parse(result);
       this.temps=data.state.temp;
       if(this.temps > 99 && this.temps <115)
       {
         this.temp1 = this.temps;
        this.dataArray.push(this.temp1);
       }
      
       //this.status=data.state.Status;
       console.log("data[0]"+this.temps);
      //this.stopData();
       console.log("res of express"+result);
       console.log("araay of data [",this.dataArray,"]");
       
     })
    }
    refreshData(){
      this.dataRefresher =
        setInterval(() => {
          this.init();
          this.loadTemp();
       
      }, 5000); 
      }
      stopData()
      {
        clearInterval(this.dataRefresher);
      }

      addPoint() {
        if (this.chart) {
          this.chart.addPoint(this.dataArray.push(this.temp1));
        } else {
          alert('init chart, first!');
        }
      }
    

      init() {
        let chart = new Chart({
          chart: {
            type: 'line'
          },
          title: {
            text: 'Linechart'
          },
          xAxis:{
            title:{
              text:"time in seconds "
            },
           // categories:['1','2','3','4']
          },
          yAxis:{
              title:{
                text:"power consumption in ( °C )"
              }
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            }
        },
          series : [{
            name:'FRIDGE POWER CONSUMPTION',
            data : this.dataArray,
           // data:[{ x: 0.5, y: 107},{ x: 1, y: 108},{ x: 1.5, y: 110},{ x: 2, y: 107}],
            type: "line"
          }]
         
        });
         //chart.addPoint(this.temp1);
        this.chart = chart;
       
        chart.ref$.subscribe(console.log);
      }
    
}
