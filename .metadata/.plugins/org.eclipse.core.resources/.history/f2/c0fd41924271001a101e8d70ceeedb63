package br.inf.ids.treina1.api.pessoa;

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

@Tag(name = "Pessoa")
@Path("/pessoa")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PessoaResource {
	
	@Inject
	PessoaService pessoaService;
	
	@POST
	public Long post(Pessoa pessoa) {
		return pessoaService.gravar(pessoa);
	}
	
	@GET
	@Path("/{id}")
	public Pessoa get(@PathParam("id") Long id) {
		return pessoaService.busca(id);
	}
	
	@GET
	@Path("/tudo")
	public List<Pessoa> getTodas() {
		return pessoaService.todas();
	}
	
	@PUT
	public void put(Pessoa pessoa) {
		pessoaService.atualizar(pessoa);
	}
	
	@DELETE
	@Path("/{id}")
	public void delete(@PathParam("id") Long id) {
		pessoaService.remover(id);
	}
	
	@GET
	@Path("/pesquisa")
	public PaginationResult<Pessoa> pesquisa(
			@QueryParam("pagina") Integer pagina,
			@Parameter(required = false, name = "valor") @QueryParam("valor") String valor) {
		return pessoaService.pesquisa(pagina, valor);
	}
	
}
