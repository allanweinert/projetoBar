import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { ProdutoPesquisaService } from '../../../produto/services/produto-pesquisa.service';
import { ItemSaida } from '../../modelos/item-saida';

@Component({
  selector: 'app-saida',
  templateUrl: './saida.component.html',
  styleUrls: ['./saida.component.css'],
  providers: [
    MessageService,
    ProdutoPesquisaService
  ]
})
export class SaidaComponent implements OnInit {

  @Input() itensSaida:ItemSaida[] = [];

  formItens: FormGroup;

  produtos = [];

  constructor(private formBuilder: FormBuilder,
              private messageService: MessageService,
              private produtoPesquisaService: ProdutoPesquisaService) {
    this.configurarFormItens();
  }

  ngOnInit() {
    this.novo();
  }

  configurarFormItens() {
    this.formItens = this.formBuilder.group({
      id: ['',[Validators.required]],
      produto: ['',[Validators.required]],
      quantidade: ['',[Validators.required]],
      valorVenda: ['',[Validators.required]]
    });
  }

  pesquisarProdutos(pesquisa) {
    this.produtoPesquisaService.pesquisar(pesquisa.query).subscribe(
      resultadop => {
        this.produtos = resultadop.data;
      }
    );
  }

  novo() {
    this.formItens.reset();
  }

  adicionarItem() {
    const novoItem = this.formItens.getRawValue();
    this.itensSaida.push(novoItem);
    //rever if
    /*if (this.formItens.valid) {
      
      const itemExistente = this.itensSaida.find(t => novoItem.produto.id === t.produto.id);
      if (itemExistente) {
        alert('Item já cadastrado!');
        this.messageService.add({
          severity: 'warn',
          summary: 'Não é possível adicionar esse item!',
          detail: 'Número ' + novoItem.id + ' já cadastrado.'
        });
      } else {
        this.itensSaida.push(novoItem);
        this.novo();
      }
    }*/
  }

  removerItem(indiceItem) {
    this.itensSaida.splice(indiceItem, 1);
  }

}
