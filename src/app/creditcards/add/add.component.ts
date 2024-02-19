import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Creditcard } from 'src/app/models/creditcard';
import { CreditcardsService } from 'src/app/services/creditcards.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  private subscription!: Subscription;
  constructor(private creditcardsService:CreditcardsService,private router:Router){

  }
  newCreditCard:Creditcard ={
    id:undefined,
    cardname:"",
    bankname:"",
    description:"",
    maxCredit:5000,
    active:true,
    annualfee:12,
    interestrate:12,
    reccomendedCreditScore:"100-500",
    credtdate:Date(),
    updatedDate:Date(),
    termsandcondition:"Terms and conditions for credit cards",
    interestoffer:150,
    numberofapplication:5
  }
  saveCreditCard(){
    
    this.subscription= this.creditcardsService.createCreditCard(this.newCreditCard).subscribe(data=>{
      alert('Credit card added');
      this.router.navigate(['/creditcards']);
    })
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
