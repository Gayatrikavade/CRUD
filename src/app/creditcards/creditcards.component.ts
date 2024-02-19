import { Component, ViewChild } from '@angular/core';
import { CreditcardsModule } from './creditcards.module';
import { Creditcard } from '../models/creditcard';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CreditcardsService } from '../services/creditcards.service';

@Component({
  selector: 'app-creditcards',
  templateUrl: './creditcards.component.html',
  styleUrls: ['./creditcards.component.scss']
})
export class CreditcardsComponent {

  creditcard : Creditcard[]=[];

  creditCardMaxAmount :number =0;
  creditCardMaxInterest :number =0;
  creditCardMaxAnnualFee:number=0;

  constructor(private creditcardsService:CreditcardsService){
   
    this.creditcardsService.getCreditCard().subscribe((data:Creditcard[])=>
    {
      this.creditcard=data;
      this.dataSource=new MatTableDataSource(this.creditcard);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;

      this.calculateMatrics();
    })

  }

  displayColumns = ["select" ,"id","cardname","bankname","description","maxCredit","active","annualfee","interestrate","interestoffer","reccomendedCreditScore","numberofapplication","actions"]

  dataSource=new MatTableDataSource(this.creditcard);

  selection=new SelectionModel(true,[]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort= this.sort;
  }

  selectHandler(row:Creditcard){
    this.selection.toggle(row as never);
  }

  calculateMatrics(){
    this.creditCardMaxAmount =this.creditcard.filter(card => card.maxCredit >= 10000).length;
    this.creditCardMaxInterest =this.creditcard.filter(card => card.interestrate > 13).length;
    this.creditCardMaxAnnualFee=this.creditcard.filter(card => card.annualfee>= 250).length;
   
  }
}

