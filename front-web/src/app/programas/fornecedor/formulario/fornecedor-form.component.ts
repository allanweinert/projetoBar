import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng/api';

import {FornecedorCrudService} from '../services/fornecedor-crud.service';
import {FornecedorPesquisaService} from '../services/fornecedor-pesquisa.service';

import {Fornecedor} from '../modelos/fornecedor';
import {FornecedorTelefone} from '../modelos/fornecedor-telefone';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
  styleUrls: ['./fornecedor-form.component.css'],
  providers: [
    FornecedorCrudService,
    FornecedorPesquisaService,
  ]
})
export class FornecedorFormComponent implements OnInit {

  listaTelefones = [];
  formFornecedor: FormGroup;
  editando = false;
  pesquisando = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private fornecedorCrudService: FornecedorCrudService,
              private fornecedorPesquisaComponent: FornecedorPesquisaService) {
    this.configurarFormulario();
  }

  ngOnInit() {
    this.verificarParametroRota();
  }

  configurarFormulario() {
    this.formFornecedor = this.formBuilder.group({
      id: '',
      razaoSocial: ['', Validators.required],
      nomeFantasia: '',
      cnpj: '',
    });
    this.formFornecedor.get('id').disable();
  }

  verificarParametroRota(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarFornecedor(id);
    } else {
      this.novo();
    }
  }

  carregarFornecedor(id: number) {
    this.fornecedorCrudService.carregar(id).subscribe(
      fornecedor => {
        this.formFornecedor.patchValue(fornecedor);
        this.listaTelefones = fornecedor.telefones;
        this.editando = true;
      }
    );
  }

  getFornecedorDoForm(): Fornecedor {
    const fornecedor = this.formFornecedor.getRawValue();
    fornecedor.telefones = this.listaTelefones;
    fornecedor.cnpj = fornecedor.cnpj !== '' ? fornecedor.cnpj : null;
    return fornecedor;
  }

  salvar() {
    if (this.validarFormulario()) {
      const fornecedor: Fornecedor = this.getFornecedorDoForm();
      if (fornecedor.id) {
        this.atualizarFornecedor(fornecedor);
      } else {
        this.incluirFornecedor(fornecedor);
      }
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Não é possível salvar a Fornecedor!',
        detail: 'Verifique o preenchimento dos campos e tente novamente.'
      });
    }
  }

  atualizarFornecedor(fornecedor: Fornecedor) {
    this.fornecedorCrudService.atualizar(fornecedor).subscribe(
      fornecedorId => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Fornecedor ' + fornecedor.razaoSocial + ' alterado com sucesso!'
        });
        this.pesquisar();
      }
    );
  }

  incluirFornecedor(fornecedor: Fornecedor) {
    this.fornecedorCrudService.incluir(fornecedor).subscribe(
      fornecedorId => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Fornecedor ' + fornecedor.razaoSocial + ' incluído com sucesso!'
        });
        this.pesquisar();
      },
      error => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Não foi possível salvar o Fornecedor!',
          detail: error.error.mensagens[0]
        });
      }
    );
  }

  validarFormulario() {
    this.formFornecedor.markAsDirty();
    this.formFornecedor.updateValueAndValidity();
    return this.formFornecedor.valid;
  }

  // Início da integração com a receita federal
  pesquisaCnpjReceita() {
    this.fornecedorPesquisaComponent.pesquisaFornecedorReceita(this.formFornecedor.get('cnpj').value).subscribe(
      resultado => {
        this.formFornecedor.get('razaoSocial').setValue(resultado.nome);
        this.formFornecedor.get('nomeFantasia').setValue(resultado.fantasia);
        this.TelefoneSanitizer(resultado.telefone);
      },
      error => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Não foi possível encontrar o Fornecedor, verifique o Cnpj e tente novamente!',
          detail: error.error.mensagens
        });
      }
    );
  }

  // Tratamento dos telefones recebidos pela receita federal

  private TelefoneSanitizer(telefone: string) {
    const telefones: FornecedorTelefone[] = [];
    const telefonesString = telefone
      .split(' ').join('')
      .split('-').join('')
      .split(')').join('')
      .split('(').join('')
      .split('/');

    telefonesString.forEach(t => {
      const telefoneFornecedor = {} as FornecedorTelefone;
      telefoneFornecedor.numero = t;
      telefoneFornecedor.tipo = 'TRABALHO'; //Remover tipo
      telefones.push(telefoneFornecedor);
    });

    this.alimentaTelefones(telefones);
  }

  private alimentaTelefones(telefones: FornecedorTelefone[]) {

    telefones.forEach(t1 => {
      let jaExiste = false;
      this.listaTelefones.forEach(t2 => {
        if (t1.numero === t2.numero) {
          jaExiste = true;
        }
      });

      if (!jaExiste) {
        this.listaTelefones.push(t1);
      }
    });
  }

  novo() {
    this.editando = false;
    this.listaTelefones = [];
    this.formFornecedor.reset();
    this.router.navigate(['/fornecedor/novo']);
  }

  cancelar() {
    const id = this.formFornecedor.get('id').value;
    if (id) {
      this.carregarFornecedor(id);
    } else {
      this.novo();
    }
  }

  pesquisar() {
    this.router.navigate(['/fornecedor/pesquisa']);
  }

  excluir() {
    const id = this.formFornecedor.get('id').value;
    const confirmacao = confirm('Deseja excluir este fornecedor ?');
    if (confirmacao) {
      this.fornecedorCrudService.deletar(id).subscribe(
        resultado => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso!',
            detail: 'Fornecedor excluído com sucesso!'
          });
          this.novo();
        }
      );
    }
  }
}
