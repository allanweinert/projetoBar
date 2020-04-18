import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FornecedorCrudService } from '../services/fornecedor-crud.service';
import { Fornecedor } from '../modelos/fornecedor';
import { FornecedorPesquisaService } from '../services/fornecedor-pesquisa.service';
import { MunicipioPesquisaService } from '../../municipio/services/municipio-pesquisa.service';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
  styleUrls: ['./fornecedor-form.component.css'],
  providers: [
    FornecedorCrudService,
    FornecedorPesquisaService,
    MunicipioPesquisaService
  ]
})
export class FornecedorFormComponent implements OnInit {

  ptBR;

  sexos = [];
  municipios = [];
  listaTelefones = [];
  formFornecedor: FormGroup;
  editando = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private municipioPesquisaService: MunicipioPesquisaService,
              private fornecedorPesquisaService: FornecedorPesquisaService,
              private fornecedorCrudService: FornecedorCrudService) {
    this.configurarFormulario();
  }

  ngOnInit() {
    this.sexos = this.fornecedorPesquisaService.listarSexos();
    this.verificarParametroRota();
  }

  configurarFormulario() {
    this.formFornecedor = this.formBuilder.group({
      id: '',
      razaoSocial: ['', Validators.required],
      nomeFantasia: [''],
      cpf: '',
      cnpj: '',
      municipioFornecedor: ''
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
    fornecedor.cpf = fornecedor.cpf !== '' ? fornecedor.cpf : null;
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
          detail: 'Fornecedor ' + fornecedor.nome + ' alterado com sucesso!'
        });
      }
    );
  }

  incluirFornecedor(fornecedor: Fornecedor) {
    this.fornecedorCrudService.incluir(fornecedor).subscribe(
      fornecedorId => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Fornecedor ' + fornecedor.nome + ' incluído com sucesso!'
        });
      },
      error => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Não foi possível salvar o Fornecedor!',
          detail: JSON.stringify(error)
        });
      }
    );
  }

  validarFormulario() {
    this.formFornecedor.markAsDirty();
    this.formFornecedor.updateValueAndValidity();
    return this.formFornecedor.valid;
  }

  excluir() {
    const id = this.formFornecedor.get('id').value;
    const confirmacao = confirm('Deseja excluir o Município ' + id + '?');
    if (confirmacao) {
      this.fornecedorCrudService.deletar(id).subscribe(
        resultado => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso!',
            detail: 'Município ' + id + ' excluído com sucesso!'
          });
          this.novo();
        }
      );
    }
  }

  novo() {
    this.editando = false;
    this.listaTelefones = [];
    this.formFornecedor.reset({
      sexo: 'NAO_INFORMADO'
    });
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

  pesquisarMunicipio(pesquisa) {
    this.municipioPesquisaService.pesquisar(pesquisa.query).subscribe(
      resultadoado => {
        this.municipios = resultadoado.data;
      }
    );
  }

}
