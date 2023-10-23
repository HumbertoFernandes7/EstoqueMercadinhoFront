import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListarProdutosComponent } from './listar-produtos/listar-produtos.component';
import { HttpClientModule } from '@angular/common/http';
import { CadastrarProdutosComponent } from './cadastrar-produtos/cadastrar-produtos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgxCurrencyDirective } from 'ngx-currency';

import { AlterarProdutoComponent } from './alterar-produto/alterar-produto.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ListarProdutosComponent,
    CadastrarProdutosComponent,
    AlterarProdutoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxCurrencyDirective,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
