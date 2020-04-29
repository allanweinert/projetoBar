import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { ProdutoPesquisaService } from '../../produto/services/produto-pesquisa.service';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.css'],
  providers: [
    MessageService,
    ProdutoPesquisaService
  ]
})
export class ItensComponent implements OnInit {

  @Input() itens = [];

  formItens: FormGroup;

  produtos = [];
  disabled: boolean = true;

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
      id: '',
      produto: '',
      quantidade: '',
      valorcusto: '',
      valorvenda: ''
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
    if (this.formItens.valid) {
      const novoItem = this.formItens.getRawValue();
      const itemExistente = this.itens.find(t => novoItem.produto.id === t.produto.id);
      if (itemExistente) {
        alert('Item já cadastrado!');
        this.messageService.add({
          severity: 'warn',
          summary: 'Não é possível adicionar esse item!',
          detail: 'Número ' + novoItem.id + ' já cadastrado.'
        });
      } else {
        this.itens.push(novoItem);
        this.novo();
      }
    }
  }

  removerItem(indiceItem) {
    this.itens.splice(indiceItem, 1);
  }

}
