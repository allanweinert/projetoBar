import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { PessoaCrudService } from '../services/pessoa-crud.service';
import { Pessoa } from '../modelos/pessoa';
import { PessoaPesquisaService } from '../services/pessoa-pesquisa.service';
import { MunicipioPesquisaService } from '../../municipio/services/municipio-pesquisa.service';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.css'],
  providers: [
    PessoaCrudService,
    PessoaPesquisaService,
    MunicipioPesquisaService
  ]
})
export class PessoaFormComponent implements OnInit {

  ptBR;

  sexos = [];
  municipios = [];
  listaTelefones = [];
  formPessoa: FormGroup;
  editando = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private municipioPesquisaService: MunicipioPesquisaService,
              private pessoaPesquisaService: PessoaPesquisaService,
              private pessoaCrudService: PessoaCrudService) {
    this.configurarFormulario();
    this.configurarCalendar();
  }

  ngOnInit() {
    this.sexos = this.pessoaPesquisaService.listarSexos();
    this.verificarParametroRota();
  }

  configurarFormulario() {
    this.formPessoa = this.formBuilder.group({
      id: '',
      nome: ['', Validators.required],
      nascimento: [''],
      municipioDeNascimento: '',
      cpf: '',
      sexo: ''
    });
    this.formPessoa.get('id').disable();
  }

  configurarCalendar() {
    this.ptBR = {
      firstDayOfWeek: 0, // iniciar semana no domingo
      dayNames: [ 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado' ],
      dayNamesShort: [ 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb' ],
      dayNamesMin: [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
      monthNames: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
      monthNamesShort: [ 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez' ],
      today: 'Hoje',
      clear: 'Limpar'
    };
  }

  verificarParametroRota(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarPessoa(id);
    } else {
      this.novo();
    }
  }

  carregarPessoa(id: number) {
    this.pessoaCrudService.carregar(id).subscribe(
      pessoa => {
        this.formPessoa.patchValue(pessoa);
        this.listaTelefones = pessoa.telefones;
        this.editando = true;
      }
    );
  }

  getPessoaDoForm(): Pessoa {
    const pessoa = this.formPessoa.getRawValue();
    pessoa.telefones = this.listaTelefones;
    pessoa.cpf = pessoa.cpf !== '' ? pessoa.cpf : null; 
    return pessoa;
  }

  salvar() {
    if (this.validarFormulario()) {
      const pessoa: Pessoa = this.getPessoaDoForm();
      if (pessoa.id) {
        this.atualizarPessoa(pessoa);
      } else {
        this.incluirPessoa(pessoa);
      }
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Não é possível salvar a Pessoa!',
        detail: 'Verifique o preenchimento dos campos e tente novamente.'
      });
    }
  }

  atualizarPessoa(pessoa: Pessoa) {
    this.pessoaCrudService.atualizar(pessoa).subscribe(
      pessoaId => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Pessoa ' + pessoa.nome + ' alterada com sucesso!'
        });
      }
    );
  }

  incluirPessoa(pessoa: Pessoa) {
    this.pessoaCrudService.incluir(pessoa).subscribe(
      pessoaId => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Pessoa ' + pessoa.nome + ' incluída com sucesso!'
        });
      },
      error => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Não foi possível salvar a Pessoa!',
          detail: JSON.stringify(error)
        });
      }
    );
  }

  validarFormulario() {
    this.formPessoa.markAsDirty();
    this.formPessoa.updateValueAndValidity();
    return this.formPessoa.valid;
  }

  excluir() {
    const id = this.formPessoa.get('id').value;
    const confirmacao = confirm('Deseja excluir o Município ' + id + '?');
    if (confirmacao) {
      this.pessoaCrudService.deletar(id).subscribe(
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
    this.formPessoa.reset({
      sexo: 'NAO_INFORMADO'
    });
    this.router.navigate(['/pessoa/novo']);
  }

  cancelar() {
    const id = this.formPessoa.get('id').value;
    if (id) {
      this.carregarPessoa(id);
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
