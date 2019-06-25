package com.checklist.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.checklist.beans.Quiz;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

	@Query("SELECT q FROM Quiz q WHERE q.quiz = :quiz")
	Quiz findQuiz(String quiz);
}
