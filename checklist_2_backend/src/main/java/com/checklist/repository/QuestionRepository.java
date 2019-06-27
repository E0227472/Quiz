package com.checklist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.checklist.beans.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {

	
}
