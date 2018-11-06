package com.websystique.springmvc.service;

import com.websystique.springmvc.model.Computer;

import java.util.List;

public interface ItemService {

	List findItemsByCategory(String category);
	
	Object findItemById(long id, String category);
	
	List<String> populateAllCategories();

	List<Computer> findAllPCs();
}
