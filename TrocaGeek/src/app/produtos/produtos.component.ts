import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../service/produto.service';
import {Produto} from '../Model/Produto';
import { Conteudo } from '../Model/Conteudo';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  listaProdutos: Produto []
  produto: Produto = new Produto;
  conteudo: Conteudo = new Conteudo;
  
  private pagina:number = 0;
  private quantidade:number= 10;
  
  
    constructor(private produtoService: ProdutoService) { }
  
    ngOnInit(){
      this.findAllProdutos(this.pagina, this.quantidade);
    }
  
    findAllProdutos(pagina, quantidade) {
      this.produtoService.getAllProdutos(pagina,quantidade).subscribe((resp: Conteudo )=> {
        this.conteudo = resp;
        this.listaProdutos = this.conteudo.content;
      })
    }
    paginar(pagina:any) {
      this.pagina = pagina;
      this.findAllProdutos(pagina, this.quantidade);
    }
  }
  