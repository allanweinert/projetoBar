import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopMenuModule } from './top-menu/top-menu.module';
import { SideMenuModule } from './side-menu/side-menu.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    TopMenuModule,
    SideMenuModule,
    ToastModule,
    CurrencyMaskModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
