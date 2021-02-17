package br.inf.ids.treina1.api.produto;

import java.util.ArrayList;
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

import br.inf.ids.treina1.api.categoria.Categoria;
import br.inf.ids.treina1.api.categoria.Categoria_;
import br.inf.ids.treina1.api.localarmazenamento.LocalArmazenamento;
import br.inf.ids.treina1.api.movimentacao.MovimentacaoEstoque_;
import br.inf.ids.treina1.api.movimentacao.dto.ProdutoRestanteDTO;
import br.inf.ids.treina1.api.movimentacao.itens.ItemEntrada;
import br.inf.ids.treina1.api.movimentacao.itens.ItemEntrada_;
import br.inf.ids.treina1.api.produto.dto.ProdutoPorCategoriaDTO;

@RequestScoped
public class ProdutoService {

	@Inject
	EntityManager em;
	
	@Inject
	Validator validator;
	
	private void validar(Produto produto) {
		Set<ConstraintViolation<Object>> validate = validator.validate(produto);
		if (!validate.isEmpty()) {
			throw new ConstraintViolationException(validate);
		}
	}
	

	public List<Produto> tudo() {
		return new QueryBuilder(em)
			.select(Produto.class)
			.getResultList();
	}
	
	@Transactional
	public Long gravar(Produto produto) {
		this.validar(produto);
		em.persist(produto);
		return produto.getId();
	}

	public Produto busca(Long id) {
		return em.find(Produto.class, id);
	}

	@Transactional
	public void atualizar(Produto produto) {
		this.validar(produto);
		em.merge(produto);
	}
	
	@Transactional
	public void remover(Long id) {
		em.remove(busca(id));
	}
	
	public PaginationResult<Produto> pesquisa(Integer pagina, String valor) {
			
		return new QueryBuilder(em)
			.select(Produto.class)
			.leftJoin(Produto_.entradas)
			.where().orGroup(w -> {
				
				if (valor!=null) {
					try {
						Long produtoId = Long.valueOf(valor);
						w.field(Produto_.id).eq(produtoId);
					} catch (Exception e) {}
					w.field(Produto_.nome).ilike("%"+valor+"%");
				}
			})
			.pagination()
				.numRows(10)
				.page(pagina)
			.getResultList();
			
	}
	
	public PaginationResult<ProdutoPorCategoriaDTO> produtoPorCategoria(Integer pagina, Long categoriaId) {
		Ref<Produto> joinProduto = new Ref<Produto>();
		Ref<Categoria> joinCategoria = new Ref<Categoria>();
		
		PaginationResult<ProdutoPorCategoriaDTO> retorno = new PaginationResult<ProdutoPorCategoriaDTO>();
		
		/*
		 select
			produto.produtoid,
			produto.nome,
			categoria.categoriaid,
			categoria.nome
		from
			produto
		inner join categoria on
			categoria.categoriaid = produto.categoriaid

		 */
		List<ProdutoPorCategoriaDTO> produtos = new QueryBuilder(em)
			.select(Produto.class)
				.innerJoin(Produto_.categoria)
					.ref(joinCategoria)
				.end()
				.innerJoin(Produto_.categoria)
					.on()
						.field(Categoria_.id).eq(categoriaId)
			.fields()
				.field(joinProduto.field(Produto_.id)).alias("id")
				.field(joinProduto.field(Produto_.nome)).alias("nome")
				.field(joinCategoria.field(Categoria_.id)).alias("categoriaId")
				.field(joinCategoria.field(Categoria_.nome)).alias("categoriaNome")
			//.print()
			.getResultListByConstructor(ProdutoPorCategoriaDTO.class);
		
		
		retorno.setLastPage(0);
		retorno.setPageNumber(0);
		retorno.setPageSize(10);
		retorno.setTotalRows(100l);
		
		return retorno;
	}
	
	public PaginationResult<ProdutoRestanteDTO> produtoComSaldoPorLocalArmazenamento(Integer pagina, Long localArmazenamentoId) {
		Ref<Produto> joinProduto = new Ref<Produto>();
		
		PaginationResult<ProdutoRestanteDTO> retorno = new PaginationResult<ProdutoRestanteDTO>();
		
		List<ProdutoRestanteDTO> produtos = new QueryBuilder(em)
				.select(ItemEntrada.class)
					.innerJoin(ItemEntrada_.produto)
						.ref(joinProduto)
					.end()
					.innerJoin(ItemEntrada_.movimentacaoEstoque)
						.on()
							.field(MovimentacaoEstoque_.localArmazenamento).eq(new LocalArmazenamento(localArmazenamentoId))
				.fields()
					.field(joinProduto.field(Produto_.id)).alias("id")
					.field(joinProduto.field(Produto_.nome)).alias("nome")
					.field(ItemEntrada_.restante).alias("restante")
					.field(ItemEntrada_.valorUnitario).alias("valorUnitario")
				.where()
					.field(ItemEntrada_.restante).gt(0)
				.print()
				.getResultListByConstructor(ProdutoRestanteDTO.class);
		
		//Processo que pega o item de menor valor
		List<ProdutoRestanteDTO> listaFinal = new ArrayList<ProdutoRestanteDTO>();
		for (ProdutoRestanteDTO produtoRestanteDTO : produtos) {
			
			if (listaFinal==null || listaFinal.isEmpty()) {
				//como a lista está vazia só adiciona o item
				listaFinal.add(produtoRestanteDTO);
			} else {
				Boolean encontrou = false;
				for (ProdutoRestanteDTO produtoFinal : listaFinal) {				
					//Verifica se encontra o produto já na lista final
					if (produtoRestanteDTO.getId().equals(produtoFinal.getId())) {
						//Se encontrar varifica se o valor que está na lista é menor que valor novo 
						if (produtoRestanteDTO.getValorUnitario().compareTo(produtoFinal.getValorUnitario())==-1) {
							//Se for menor atualiza a informação
							produtoFinal.setValorUnitario(produtoRestanteDTO.getValorUnitario());
							produtoFinal.setRestante(produtoRestanteDTO.getRestante());
						}
						encontrou = true;
						break;
					}
				}
				if (!encontrou) {
					//Quando não encontra já na lista final simplesmente adiciona
					listaFinal.add(produtoRestanteDTO);
				}
			}
			
		}

		//Formata o campo nome com nome+saldo+valor
		for (ProdutoRestanteDTO produtoRestanteDTO : listaFinal) {
			produtoRestanteDTO.setNome(produtoRestanteDTO.getNome()+" - Saldo: "+produtoRestanteDTO.getRestante()+" Valor: "+produtoRestanteDTO.getValorUnitario());
		}
		
		retorno.setData(listaFinal);
		retorno.setLastPage(0);
		retorno.setPageNumber(0);
		retorno.setPageSize(10);
		retorno.setTotalRows(100l);
		
		return retorno;

	}


	public List<ProdutoRestanteDTO> comSaldo(String valor) {
		Ref<ItemEntrada> joinItemEntrada = new Ref<>();
		Ref<Produto> joinProduto = new Ref<>();
		return 
				new QueryBuilder(em)
				.select(ItemEntrada.class)
					.innerJoin(ItemEntrada_.produto).ref(joinProduto)
				.fields()
					.field(joinProduto.field(Produto_.id)).alias("id")
					.field(joinProduto.field(Produto_.nome)).alias("nome")
				.where()
					.field(ItemEntrada_.restante).gt(0)
				.group()
					.add(joinProduto.field(Produto_.id))
				.getResultListByConstructor(ProdutoRestanteDTO.class);

	}
	
}
