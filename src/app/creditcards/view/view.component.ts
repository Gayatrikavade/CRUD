import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Creditcard } from 'src/app/models/creditcard';
import { CreditcardsService } from 'src/app/services/creditcards.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {

  creditCardDetails!:Creditcard;
  creditCardId!:Number;

  private destroy$:Subject<void>=new Subject<void>();

  constructor(private creditcardsService:CreditcardsService,private router:ActivatedRoute,private matSnackBar:MatSnackBar)
  {
    this.creditCardId= parseInt(this.router.snapshot.paramMap.get("id")|| '');

      this.creditcardsService.getCreditCardById(this.creditCardId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:Creditcard)=>{
        this.showSuccessMessage('Credit Card Loaded Succesfully');
      this.creditCardDetails=data;
    })

  }

  showSuccessMessage(message:string){
    this.matSnackBar.open(message,'Close',{
      duration:3000
    });
  }
  
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
