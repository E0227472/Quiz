package com.checklist.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.checklist.beans.Options;
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

	// get all options
	@GetMapping("/options")
	public List<Options> getAllOptions() {
		return optionsRepository.findAll();
	}

}
