package br.inf.ids.treina1.api.config;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Tag(name = "Config", description = "Configuração do sistema")
@Path("/config")
@Produces(MediaType.APPLICATION_JSON)
public class ConfigResource {

	@Inject
	ConfigService configService;
	
	@GET
	@Path("/{id}")
	public Config get(@PathParam("id") Long id) {
		return configService.busca(id);
	}
	
	@GET
	@Path("porNome/{nome}")
	public List<Config> get(@PathParam("nome") String nome) {
		return configService.porNome(nome);
	}
	
}
