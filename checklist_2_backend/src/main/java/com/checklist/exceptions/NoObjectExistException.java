package com.checklist.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@SuppressWarnings("serial")
@ResponseStatus(HttpStatus.NOT_FOUND)
public class NoObjectExistException extends Exception {

	public NoObjectExistException(String message) {
		super(message);
	}
}
