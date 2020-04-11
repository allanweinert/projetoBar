package br.inf.ids.treina1.api.fornecedor;

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

@Tag(name = "Fornecedor", description = "Fornecedor do produto")
@Path("/fornecedor")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class FornecedorResource {
	
	@Inject
	FornecedorService fornecedorService;
	
	@POST
	public Long post(Fornecedor fornecedor) {
		return fornecedorService.gravar(fornecedor);
	}
	
	@GET
	@Path("/{id}")
	public Fornecedor get(@PathParam("id") Long id) {
		return fornecedorService.busca(id);
	}
	
	@GET
	@Path("/tudo")
	public List<Fornecedor> getTodas() {
		return fornecedorService.todas();
	}
	
	@PUT
	public void put(Fornecedor fornecedor) {
		fornecedorService.atualizar(fornecedor);
	}
	
	@DELETE
	@Path("/{id}")
	public void delete(@PathParam("id") Long id) {
		fornecedorService.remover(id);
	}
	
	@GET
	@Path("/pesquisa")
	public PaginationResult<Fornecedor> pesquisa(
			@QueryParam("pagina") Integer pagina,
			@Parameter(required = false, name = "valor") @QueryParam("valor") String valor) {
		return fornecedorService.pesquisa(pagina, valor);
	}
	
}
