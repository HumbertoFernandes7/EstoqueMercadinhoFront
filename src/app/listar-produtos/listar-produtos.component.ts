import { produto } from './../modulos/produto';
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../servicos/produtosService/produto-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.scss']
})
export class ListarProdutosComponent implements OnInit {

  produtos: produto[] = [];
  mensagemErro: String = '';
  modalVisivel: boolean = false;

  constructor(
    private produtoService: ProdutoService,
    private router: Router) {
  }

  ngOnInit() {
    this.listaProdutos();
  }

  listaProdutos() {
    this.produtoService.listaProdutos().subscribe({
      next: (retorno) => {
      this.produtos = retorno as unknown as produto[] ;
      },
      error: (erro) => {
        this.mensagemErro = 'Aconteceu um erro inesperado, tente novamente mais tarde'
        this.abrirModal();
      }
    })
  }

  abrirModal(){
    this.modalVisivel = true;
  }

  fecharModal() {
    this.modalVisivel = false;
    this.router.navigate(['home'])
  }
}
