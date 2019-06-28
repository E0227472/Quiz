package com.checklist.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@SuppressWarnings("serial")
@ResponseStatus(HttpStatus.NOT_FOUND)
public class QuizAlreadyExistsException extends Exception{

	public QuizAlreadyExistsException(String message) {
		super(message);
	}
}
