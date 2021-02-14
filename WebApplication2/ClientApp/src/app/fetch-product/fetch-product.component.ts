import { Component, OnInit } from '@angular/core';
import { ProdserviceService } from '../Services/prodservice.service';
import { Observable,  } from 'rxjs';
import { Product } from '../models/product';
import { flatMap, filter, map } from 'rxjs/operators';
import { Key } from 'protractor';
import { FormGroup, FormControl } from '@angular/forms';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-fetch-product',
  templateUrl: './fetch-product.component.html',
  styleUrls: ['./fetch-product.component.css']
})
export class FetchProductComponent  implements OnInit {
    products$: Observable<Product[]>;
    copy: Observable<Product[]>;

  constructor(private _ProdserviceService: ProdserviceService) { 
  }

  ngOnInit() {
    this.getProducts(); 
    this.copy = this.products$; 
  }

  getProducts() {
    this.products$ = this._ProdserviceService.getProduct();
  }

  searchGroup = new FormGroup({
    data: new FormControl('')
 });

  search(){
    this.products$ = this.filterProduct()
    
  }

  filterProduct() {
    var _data = this.searchGroup.get("data").value;
    if (_data !== ""){
      return this.products$.
      pipe(map(
        products => products.filter(
          p => p.name === _data)
      )
      );
    }else{
       return this.copy;
    }
   
  }

  exportToExcel() {
    let element = document.getElementById("sheet");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');


    XLSX.writeFile(wb, "ProductSheet.xlsx");
  }

    
  

  delete(ProductId: number) {
    this._ProdserviceService.deleteProduct(ProductId)
    .subscribe(
      data => this.getProducts()
    );
  }

}

