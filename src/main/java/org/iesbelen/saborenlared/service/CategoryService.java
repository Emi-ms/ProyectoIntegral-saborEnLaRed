package org.iesbelen.saborenlared.service;

import org.iesbelen.saborenlared.domain.Category;
import org.iesbelen.saborenlared.exeption.CategoryNotFoundException;
import org.iesbelen.saborenlared.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> all() {
        return this.categoryRepository.findAll();
    }

    public Category save(Category category) {
        category.setActive(true);
        return this.categoryRepository.save(category);
    }

    public Category one(Long id) {
        return this.categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));
    }

    public Category replace(Long id, Category category) {
        return this.categoryRepository.findById(id).map(p -> (id.equals(category.getIdCategory()) ?
                        this.categoryRepository.save(category) : null))
                .orElseThrow(() -> new CategoryNotFoundException(id));
    }

    public void delete(Long id) {
        this.categoryRepository.findById(id).map(category -> {
                    this.categoryRepository.delete(category);
                    return category;
                })
                .orElseThrow(() -> new CategoryNotFoundException(id));
    }
}
