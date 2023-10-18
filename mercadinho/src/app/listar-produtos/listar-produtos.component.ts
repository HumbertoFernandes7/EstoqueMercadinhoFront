import { produto } from './../modulos/produto';
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../servicos/produtosService/produto-services.service';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.scss']
})
export class ListarProdutosComponent implements OnInit {

  produtos: produto[] = [];

  constructor(private produtoService: ProdutoService){

  }

  ngOnInit() {
    this.listaProdutos();
  }

  listaProdutos() {
    this.produtoService.listaProdutos().subscribe({
      next: (retorno) => {
        console.log(retorno.id);
      this.produtos = retorno as unknown as produto[] ;
      },
      error: (erro) => {
        alert("FUDEU")
      }
    })
  }
}
