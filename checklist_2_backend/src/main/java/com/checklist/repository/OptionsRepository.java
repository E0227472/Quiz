package com.checklist.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.checklist.beans.Options;

public interface OptionsRepository extends JpaRepository<Options, Long> {

}
