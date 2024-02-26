import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PesquisarComponent } from './cliente/pesquisar/pesquisar.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatTableModule} from '@angular/material/table';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './shared/dialog/dialog.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    PesquisarComponent,
    HeaderComponent,
    FooterComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
