package com.checklist.beans;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@SuppressWarnings("serial")
@Entity
@Table(name = "Options")
public class Options implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name = "Option_Input")
	private String optionInput;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn
	private Question question;

	public Options(long id, String optionInput, Question question) {

		this.id = id;
		this.optionInput = optionInput;
		this.question = question;
	}

	public Options() {

	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getOptionInput() {
		return optionInput;
	}


	public void setOptionInput(String optionInput) {
		this.optionInput = optionInput;
	}

	public Question getQuestion() {
		return question;
	}
	// @JsonIgnore is added to prevent Json recursion
		@JsonIgnore
	public void setQuestion(Question question) {
		this.question = question;
	}

}
