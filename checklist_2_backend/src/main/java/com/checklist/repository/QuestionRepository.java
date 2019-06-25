package com.checklist.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.checklist.beans.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {

}
