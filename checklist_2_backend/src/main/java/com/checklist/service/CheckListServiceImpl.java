package com.checklist.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.checklist.beans.Question;
import com.checklist.beans.Quiz;
import com.checklist.exceptions.NoObjectExistException;
import com.checklist.exceptions.QuizAlreadyExistsException;
import com.checklist.repository.QuizRepository;

@Service
public class CheckListServiceImpl implements CheckListService {

	@Autowired
	QuizRepository quizRepository;

	// getting a quiz by it's id. return a custom exception error if the quiz does not exist
	@Override
	public Quiz getQuizById(long id) throws NoObjectExistException {
		Optional<Quiz> _quiz = quizRepository.findById(id);
		if(!_quiz.isPresent())
			throw new NoObjectExistException("No such quiz exists");
		
		return _quiz.get();
	}

	// getting all the quizzes from the database - throw exception if no quizzes
	@Override
	public List<Quiz> getAllQuizzes() throws NoObjectExistException {
		List<Quiz> quizzes = quizRepository.findAll();
		if(quizzes.size() == 0)
			throw new NoObjectExistException("There are no Quizzes in the database");
		
		return quizzes;
	}

	// getting a quiz by its name 
	@Override
	public Quiz getQuizByName(String quiz) throws NoObjectExistException {
		Quiz _quiz = quizRepository.findQuiz(quiz);
		if(_quiz == null)
			throw new NoObjectExistException("No such quiz exists with the name: " + quiz);
		
		
		return _quiz;
	}

	// creating a new Quiz
	@Override
	public Quiz createQuiz(Quiz quiz) throws QuizAlreadyExistsException {
		// find quiz by the given input name 
		Quiz _quiz = quizRepository.findQuiz(quiz.getQuiz());
		// if quiz exists prevent saving, throw an exception
	
		if(_quiz != null)
			throw new QuizAlreadyExistsException("The quiz with the name: " + quiz.getQuiz() + " already exists");
		
		if (quiz.getQuestions() != null) {
			for (Question question : quiz.getQuestions()) {
				// this step important to link the child object (many) to parent so that foreign
				// key wont be null
				// to prevent recurssion problem when posting object, use @JsonIgnore at the
				// setQuiz method
				question.setQuiz(quiz);
			}

		}
		return quizRepository.save(quiz);
	}

}
