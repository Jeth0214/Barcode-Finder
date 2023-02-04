import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  suppliers = [
    {
      id: 1,
      name: 'gsk',
      image: 'capsules',
      code: 74
    },
    {
      id: 2,
      name: 'aspen',
      image: 'tablets',
      code: 85
    },
    {
      id: 3,
      name: 'roche',
      image: 'vials',
      code: 89
    },
    {
      id: 4,
      name: 'atnahs',
      image: 'syringe',
      code: 19
    },
    {
      id: 5,
      name: 'msd',
      image: 'heart-pulse',
      code: '09'
    },
    {
      id: 6,
      name: 'pharma',
      image: 'heart',
      code: 79
    },
    {
      id: 7,
      name: 'organon',
      image: 'pills',
      code: 18
    }
  ]

  constructor(
    private router: Router
  ) { }

  goToSupplier(supplier: string) {
    console.log(supplier);
    this.router.navigate(['supplier/', { name: supplier }]);
  }

}
