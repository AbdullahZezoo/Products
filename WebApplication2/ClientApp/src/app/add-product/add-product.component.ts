import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  

import { FormGroup, FormControl } from '@angular/forms';  
import { Router, ActivatedRoute } from '@angular/router';
import { ProdserviceService } from '../Services/prodservice.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  actionType: string;
  productId: number;
  errorMessage: any;
  existingProduct: Product;
  productForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    photo: new FormControl('')
  });

  constructor(private prodserviceService: ProdserviceService, private avRoute: ActivatedRoute, private router: Router) {
    this.actionType = 'Add';

    if (this.avRoute.snapshot.params["id"]) {
      this.productId = this.avRoute.snapshot.params["id"];
    }
  }

  ngOnInit() {

    if (this.productId > 0) {
      this.actionType = 'Edit';
      this.prodserviceService.getProductId(this.productId)
        .subscribe(data => (
          this.existingProduct = data,
          this.productForm.controls["name"].setValue(data.name),
          this.productForm.controls["price"].setValue(data.price),
          this.productForm.controls["photo"].setValue(data.photo)
        ));
    }
  }

  save() {
    if (!this.productForm.valid) {
      return;
    }
    if (this.actionType === 'Add') {
      let product: Product = {
        lastUpdated: new Date(),
        name: this.productForm.get("name").value,
        price: this.productForm.get("price").value,
        photo: this.productForm.get("photo").value
      };
      this.prodserviceService.addProduct(product)
        .subscribe((data) => {
          this.router.navigate(['/']);
        });
    }

    if (this.actionType === 'Edit') {
      console.log("Edit");

      let product: Product = {
        id: this.existingProduct.id,
        name: this.productForm.get("name").value,
        photo: this.productForm.get("photo").value,
        price: this.productForm.get("price").value,
        lastUpdated: new Date()
      };
      console.log(JSON.stringify(product));
      console.log(this.existingProduct.id);
      this.prodserviceService.editProduct(this.existingProduct.id, product)
        .subscribe((data) => {
          this.router.navigate([this.router.url]);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get name() { return this.productForm.get("name"); }
  get price() { return this.productForm.get("price"); }
  get photo() { return this.productForm.get("photo"); }

}
