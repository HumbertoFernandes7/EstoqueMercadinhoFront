import { produto } from './../modulos/produto';
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../servicos/produtosService/produto-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.scss'],
})
export class ListarProdutosComponent implements OnInit {
  produtos: produto[] = [];
  mensagemErro: String = '';
  modalVisivel: boolean = false;
  popUpAberto: boolean = false;
  modalExcluirVisivel: boolean = false;
  id!: number;

  constructor(private produtoService: ProdutoService, private router: Router) {}

  ngOnInit() {
    this.listaProdutos();
  }

  listaProdutos() {
    this.produtoService.listaProdutos().subscribe({
      next: (retorno) => {
        this.produtos = retorno as unknown as produto[];
      },
      error: (erro) => {
        this.mensagemErro =
          'Aconteceu um erro inesperado, tente novamente mais tarde';
        this.abrirModal();
      },
    });
  }

  excluirProduto() {
    this.produtoService.excluirProduto(this.id).subscribe({
      next: (retorno) => {
        this.fecharModalExcluir();
        this.listaProdutos();
      },
      error: (erro) => {
        console.log('Deu erro!');
      },
    });
  }

  abrirModalExcluir(id: number) {
    this.modalExcluirVisivel = true;
    this.id = id;
    this.mensagemErro = 'Você deseja EXCLUIR este produto?';
  }

  fecharModalExcluir() {
    this.modalExcluirVisivel = false;
  }

  abrirModal() {
    this.modalVisivel = true;
  }

  fecharModal() {
    this.modalVisivel = false;
    this.router.navigate(['home']);
  }

  abrirPopup() {
    this.popUpAberto = true;
  }

  fecharPopup() {
    this.popUpAberto = false;
  }
}
