package com.checklist.beans;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@SuppressWarnings("serial")
@Entity
@Table(name = "Question")
public class Question implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name = "Question")
	private String question;

	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn
	private Quiz quiz;

	@OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
	private List<Options> options;

	public Question() {

	}

	public Question(long id, String question, Quiz quiz, List<Options> options) {

		this.id = id;
		this.question = question;
		this.quiz = quiz;
		this.options = options;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public Quiz getQuiz() {
		return quiz;
	}

	// @JsonIgnore is added to prevent Json recursion
	@JsonIgnore
	public void setQuiz(Quiz quiz) {
		this.quiz = quiz;
	}

	public List<Options> getOptions() {
		return options;
	}

	public void setOptions(List<Options> options) {
		this.options = options;
	}

}
