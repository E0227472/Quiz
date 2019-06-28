package com.checklist.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.checklist.beans.Question;
import com.checklist.beans.Quiz;
import com.checklist.exceptions.NoObjectExistException;
import com.checklist.exceptions.QuizAlreadyExistsException;
import com.checklist.repository.OptionsRepository;
import com.checklist.repository.QuestionRepository;
import com.checklist.repository.QuizRepository;
import com.checklist.service.CheckListServiceImpl;

@RestController
public class CheckListController {

	@Autowired
	QuizRepository quizRepository;

	@Autowired
	CheckListServiceImpl checkListServiceImpl;

	


	// get all quizzes
	@GetMapping("/quizzes")
	public List<Quiz> getAllQuizzes() throws NoObjectExistException {
		return checkListServiceImpl.getAllQuizzes();
	}

	// get quiz by id
	@GetMapping("/quiz/id/{id}")
	public Quiz getQuizById(@PathVariable(value = "id") long id) throws NoObjectExistException {

		return checkListServiceImpl.getQuizById(id);

	}

	// get quiz by name
	@GetMapping("/quiz/{quizName}")
	public Quiz getQuizByName(@PathVariable(value = "quizName") String quizName) throws NoObjectExistException {
		return checkListServiceImpl.getQuizByName(quizName);
	}

	// Create a new quiz
	@PostMapping("/createquiz")
	public Quiz createQuiz(@Valid @RequestBody Quiz quiz) throws QuizAlreadyExistsException {
		// create quiz object only if name is not in database
		

		return checkListServiceImpl.createQuiz(quiz);
	}

	// update a single quiz object based on the id
	@PutMapping("/quiz/id/{id}")
	public ResponseEntity<Quiz> updateQuiz(@PathVariable(value = "id") long id, @RequestBody Quiz quiz) {
		// get the employee based on the id passed in as parameters and then modify the
		// data
		Optional<Quiz> quz = quizRepository.findById(id);

		// updating the employee object
		if (quz.isPresent()) {
			Quiz _quz = quz.get();
			_quz.setQuiz(quiz.getQuiz()); // => update the quiz name
			_quz.getQuestions().clear();
			for (Question question : quiz.getQuestions())
				_quz.addQuestion(question);

			return new ResponseEntity<>(quizRepository.save(_quz), HttpStatus.OK);
		} else

		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
