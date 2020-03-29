package br.inf.ids.treina1.api.produto;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import com.ordnaelmedeiros.jpafluidselect.querybuilder.select.pagination.PaginationResult;

import br.inf.ids.treina1.api.produto.Produto;

@Tag(name = "Produto")
@Path("/produto")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProdutoResource {

	@Inject
	ProdutoService produtoService;
	
	@POST
	public Long post(Produto produto) {
		return produtoService.gravar(produto);
	}
	
	@GET
	@Path("/{id}")
	public Produto get(@PathParam("id") Long id) {
		return produtoService.busca(id);
	}
	
	@GET
	@Path("/tudo")
	public List<Produto> getTodas() {
		return produtoService.tudo();
	}
	
	@PUT
	public void put(Produto produto) {
		produtoService.atualizar(produto);
	}
	
	@DELETE
	@Path("/{id}")
	public void delete(@PathParam("id") Long id) {
		produtoService.remover(id);
	}
	
	@GET
	@Path("/pesquisa")
	public PaginationResult<Produto> pesquisa(
			@QueryParam("pagina") Integer pagina,
			@Parameter(required = false, name = "valor") @QueryParam("valor") String valor) {
		return produtoService.pesquisa(pagina, valor);
	}
	
}