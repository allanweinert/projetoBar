package br.inf.ids.treina1.api.municipio;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

import org.eclipse.microprofile.openapi.annotations.enums.SchemaType;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import com.ordnaelmedeiros.jpafluidselect.querybuilder.select.pagination.PaginationResult;

import br.inf.ids.treina1.api.municipio.uf.UF;
import br.inf.ids.treina1.api.municipio.uf.UfDescricao;

@Tag(name = "Município")
@Path("/municipio")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MunicipioResource {
	
	@Inject
	MunicipioService municipioService;
	
	@Inject
	MunicipioPesquisa municipioPesquisa;
	
	@Inject
	MunicipioPesquisaPorUF pesquisaPorUF;

	@POST
	public Long post(Municipio municipio) {
		return municipioService.gravar(municipio);
	}
	
	@GET
	@Path("/{id}")
	public Municipio get(@PathParam("id") Long id) {
		return municipioService.busca(id);
	}
	

	@PUT
	public void put(Municipio municipio) {
		municipioService.atualizar(municipio);
	}
	
	@DELETE
	@Path("/{id}")
	public void delete(@PathParam("id") Long id) {
		municipioService.remover(id);
	}
	
	@GET
	@Path("/pesquisa")
	public PaginationResult<Municipio> pesquisa(
			@QueryParam("pagina") Integer pagina,
			@Parameter(required = false, name = "valor") @QueryParam("valor") String valor) {
		return municipioPesquisa.executar(pagina, valor);
	}
	
	@GET
	@Path("/pesquisa/poruf/{uf}")
	public List<Municipio> porUf(
			@Parameter(name = "uf", schema = @Schema(type = SchemaType.STRING)) 
			@PathParam("uf") UF uf) {
		return pesquisaPorUF.executar(uf);
	}
	
	@GET
	@Path("/uf/tudo")
	public List<UfDescricao> ufs() {
		return Stream.of(UF.values()).map(UfDescricao::parse).collect(Collectors.toList());
	}
}
