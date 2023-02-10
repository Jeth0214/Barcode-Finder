import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Transfer } from 'src/app/models/transfer.model';

@Component({
  selector: 'app-add-edit-transfer',
  templateUrl: './add-edit-transfer.page.html',
  styleUrls: ['./add-edit-transfer.page.scss'],
})
export class AddEditTransferPage implements OnInit {
  initialTransferData: any = {};
  transferForm: FormGroup;
  itemsErrorMessage: string = '';
  isSaving: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.initialTransferData = this.router.getCurrentNavigation().extras.state['initialTransferData'];
        console.log('Initial data to add:', this.initialTransferData);
      }
    })
  }

  ngOnInit() {
    this.transferForm = this.formBuilder.group({
      gt: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      items: new FormArray([
        new FormGroup({
          lot: new FormControl('', Validators.required),
          qty: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")])
        })
      ])
    })
  };

  get items(): FormArray {
    return this.transferForm.get('items') as FormArray;
  }

  addItem() {
    this.itemsErrorMessage = '';
    const itemsGroup = new FormGroup({
      lot: new FormControl('', Validators.required),
      qty: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")])
    });

    this.items.push(itemsGroup);
  }

  removeItem(index: number) {
    if (this.items.length <= 1) {
      this.itemsErrorMessage = 'Please provide at least one item';
      return;
    }
    this.items.removeAt(index);
  }

  saveBarcode(e: Event) {
    console.log('saveImage', e);
  }

  onCancel() {
    console.log('Cancel');
    this.reset();
  }

  onSubmit() {
    console.log('submit', this.transferForm.value);
    this.isSaving = true;
    //TODO: send data to server 
    setTimeout(() => { this.reset() }, 2000);
  }

  reset() {
    this.transferForm.reset();
    this.items.clear();
    this.addItem();
    this.itemsErrorMessage = '';
    this.isSaving = false;
  }

}
