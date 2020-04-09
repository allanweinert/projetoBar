package br.inf.ids.treina1.api.categoria;

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

import br.inf.ids.treina1.api.categoria.Categoria;
import br.inf.ids.treina1.api.categoria.CategoriaService;

@Tag(name = "Categoria")
@Path("/categoria")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)

public class CategoriaResource {
	
	@Inject
	CategoriaService categoriaService;
	
	@POST
	public Long post(Categoria categoria) {
		return categoriaService.gravar(categoria);
	}
	
	@GET
	@Path("/{id}")
	public Categoria get(@PathParam("id") Long id) {
		return categoriaService.busca(id);
	}
	
	@GET
	@Path("/tudo")
	public List<Categoria> getTodas() {
		return categoriaService.tudo();
	}
	
	@PUT
	public void put(Categoria categoria) {
		categoriaService.atualizar(categoria);
	}
	
	@DELETE
	@Path("/{id}")
	public void delete(@PathParam("id") Long id) {
		categoriaService.remover(id);
	}
	
	@GET
	@Path("/pesquisa")
	public PaginationResult<Categoria> pesquisa(
			@QueryParam("pagina") Integer pagina,
			@Parameter(required = false, name = "valor") @QueryParam("valor") String valor) {
		return categoriaService.pesquisa(pagina, valor);
	}
	
	

}
