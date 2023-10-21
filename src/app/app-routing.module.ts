import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { ListarProdutosComponent } from './listar-produtos/listar-produtos.component';
import { CadastrarProdutosComponent } from './cadastrar-produtos/cadastrar-produtos.component';
import { AlterarProdutoComponent } from './alterar-produto/alterar-produto.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'home',
  },
  {
    path: "home", component: HomeComponent
  },
  {
    path: "produtos", component: ListarProdutosComponent
  },
  {
    path: "produtos/cadastrar", component: CadastrarProdutosComponent
  },
  {
    path: "produtos/:id/alterar", component: AlterarProdutoComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }