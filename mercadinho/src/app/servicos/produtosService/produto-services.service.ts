import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.desenv';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { produto } from 'src/app/modulos/produto';

const APIURL = environment;

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  listaProdutos() {
    return this.http.get<produto>('http://localhost:8080/produtos/listar')
  }
}
