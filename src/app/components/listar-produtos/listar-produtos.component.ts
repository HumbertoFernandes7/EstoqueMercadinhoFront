import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../servicos/produtosService/produto-services.service';
import { Router } from '@angular/router';
import { Quantidade } from '../../modulos/Quantidade';
import { Produto } from '../../modulos/Produto';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.scss'],
})
export class ListarProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  mensagemErro: String = '';
  modalVisivel: boolean = false;
  popUpAberto: boolean = false;
  modalExcluirVisivel: boolean = false;
  modalEditarVisivel: boolean = false;
  id!: number;
  quantidadeAlterada!: Quantidade;

  constructor(private produtoService: ProdutoService, private router: Router) {}

  ngOnInit() {
    this.listarProdutos();
  }

  //MÉTODOS

  listarProdutos() {
    this.produtoService.listaProdutos().subscribe({
      next: (retorno) => {
        this.produtos = retorno as unknown as Produto[];
      },
      error: () => {
        this.mensagemErro = 'Aconteceu um erro inesperado, tente novamente mais tarde';
        this.abrirModal();
      },
    });
  }

  alterarProduto(id: number) {
    this.router.navigate([`produtos/${id}/alterar`]);
  }

  excluirProduto() {
    this.produtoService.excluirProduto(this.id).subscribe({
      next: () => {
        this.fecharModalExcluir();
        this.listarProdutos();
      },
      error: () => {
        this.mensagemErro = 'Aconteceu um erro inesperado, tente novamente mais tarde'
        this.abrirModal();
      },
    });
  }

  adicionarQuantidadeEstoque(produto: Produto) {
    let quantidadeFinal: Quantidade;
    quantidadeFinal = { quantidade: 1 };
    this.produtoService.adicionarQuantidadeEstoque(produto.id, quantidadeFinal).subscribe({
        next: () => {
          this.listarProdutos();
        },
        error: () => {
          this.mensagemErro ='Aconteceu um erro inesperado, tente novamente mais tarde!';
          this.abrirModal();
          this.listarProdutos();
        },
      });
  }

  removerQuantidadeEstoque(produto: Produto) {
    let quantidadeFinal = { quantidade: 1 };
    this.produtoService
      .removerQuantidadeEstoque(produto.id, quantidadeFinal)
      .subscribe({
        next: () => {
          this.listarProdutos();
        },
        error: (erro) => {
          this.mensagemErro = erro.error.message;
          this.abrirModal();
          this.listarProdutos();
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