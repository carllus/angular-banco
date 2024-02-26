import { Component, Inject, OnInit } from '@angular/core';
import { ClienteElement } from '../../cliente/pesquisar/pesquisar.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit{
  element!: ClienteElement;
  isChange!: boolean;
  
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ClienteElement,
    public dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    if(this.data.cod!=null)
    {
      this.isChange=true;
    }
    else
      this.isChange=false;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  validaCPF()
  {
    debugger;
    this.data.cpf=this.data.cpf.replace(/\D/g, "");
    var cpfFormatado="";
    for(var i=0; i<this.data.cpf.length; i++)
    {
      if(i==3||i==6)
        cpfFormatado+='.';
      if(i==9)
        cpfFormatado+='-';

        cpfFormatado+=this.data.cpf[i];
    }
    this.data.cpf=cpfFormatado;
  }
  
}
