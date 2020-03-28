package br.inf.ids.treina1.api.materia;

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
import javax.ws.rs.core.MediaType;

import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Tag(name = "Materia")
@Path("/materia")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MateriaResource {

	@Inject
	MateriaService materiaService;
	
	@POST
	public Long post(Materia materia) {
		return materiaService.gravar(materia);
	}
	
	@GET
	@Path("/{id}")
	public Materia get(@PathParam("id") Long id) {
		return materiaService.busca(id);
	}
	
	@GET
	@Path("/tudo")
	public List<Materia> getTodas() {
		return materiaService.tudo();
	}
	
	@PUT
	public void put(Materia materia) {
		materiaService.atualizar(materia);
	}
	
	@DELETE
	@Path("/{id}")
	public void delete(@PathParam("id") Long id) {
		materiaService.remover(id);
	}
	
}
