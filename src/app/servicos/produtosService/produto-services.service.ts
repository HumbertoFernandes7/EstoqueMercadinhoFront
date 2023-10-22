import { quantidade } from './../../modulos/quantidade';
import { produto } from './../../modulos/produto';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.desenv';
import { HttpClient } from '@angular/common/http';


const APIURL = environment.api_url;

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {

  constructor(private http: HttpClient) {}

  listaProdutos() {
    return this.http.get<produto>(`${APIURL}/listar`);
  }

  cadastraProduto(produto: produto) {
    return this.http.post<produto>(`${APIURL}/cadastro`, produto);
  }

  excluirProduto(id: number) {
    return this.http.delete(`${APIURL}/${id}`);
  }

  alterarProduto(id: number, produtoAtualizado: produto) {
    return this.http.put(`${APIURL}/${id}/alterar`, produtoAtualizado);
  }

  buscaProdutoPorId(id: number) {
    return this.http.get<produto>(`${APIURL}/${id}`);
  }

  adicionarQuantidadeEstoque(id: number, quantidadeAlterada: quantidade) {
    return this.http.put(`${APIURL}/${id}/adicionarQuantidade`, quantidadeAlterada);
  }

  removerQuantidadeEstoque(id: number, quantidadeAlterada: quantidade) {
    return this.http.put(`${APIURL}/${id}/removerQuantidade`, quantidadeAlterada);
  }
}
