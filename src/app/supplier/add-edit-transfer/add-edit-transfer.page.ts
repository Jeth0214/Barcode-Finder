import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      gt: ['', Validators.required]
    })
  }

  onSubmit() {
    console.log('submit', this.transferForm);

  }

}
