package br.inf.ids.treina1.api.testecdi;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;

@RequestScoped
public class RequestTeste {

	@Inject
	ApplicationTeste appTeste;
	
	private Integer index = 0;
	
	public Integer teste() {
		index++;
		return index;
	}
	
	
	public Integer app() {
		return appTeste.teste();
	}
	
}
