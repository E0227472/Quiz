package com.checklist.service;

import java.util.List;

import com.checklist.beans.Quiz;
import com.checklist.exceptions.NoObjectExistException;
import com.checklist.exceptions.QuizAlreadyExistsException;

public interface CheckListService {

	// get a quiz by id 
	public Quiz getQuizById(long id) throws NoObjectExistException;
	
	// get all quizzes 
	public List<Quiz> getAllQuizzes() throws NoObjectExistException;
	
	// get a quiz by name 
	public Quiz getQuizByName(String quiz) throws NoObjectExistException;
	
	// create a new quiz 
	public Quiz createQuiz(Quiz quiz) throws QuizAlreadyExistsException;
}
