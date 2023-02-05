import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.page.html',
  styleUrls: ['./supplier.page.scss'],
})
export class SupplierPage implements OnInit {
  id: number = 1;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      let id = +param.get('id');
      if (!id) {
        this.router.navigate(['/home']);
        return;
      }
      this.id = id;
      console.log(this.id);

    })
  }

  onEdit() {
    console.log('Edit');
  }


  onDelete() {
    console.log('Delete');
  }

}
