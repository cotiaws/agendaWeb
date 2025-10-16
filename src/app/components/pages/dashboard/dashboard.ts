import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
import { environment } from '../../../../environments/environment';
import { Navbar } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    ChartModule,
    Navbar
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  //injeção de dependência
  private http = inject(HttpClient);

  //Atributos
  graficoColunas = signal<Chart | null>(null);
  graficoDonut = signal<Chart | null>(null);

  //evento executado ao abrir a página
  ngOnInit() {

    this.http.get(environment.apiTarefas + "/groupby-prioridade")
      .subscribe((response) => {

        //Organizar os dados para o gráfico
        const categorias: string[] = [];
        const valores: number[] = [];

        (response as any[]).forEach(item => {
          categorias.push(item.prioridade);
          valores.push(item.qtdTarefas);
        });

        // Criar o gráfico de colunas
        this.graficoColunas.set(new Chart({
          chart: { type: 'column' },
          title: { text: 'Quantidade de tarefas por prioridade' },
          subtitle: { text: 'Contagem de tarefas da agenda separados por prioridade.' },
          xAxis: {
            categories: categorias,
            crosshair: true,
            title: { text: 'Prioridade da Tarefa' }
          },
          yAxis: {
            min: 0,
            title: { text: 'Quantidade' }
          },
          plotOptions: {
            column: {
              borderRadius: 5,
              pointPadding: 0.2,
              borderWidth: 0
            }
          },
          series: [{
            name: 'Tarefas',
            type: 'column',
            data: valores
          }],
          legend: { enabled: false },
          credits: { enabled: false }
        }));

      });

    this.http.get(environment.apiTarefas + "/groupby-categoria")
      .subscribe((response) => {

        //Organizar os dados para o gráfico
        const conteudo: any[] = [];
        (response as any[]).forEach(item => {
          conteudo.push([item.nomeCategoria, item.qtdTarefas]);
        });

        //Criar o gráfico
        this.graficoDonut.set(new Chart({
          chart: { type: 'pie' },
          title: { text: 'Quantidade de tarefas por categoria.' },
          subtitle: { text: 'Contagem de tarefas da agenda separados por categoria.' },
          plotOptions: {
            pie: {
              innerSize: '50%',
              dataLabels: { enabled: true }
            }
          },
          series: [{ data: conteudo, type: 'pie', name: 'Tarefas' }],
          legend: { enabled: false },
          credits: { enabled: false },
        }));

      });
  }

}
