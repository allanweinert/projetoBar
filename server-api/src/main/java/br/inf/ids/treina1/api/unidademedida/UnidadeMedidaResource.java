package br.inf.ids.treina1.api.unidadedemedida;

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

import br.inf.ids.treina1.api.unidadedemedida.UnidadeMedida;
import br.inf.ids.treina1.api.unidadedemedida.UnidadeMedidaService;

@Tag(name = "UnidadeMedida")
@Path("/unidademedida")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)

public class UnidadeMedidaResource {
	
	@Inject
	UnidadeMedidaService unidademedidaService;
	
	@POST
	public Long post(UnidadeMedida unidademedida) {
		return unidademedidaService.gravar(unidademedida);
	}
	
	@GET
	@Path("/{id}")
	public UnidadeMedida get(@PathParam("id") Long id) {
		return unidademedidaService.busca(id);
	}
	
	@GET
	@Path("/tudo")
	public List<UnidadeMedida> getTodas() {
		return unidademedidaService.tudo();
	}
	
	@PUT
	public void put(UnidadeMedida unidademedida) {
		unidademedidaService.atualizar(unidademedida);
	}
	
	@DELETE
	@Path("/{id}")
	public void delete(@PathParam("id") Long id) {
		unidademedidaService.remover(id);
	}
	
	@GET
	@Path("/pesquisa")
	public PaginationResult<UnidadeMedida> pesquisa(
			@QueryParam("pagina") Integer pagina,
			@Parameter(required = false, name = "valor") @QueryParam("valor") String valor) {
		return unidademedidaService.pesquisa(pagina, valor);
	}
	
	

}
