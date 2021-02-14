import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FetchProductComponent } from './fetch-product/fetch-product.component'
import { AddProductComponent } from './add-product/add-product.component';
import { identifierModuleUrl } from '@angular/compiler';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FetchProductComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: FetchProductComponent, pathMatch: 'full' },
      { path: 'fetch-product', component: FetchProductComponent},
      { path: 'add-product', component: AddProductComponent},
      { path: 'edit-product/:id' ,component: AddProductComponent }
      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
