import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import { Router } from "@angular/router";

import { DashboardPesquisaService } from "../services/dashboard-pesquisa.service";

@Component({
  selector: "app-grafico",
  templateUrl: "./grafico.component.html",
  styleUrls: ["./grafico.component.css"],
})
export class GraficoComponent implements OnInit {
  data: any = [];
  labels: any = [];
  graficos: any = [];
  Highcharts: typeof Highcharts = Highcharts;
  grafico: Highcharts.Options = {
    chart: {
      type: "column",
    },
    xAxis: {
      categories: [],
      type: "category",
      labels: {
        rotation: -45,
        style: {
          fontSize: "12px",
          fontFamily: "Verdana, sans-serif",
        },
      },
    },
    legend: {
      enabled: false,
    },
    yAxis: {
      title: {
        text: "Quantidade",
      },
    },
    series: [
      {
        data: [],
        type: "column",
      },
    ],
    title: {
      text: "Quantidade de produtos.",
    },
    /*plotOptions: {
      column: {
          borderRadius: 5
      }
    },*/
    noData: {
      style: {
        fontWeight: "bold",
        fontSize: "15px",
        color: "#303030",
      },
    },
  };

  constructor(
    public dashboardPesquisaService: DashboardPesquisaService,
    public produtoService: DashboardPesquisaService,
    public router: Router
  ) {}

  ngOnInit() {
    //inicio grafico de quantia de produtos
    this.dashboardPesquisaService.todosOsGraficos().subscribe(
      (dados) => {
        // Success
        dados.forEach(data => {
          this.data = data["dados"];
          this.labels = data["labels"];
          const dadosGrafico = this.data;
          const nome = this.labels;
  
          //Highcharts
          this.grafico.series[0]["data"] = dadosGrafico;
          this.grafico.xAxis["categories"] = nome;
          this.graficos.push(this.grafico);
          Highcharts.chart("MediosdPPrincipal", this.grafico);
        });
       
      },
      (err) => {
        console.error(err);
      }
    );
    
    //fim do gráfico de quantia de produtos
  }
}
