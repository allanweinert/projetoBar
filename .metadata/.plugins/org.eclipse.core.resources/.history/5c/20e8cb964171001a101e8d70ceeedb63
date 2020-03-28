package br.inf.ids.treina1.api.municipio.uf;

public class UfDescricao {

	private String key;
	private String value;
	
	public String getKey() {
		return key;
	}
	public String getValue() {
		return value;
	}
	
	public UfDescricao() {
	}
	
	public static UfDescricao parse(UF uf) {
		UfDescricao u = new UfDescricao();
		u.key = uf.toString();
		u.value = uf.getDescricao();
		return u;
	}
	
}
