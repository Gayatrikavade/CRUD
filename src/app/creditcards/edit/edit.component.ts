import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Creditcard } from 'src/app/models/creditcard';
import { CreditcardsService } from 'src/app/services/creditcards.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

  editCreditCardForm !:FormGroup;

  creditCardData:Creditcard | null =null;

  private destroy$ :Subject<void> =new Subject<void>();

  constructor(private formBuilder: FormBuilder , private route:ActivatedRoute, private creditcardsService:CreditcardsService,private matSnackBar:MatSnackBar,private router:Router){

    this.editCreditCardForm = this.formBuilder.group({
      id:[''],
      cardname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      description: ['', Validators.required],
      bankname: ['', Validators.required],
      maxCredit: ['', Validators.required],
      active: [false, Validators.required],
      annualfee: ['', Validators.required],
      interestrate: ['', Validators.required],
      reccomendedCreditScore: [null, Validators.required],
      interestoffer:[null, Validators.required],
      numberofapplication:[null, Validators.required]
    });
    
  }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get("id") || '');
  
    if (id != 0) {
      this.creditcardsService.getCreditCardById(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          this.creditCardData = data;
          this.editCreditCardForm.patchValue(this.creditCardData);
        });
    }


  }
  
  onSubmit(){

    if(this.editCreditCardForm.valid){
      console.log(this.editCreditCardForm.valid);
      console.log(this.editCreditCardForm.value);
      const updatedFormData : Creditcard =this.editCreditCardForm.value;
     
      this.creditcardsService.updateCreditCard(updatedFormData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(()=>{
        this.showSuccessMessage("Credit Card updated successfully");
      this.router.navigate(['/creditcards']);
       
      });
    }
  }

  showSuccessMessage(message :string){
    this.matSnackBar.open(message,'Close',{
      duration:3000
    })
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
