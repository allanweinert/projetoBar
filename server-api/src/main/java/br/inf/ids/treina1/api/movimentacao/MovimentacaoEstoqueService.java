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
import com.ordnaelmedeiros.jpafluidselect.querybuilder.select.ref.Ref;

import br.inf.ids.treina1.api.movimentacao.dto.SaldoEstoqueDTO;
import br.inf.ids.treina1.api.movimentacao.enums.MovimentacaoEstoqueTipo;
import br.inf.ids.treina1.api.movimentacao.itens.ItemEntrada;
import br.inf.ids.treina1.api.movimentacao.itens.ItemEntradaService;
import br.inf.ids.treina1.api.movimentacao.itens.ItemEntrada_;
import br.inf.ids.treina1.api.movimentacao.itens.ItemSaida;
import br.inf.ids.treina1.api.movimentacao.validacao.MovimentacaoEstoqueValidaItemComTipo;
import br.inf.ids.treina1.api.produto.Produto;
import br.inf.ids.treina1.api.produto.Produto_;

@RequestScoped
public class MovimentacaoEstoqueService {

	@Inject
	EntityManager em;

	@Inject
	Validator validator;

	@Inject
	MovimentacaoEstoqueValidaItemComTipo movimentacaoEstoqueValidaItemComTipo;

	@Inject
	ItemEntradaService itemEntradaService;

	private void validar(MovimentacaoEstoque movimentacaoEstoque) {
		Set<ConstraintViolation<Object>> validate = validator.validate(movimentacaoEstoque);
		if (!validate.isEmpty()) {
			throw new ConstraintViolationException(validate);
		}
		// movimentacaoEstoqueValidaItemComTipo.validar(movimentacaoEstoque);
	}

	public List<MovimentacaoEstoque> todas() {
		return new QueryBuilder(em).select(MovimentacaoEstoque.class).getResultList();
	}

	@Transactional
	public Long gravar(MovimentacaoEstoque movimentacaoEstoque) {
		//Grava movimentação de estoque
		if (MovimentacaoEstoqueTipo.ENTRADA.equals(movimentacaoEstoque.getTipo())) {
			//Se tipo entrada o valor informado em quantidade será setado em campo restante
			for (ItemEntrada itemEntrada : movimentacaoEstoque.getItensEntrada()) {
				itemEntrada.setRestante(itemEntrada.getQuantidade());
			}
			//valida e grava movimentação
			this.validar(movimentacaoEstoque);
			em.persist(movimentacaoEstoque);
		} else if (MovimentacaoEstoqueTipo.SAIDA.equals(movimentacaoEstoque.getTipo())) {
			//valida e grava movimentação
			this.validar(movimentacaoEstoque);
			em.persist(movimentacaoEstoque);
			
			//Percorre os itens de saída
			for (ItemSaida itemSaida : movimentacaoEstoque.getItensSaida()) {

				//Localiza item entrada em que esta sendo realizada a saída
				ItemEntrada entradaQueEstaFazendoASaida = new QueryBuilder(em)
						.select(ItemEntrada.class)
						.where()
								.field(ItemEntrada_.produto).eq(itemSaida.getProduto())
								.field(ItemEntrada_.valorUnitario).eq(itemSaida.getValorUnitario())
							.getSingleResult();

				//atualiza campo restante em item entrada
				entradaQueEstaFazendoASaida.setRestante(entradaQueEstaFazendoASaida.getRestante() - itemSaida.getQuantidade());				
				itemEntradaService.atualizar(entradaQueEstaFazendoASaida);
				
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
		return new QueryBuilder(em).select(MovimentacaoEstoque.class).where().orGroup(w -> {

			if (valor != null) {
				try {
					Long pesquisaId = Long.valueOf(valor);
					w.field(MovimentacaoEstoque_.id).eq(pesquisaId);
				} catch (Exception e) {
				}

			}
		}).pagination().numRows(10).page(pagina).getResultList();
	}

	public List<SaldoEstoqueDTO> saldo() {		
		Ref<Produto> joinProduto = new Ref<>();		

		return new QueryBuilder(em)
				.select(ItemEntrada.class)
				.fields()
					.field(joinProduto.field(Produto_.nome)).alias("produto")
					.field(ItemEntrada_.restante).alias("restante")
				.where()
					.field(ItemEntrada_.restante).gt(0)
				.group()
					.add(joinProduto.field(Produto_.id))	
				.getResultListByConstructor(SaldoEstoqueDTO.class);
	}
}
