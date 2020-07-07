import { CalendarioComponent } from './calendario.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    CalendarioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,

  ],
  exports: [
    CalendarioComponent,
  ],
})
export class CalendarioModule { }
