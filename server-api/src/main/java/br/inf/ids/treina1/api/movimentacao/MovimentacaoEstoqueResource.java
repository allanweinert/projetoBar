package br.inf.ids.treina1.api.movimentacao;

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

import br.inf.ids.treina1.api.movimentacao.dto.SaldoEstoqueDTO;

@Tag(name = "Movimentação de Estoque", description = "Movimentações do estoque")
@Path("/movimentaestoque")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MovimentacaoEstoqueResource {
	
	@Inject
	MovimentacaoEstoqueService movimentacaoEstoqueService;
	
	@POST
	public Long post(MovimentacaoEstoque movimentacaoEstoque) {
		return movimentacaoEstoqueService.gravar(movimentacaoEstoque);
	}
	
	@GET
	@Path("/{id}")
	public MovimentacaoEstoque get(@PathParam("id") Long id) {
		return movimentacaoEstoqueService.busca(id);
	}
	
	@GET
	@Path("/tudo")
	public List<MovimentacaoEstoque> getTodas() {
		return movimentacaoEstoqueService.todas();
	}
	
	@PUT
	public void put(MovimentacaoEstoque movimentacaoEstoque) {
		movimentacaoEstoqueService.atualizar(movimentacaoEstoque);
	}
	
	@DELETE
	@Path("/{id}")
	public void delete(@PathParam("id") Long id) {
		movimentacaoEstoqueService.remover(id);
	}
	
	@GET
	@Path("/pesquisa")
	public PaginationResult<MovimentacaoEstoque> pesquisa(
			@QueryParam("pagina") Integer pagina,
			@Parameter(required = false, name = "valor") @QueryParam("valor") String valor) {
		return movimentacaoEstoqueService.pesquisa(pagina, valor);
	}
	
	@GET
	@Path("/dashboard")
	public List<SaldoEstoqueDTO> getDashboard() {
		return movimentacaoEstoqueService.saldo();
	}
}
