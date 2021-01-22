import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule, MatNativeDateModule, MatSidenavModule, MatToolbarModule, MatTreeModule} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';




const modules = [
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
  MatTreeModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatListModule,
  MatSidenavModule,
  MatCardModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules]
})


export class MaterialModule {

}
