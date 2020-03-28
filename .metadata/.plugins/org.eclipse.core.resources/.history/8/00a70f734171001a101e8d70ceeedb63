package br.inf.ids.treina1.api.curso;

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

@Tag(name = "Curso")
@Path("/curso")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CursoResource {

	@Inject
	CursoService cursoService;
	
	@POST
	public Long post(Curso curso) {
		return cursoService.gravar(curso);
	}
	
	@GET
	@Path("/{id}")
	public Curso get(@PathParam("id") Long id) {
		return cursoService.busca(id);
	}
	
	@GET
	@Path("/tudo")
	public List<Curso> getTodas() {
		return cursoService.tudo();
	}
	
	@PUT
	public void put(Curso curso) {
		cursoService.atualizar(curso);
	}
	
	@DELETE
	@Path("/{id}")
	public void delete(@PathParam("id") Long id) {
		cursoService.remover(id);
	}
	
}
