import { produto } from './../modulos/produto';
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../servicos/produtosService/produto-services.service';
import { Router } from '@angular/router';
import { quantidade } from '../modulos/quantidade';

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
  modalEditarVisivel: boolean = false;
  id!: number;
  quantidadeAlterada!: quantidade;

  constructor(private produtoService: ProdutoService, private router: Router) {}

  ngOnInit() {
    this.listaProdutos();
  }

  //MÉTODOS

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

  alterarProduto(id: number) {
    this.router.navigate([`produtos/${id}/alterar`]);
  }

  adicionarQuantidadeEstoque(produto: produto) {
    let quantidadeFinal: quantidade;
    quantidadeFinal = { quantidade: 1 };
    this.produtoService
      .adicionarQuantidadeEstoque(produto.id, quantidadeFinal)
      .subscribe({
        next: (retorno) => {
          this.listaProdutos();
        },
        error: (erro) => {
          this.mensagemErro =
            'Aconteceu um erro inesperado, tente novamente mais tarde!';
          this.abrirModal();

          this.listaProdutos();
        },
      });
  }

  removerQuantidadeEstoque(produto: produto) {
    let quantidadeFinal = { quantidade: 1 };
    this.produtoService
      .removerQuantidadeEstoque(produto.id, quantidadeFinal)
      .subscribe({
        next: (retorno) => {
          this.listaProdutos();
        },
        error: (erro) => {
          console.log(erro);
          this.mensagemErro = erro.error.message;

          this.abrirModal();
          this.listaProdutos();


        },
      });
  }

  //MODAIS

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
