package br.inf.ids.treina1.core.exception;

import java.util.Arrays;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;
import org.jboss.resteasy.spi.DefaultOptionsMethodException;

@Provider
public class RuntimeExceptionMapper implements ExceptionMapper<RuntimeException> {

	@Override
	public Response toResponse(RuntimeException exception) {
		
		if (exception instanceof DefaultOptionsMethodException) {
			
			return Response.ok("GET, POST, DELETE, PUT, OPTIONS, HEAD").build();
			
		} else {
			return Response
				.status(Status.BAD_REQUEST)
				.entity(new ExceptionMessage(Arrays.asList(exception.getMessage())))
				.build();
		}
		
	}

}
