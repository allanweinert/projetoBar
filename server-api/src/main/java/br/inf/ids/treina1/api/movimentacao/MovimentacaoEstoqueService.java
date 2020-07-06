package br.inf.ids.treina1.api.movimentacao;

import java.util.List;
import java.util.Set;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Validator;

import com.ordnaelmedeiros.jpafluidselect.querybuilder.QueryBuilder;
import com.ordnaelmedeiros.jpafluidselect.querybuilder.select.pagination.PaginationResult;

import br.inf.ids.treina1.api.movimentacao.enums.MovimentacaoEstoqueTipo;
import br.inf.ids.treina1.api.movimentacao.itens.ItemEntrada;
import br.inf.ids.treina1.api.movimentacao.itens.ItemEntrada_;
import br.inf.ids.treina1.api.movimentacao.itens.ItemSaida;
import br.inf.ids.treina1.api.movimentacao.saldoestoque.SaldoEstoque;
import br.inf.ids.treina1.api.movimentacao.saldoestoque.SaldoEstoqueService;
import br.inf.ids.treina1.api.movimentacao.saldoestoque.SaldoEstoque_;
import br.inf.ids.treina1.api.movimentacao.validacao.MovimentacaoEstoqueValidaItemComTipo;

@RequestScoped
public class MovimentacaoEstoqueService {
	
	@Inject
	EntityManager em;
	
	@Inject
	Validator validator;
	
	@Inject
	MovimentacaoEstoqueValidaItemComTipo movimentacaoEstoqueValidaItemComTipo;
	
	@Inject
	SaldoEstoqueService saldoEstoqueService;
	
	private void validar(MovimentacaoEstoque movimentacaoEstoque) {
		Set<ConstraintViolation<Object>> validate = validator.validate(movimentacaoEstoque);
		if (!validate.isEmpty()) {
			throw new ConstraintViolationException(validate);
		}
		//movimentacaoEstoqueValidaItemComTipo.validar(movimentacaoEstoque);
	}

	
	public List<MovimentacaoEstoque> todas() {
		return new QueryBuilder(em)
			.select(MovimentacaoEstoque.class)
			.getResultList();
	}
	
	@Transactional
	public Long gravar(MovimentacaoEstoque movimentacaoEstoque) {
		this.validar(movimentacaoEstoque);
		em.persist(movimentacaoEstoque);
		if (MovimentacaoEstoqueTipo.ENTRADA.equals(movimentacaoEstoque.getTipo())) {
			for (ItemEntrada itemEntrada : movimentacaoEstoque.getItensEntrada()) {
				SaldoEstoque saldo = new SaldoEstoque();
				saldo.setItemEntrada(itemEntrada);
				saldo.setLocalArmazenamento(movimentacaoEstoque.getLocalArmazenamento());
				saldo.setRestante(itemEntrada.getQuantidade());
				saldoEstoqueService.gravar(saldo);
			}
		} else if (MovimentacaoEstoqueTipo.SAIDA.equals(movimentacaoEstoque.getTipo())) {
			for (ItemSaida itemSaida : movimentacaoEstoque.getItensSaida()) {
				
				SaldoEstoque saldo = 
						new QueryBuilder(em)
							.select(SaldoEstoque.class)
								.innerJoin(SaldoEstoque_.itemEntrada).on()
									.field(ItemEntrada_.produto).eq(itemSaida.getProduto())
									.field(ItemEntrada_.valorUnitario).eq(itemSaida.getValorUnitario())
								.end()
						.where()
							.field(SaldoEstoque_.localArmazenamento).eq(movimentacaoEstoque.getLocalArmazenamento())
						.getSingleResult();
				
				saldo.setRestante(saldo.getRestante()-itemSaida.getQuantidade());
			
				saldoEstoqueService.atualizar(saldo);		
				
			}	
		}
		return movimentacaoEstoque.getId();
	}

	public MovimentacaoEstoque busca(Long id) {
		return em.find(MovimentacaoEstoque.class, id);
	}

	@Transactional
	public void atualizar(MovimentacaoEstoque movimentacaoEstoque) {
		this.validar(movimentacaoEstoque);
		em.merge(movimentacaoEstoque);
	}
	
	@Transactional
	public void remover(Long id) {
		em.remove(busca(id));
	}

	public PaginationResult<MovimentacaoEstoque> pesquisa(Integer pagina, String valor) {
		
		return new QueryBuilder(em)
			.select(MovimentacaoEstoque.class)
			.where().orGroup(w -> {
				
				if (valor!=null) {
					try {
						Long pesquisaId = Long.valueOf(valor);
						w.field(MovimentacaoEstoque_.id).eq(pesquisaId);
					} catch (Exception e) {}
					
				}
			})
			.pagination()
				.numRows(10)
				.page(pagina)
			.getResultList();
		
	}
	
}
