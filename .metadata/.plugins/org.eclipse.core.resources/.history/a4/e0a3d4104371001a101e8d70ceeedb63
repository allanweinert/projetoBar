package br.inf.ids.treina1.core.exception;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class ConstraintViolationMapper implements ExceptionMapper<ConstraintViolationException> {

	private String format(ConstraintViolation<?> cv) {
		return cv.getPropertyPath().toString() + ": " + cv.getMessage();
	}
	
	@Override
	public Response toResponse(ConstraintViolationException exception) {
		
		List<String> msgs = exception.getConstraintViolations().stream()
        	.map(this::format)
        	.collect(Collectors.toList());
        	
		return Response
				.status(Status.BAD_REQUEST)
				.entity(new ExceptionMessage(msgs))
				.build();
		
	}

}
