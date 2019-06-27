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
import com.checklist.repository.OptionsRepository;
import com.checklist.repository.QuestionRepository;
import com.checklist.repository.QuizRepository;

@RestController
public class CheckListController {

	@Autowired
	QuestionRepository questionRepository;

	@Autowired
	QuizRepository quizRepository;

	@Autowired
	OptionsRepository optionsRepository;

	// get all quizzes
	@GetMapping("/quizzes")
	public List<Quiz> getAllQuizzes() {
		return quizRepository.findAll();
	}

	// get quiz by id
	@GetMapping("/quiz/id/{id}")
	public Optional<Quiz> getQuizById(@PathVariable(value = "id") long id) {
		return quizRepository.findById(id);
	}

	// get quiz by name
	@GetMapping("/quiz/{quizName}")
	public Quiz getQuizByName(@PathVariable(value = "quizName") String quizName) {
		return quizRepository.findQuiz(quizName);
	}

	// Create a new quiz
	@PostMapping("/createquiz")
	public Quiz createQuiz(@Valid @RequestBody Quiz quiz) {

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
