import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Router } from '@angular/router';
import { DashboardPesquisaService } from '../services/dashboard-pesquisa.service';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {
  title: string = "Grafico Principal";
  users: any = [];

  Highcharts: typeof Highcharts = Highcharts;
  grafico: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    xAxis: {
      categories: []
    },
    series: [
      {
        data: [],
        type: 'column'
      }
    ],
        lang: {
        noData: 'https://www.highcharts.com/samples/graphics/sun.png'
    },
    noData: {
        style: {
            fontWeight: 'bold',
            fontSize: '15px',
            color: '#303030'
        }
    }
  };

  constructor(public userService: DashboardPesquisaService,
    public router: Router) { }

    ngOnInit() {
        this.userService.getUsers()
          .subscribe(
            (data) => { // Success
                this.users = data['results'];
                const dadosGrafico = this.users.map(x => x.dob.age);
                const nome = this.users.map(x  => x.name.first);
    
                //Highcharts
                this.grafico.series[0]['data'] = dadosGrafico;
                this.grafico.xAxis['categories'] = nome;
                Highcharts.chart('MediosdPPrincipal', this.grafico);
            },
            (err) => {
                console.error(err);
            }
          );
      }

}
