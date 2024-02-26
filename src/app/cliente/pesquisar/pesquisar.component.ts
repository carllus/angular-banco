import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';

export interface ClienteElement {
  cod: number;
  nome: string;
  cpf: string;
  datacad: Date;
  renda: number;
}

const ELEMENT_DATA: ClienteElement[] = [
  {cod: 1, nome: 'Fulano', cpf: '123.123.123-12', datacad: new Date(), renda: 123.00},
  {cod: 2, nome: 'Beltrano', cpf: '321.321.321-32', datacad: new Date(), renda: 321.00},
  {cod: 3, nome: 'Cicrano', cpf: '456.456.456-45', datacad: new Date(), renda: 456.00}
];

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html',
  styleUrl: './pesquisar.component.scss'
})
export class PesquisarComponent implements OnInit{
  @ViewChild(MatTable)
  table!: MatTable<any>;
  @ViewChild('paginator') 
  paginator! : MatPaginator
  
  displayedColumns: string[] = ['cod', 'nome', 'cpf', 'datacad', 'renda', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  dados:any;

  constructor(public dialog: MatDialog, private http : HttpClient){
  }
    ngAfterViewInit()
    {
      this.dataSource.paginator=this.paginator;
    }

  ngOnInit(){
    
        this.http.get<ClienteElement[]>('http://localhost:3001/clientes').subscribe({
        next: data => {
            this.dataSource.data = data;
            debugger;
        },
        error: error => {
            console.log('erro');
        }
    });
  }

  openDialog(element: ClienteElement | null):void
  {
    const dialogRef = this.dialog.open(DialogComponent, {
      width:'250px',
      data: element === null?{
        cod: null,
        nome: '',
        cpf: '',
        datacad: null,
        renda: ''
      }:{
        cod: element.cod,
        nome: element.nome,
        cpf: element.cpf,
        datacad: element.datacad,
        renda: element.renda
      }
      
    });

    dialogRef.beforeClosed().subscribe(result => {
      debugger;
      if(result !== undefined && result.nome != "" && result.cpf!="" && result.datacad!=null && result.renda !="")
      {
        if(result.nome.split(' ').length<2){
          alert("Erro: Cliente sem sobrenome");
          return;
        }
        if(this.verificarIdade(result.datacad)<18 || this.verificarIdade(result.datacad)>60){
          alert("Erro: Menor de idade ou idade maior que 60");
          return;
        }
        

        if(this.dataSource.data.map(p=>p.cod).includes(result.cod))
        {
          this.dataSource.data[result.cod-1]=result;
          this.table.renderRows();
        }
        else
        {
          result.cod=this.dataSource.data[this.dataSource.data.length-1].cod+1;
          this.dataSource.data.push(result);
          this.table.renderRows();
        }
      }
    });
  }
  editElement(element: ClienteElement): void
  {
    this.openDialog(element);
  }
  deleteElement(position: number): void
  {
    this.dataSource.data = this.dataSource.data.filter(p=>p.cod !== position);
  }

  verificarIdade(dataNascimento: string) : number{
    const data = new Date(dataNascimento);
  
    const idade = new Date(Date.now() - data.getTime()).getUTCFullYear() - 1970;
  
    return idade;
  }
}
