import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Types } from '../models/types.model';

const TYPES: Types[] = [
  { name: 'Damage', value: 'DA' },
  { name: 'Invoice', value: 'IN' },
  { name: 'Transfer', value: 'BT' },
  { name: 'Received', value: 'BT' },
]


@Component({
  selector: 'app-manual-generator',
  templateUrl: './manual-generator.page.html',
})
export class ManualGeneratorPage implements OnInit {

  types = TYPES;
  generatorForm: FormGroup;
  isGenerating: boolean = false;
  generatedBarcode: string = 'Sample barcode';

  // getters to easily access form control
  get number() {
    return this.generatorForm.get('number');
  }

  get type() {
    return this.generatorForm.get('type');
  }

  get code() {
    return this.generatorForm.get('code');
  }


  constructor(private formBuilder: FormBuilder, private loadingController: LoadingController) { }

  ngOnInit() {
    this.setUpGeneratorForm();
  }

  // set up the form
  setUpGeneratorForm() {
    this.generatorForm = this.formBuilder.group({
      number: ['', Validators.required],
      type: ['', Validators.required],
      code: ['', Validators.required],
    })
  }

  async onGenerateBarcode() {
    console.log('values', this.generatorForm.value);
    let code = this.prependTheCode(this.code.value);
    let number = this.number.value;
    let type = this.type.value;
    this.isGenerating = true;

    const loading = await this.loadingController.create({
      message: 'Generating Barcode...',
      spinner: 'circles',
    });

    await loading.present();
    setTimeout(async () => {
      this.generatorForm.reset();
      this.isGenerating = false;
      this.generatedBarcode = `NA${code}-${type}-${number}`;
      await loading.dismiss();
    }, 500);
  }

  prependTheCode(code: number): string {
    console.log('Code: ' + code);
    let codeToString = code.toString();
    return code >= 10 ? codeToString : `0${codeToString}`;
  }


}
