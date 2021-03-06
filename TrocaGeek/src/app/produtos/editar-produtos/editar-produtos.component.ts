import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/Model/Produto';
import { ProdutoService } from 'src/app/service/produto.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/Model/usuario';
import { Categoria } from 'src/app/Model/Categoria';

@Component({
  selector: 'app-editar-produtos',
  templateUrl: './editar-produtos.component.html',
  styleUrls: ['./editar-produtos.component.css']
})
export class EditarProdutosComponent implements OnInit {

  produto: Produto = new Produto;
  produtoNovo: Produto = new Produto;
  usuario: Usuario = new Usuario;
  categoria: Categoria = new Categoria;

  //variaveis modo noturno
  modoNoturno: boolean;
  corBodyNoturno: string = '#0f0f0f'
  corFonteNoturno: string = '#ffffff'



  constructor(private produtoService: ProdutoService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    if (localStorage.getItem('idUsuario') == null) {
      location.assign('/login')
    }
    let id = this.router.snapshot.params['codigo'];
    this.usuario.id = parseInt(localStorage.getItem('idUsuario'));

    this.buscarProduto(id);


    if (localStorage.getItem('noturno') == 'true') {
      this.modoNoturno = true;
    }
  }

  buscarProduto(id) {
    this.produtoService.getProdutoEspecifico(id).subscribe((resp: Produto) => {
      this.produto = resp;
    })
  }

  modoNoturnoFunction() {
    this.modoNoturno = !this.modoNoturno;
    localStorage.setItem('noturno', this.modoNoturno.toString());
  }




  conferirNome() {
    if (this.produtoNovo.nome == null) {
      this.produtoNovo.nome = this.produto.nome
    } return this.produtoNovo.nome;
  }

  conferirPreco() {
    if (this.produtoNovo.preco == null) {
      this.produtoNovo.preco = this.produto.preco
    } return this.produtoNovo.preco;
  }

  conferirDescricao() {

    if (this.produtoNovo.descricao == null) {
      this.produtoNovo.descricao = this.produto.descricao
    } return this.produtoNovo.descricao
  }

  conferirUrlImg() {

    if (this.produtoNovo.urlImg == null) {
      this.produtoNovo.urlImg = this.produto.urlImg
    } return this.produtoNovo.urlImg
  }


  atualizarProduto() {
    //Capturando a Categoria pelo html (value)
    this.categoria.codigoCategoria = parseInt((<HTMLSelectElement>document.getElementById('categoria')).value);
    this.produtoNovo.idCategoria = this.categoria;
    let ativo = (<HTMLSelectElement>document.getElementById('ativo')).value;
    if (ativo == '1' || ativo == '2') {
      this.produtoNovo.ativo = true;
    } else {
      this.produtoNovo.ativo = false;
    }
    this.produtoNovo.codigo = this.produto.codigo;

    //Capturando usuario Ativo pelo localStorage
    this.produtoNovo.idUsuario = this.usuario;


    this.produtoService.putProduto(this.produtoNovo).subscribe((resp: Produto) => {
      this.produtoNovo = resp;
      location.assign('/usuarios/meusprodutos');
    })
  }

  verificar() {

    this.conferirNome();
    this.conferirPreco();
    this.conferirDescricao();
    this.conferirUrlImg();
    this.atualizarProduto();
  }


}
