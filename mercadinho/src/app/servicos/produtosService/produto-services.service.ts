import { produto } from './../../modulos/produto';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.desenv';

import { HttpClient } from '@angular/common/http';

const APIURL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  listaProdutos() {
    return this.http.get<produto>(`${APIURL}/listar`)
  }

  cadastraProduto(produto: produto) {
    return this.http.post<produto>(`${APIURL}/cadastro`, produto)
  }
}
