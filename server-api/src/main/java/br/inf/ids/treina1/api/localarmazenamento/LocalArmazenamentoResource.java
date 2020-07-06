package br.inf.ids.treina1.api.localarmazenamento;

import com.ordnaelmedeiros.jpafluidselect.querybuilder.select.pagination.PaginationResult;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;


@Tag(name = "LocalArmazenamento", description = "Local de armazenamento")
@Path("/localarmazenamento")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)

public class LocalArmazenamentoResource {

    @Inject
    LocalArmazenamentoService localarmazenamentoService;

    @POST
    public Long post(LocalArmazenamento localarmazenamento) {
        return localarmazenamentoService.gravar(localarmazenamento);
    }

    @GET
    @Path("/{id}")
    public LocalArmazenamento get(@PathParam("id") Long id) {
        return localarmazenamentoService.busca(id);
    }

    @GET
    @Path("/tudo")
    public List<LocalArmazenamento> getTodas() {
        return localarmazenamentoService.tudo();
    }

    @PUT
    public void put(LocalArmazenamento localarmazenamento) {
        localarmazenamentoService.atualizar(localarmazenamento);
    }

    @DELETE
    @Path("/{id}")
    public void delete(@PathParam("id") Long id) {
        localarmazenamentoService.remover(id);
    }

    @GET
    @Path("/pesquisa")
    public PaginationResult<LocalArmazenamento> pesquisa(
            @QueryParam("pagina") Integer pagina,
            @Parameter(required = false, name = "valor") @QueryParam("valor") String valor) {
        return localarmazenamentoService.pesquisa(pagina, valor);
    }


}
