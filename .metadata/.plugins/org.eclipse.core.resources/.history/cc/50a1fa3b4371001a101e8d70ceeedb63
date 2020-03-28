package br.inf.ids.treina1.api.testecdi;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("/testecdi")
public class CdiResouce {

	@Inject
	ApplicationTeste applicationTeste;
	
	@Inject
	RequestTeste requestTeste;
	
	
	@GET
	@Path("/app")
	public Integer app() {
		return applicationTeste.teste();
	}
	
	@GET
	@Path("/req")
	public Integer req() {
		return requestTeste.teste();
	}
	
	@GET
	@Path("/req/app")
	public Integer reqApp() {
		return requestTeste.app();
	}
	
}
