package br.inf.ids.treina1.api.grafico;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Tag(name = "Gráfico", description = "Gráfico")
@Path("/grafico")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)

public class GraficoResource {
	
	@Inject
	GraficoService graficoService;
		
	@GET
	@Path("/todos")
	public List<Grafico> getTodos() {
		return graficoService.todos();
	}

}
