package CustomerServer.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import CustomerServer.dto.ResponseFormat;

@RestControllerAdvice
public class GlobalExceptionHandler {
  // Handle validation & argument errors
  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<ResponseFormat<?>> handleIllegalArgument(IllegalArgumentException ex) {
    return ResponseEntity
        .badRequest()
        .body(ResponseFormat.fail(null, ex.getMessage()));
  }

  // Handle ResponseStatusException (BAD_REQUEST, UNAUTHORIZED, etc.)
  @ExceptionHandler(ResponseStatusException.class)
  public ResponseEntity<ResponseFormat<?>> handleResponseStatus(ResponseStatusException ex) {
    return ResponseEntity
        .status(ex.getStatusCode())
        .body(ResponseFormat.fail(null, ex.getReason()));
  }

  // Catch-all for any other exceptions
  @ExceptionHandler(Exception.class)
  public ResponseEntity<ResponseFormat<?>> handleGeneralError(Exception ex) {
    ex.printStackTrace(); // or use logger
    return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(ResponseFormat.fail(null, "Internal server error"));
  }
}
