package br.inf.ids.treina1.api.entradadeproduto;

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

@Tag(name = "Entrada De Produto", description = "Entrada do produto")
@Path("/entradaproduto")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EntradaDeProdutoResource {
	
	@Inject
	EntradaDeProdutoService entradaProdutoService;
	
	@POST
	public Long post(EntradaDeProduto entradaProduto) {
		return entradaProdutoService.gravar(entradaProduto);
	}
	
	@GET
	@Path("/{id}")
	public EntradaDeProduto get(@PathParam("id") Long id) {
		return entradaProdutoService.busca(id);
	}
	
	@GET
	@Path("/tudo")
	public List<EntradaDeProduto> getTodas() {
		return entradaProdutoService.todas();
	}
	
	@PUT
	public void put(EntradaDeProduto entradaProduto) {
		entradaProdutoService.atualizar(entradaProduto);
	}
	
	@DELETE
	@Path("/{id}")
	public void delete(@PathParam("id") Long id) {
		entradaProdutoService.remover(id);
	}
	
	@GET
	@Path("/pesquisa")
	public PaginationResult<EntradaDeProduto> pesquisa(
			@QueryParam("pagina") Integer pagina,
			@Parameter(required = false, name = "valor") @QueryParam("valor") String valor) {
		return entradaProdutoService.pesquisa(pagina, valor);
	}
	
}
