package org.iesbelen.saborenlared.service;

import lombok.AllArgsConstructor;
import org.iesbelen.saborenlared.domain.Rate;
import org.iesbelen.saborenlared.exeption.RateNotFoundException;
import org.iesbelen.saborenlared.repository.RateRepository;

import org.iesbelen.saborenlared.repository.RecipeRepository;
import org.iesbelen.saborenlared.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class RateService {

    private final RateRepository rateRepository;
    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;

    public List<Rate> all() {
        return this.rateRepository.findAll();
    }

    public Rate save(Rate rate) {
        return this.rateRepository.save(rate);
    }

    public Rate one(Long id) {
        return this.rateRepository.findById(id)
                .orElseThrow(() -> new RateNotFoundException(id));
    }

    public Rate replace(Long id, Rate rate) {
        System.out.println(id +" en el servicio "+ rate.getIdRate());
        return this.rateRepository.findById(id).map(p -> (id.equals(rate.getIdRate()) ?
                        this.rateRepository.save(rate) : null))
                .orElseThrow(() -> new RateNotFoundException(id));
    }

    public void delete(Long id) {
        this.rateRepository.findById(id).map(rate -> {
                    this.rateRepository.delete(rate);
                    return rate;
                })
                .orElseThrow(() -> new RateNotFoundException(id));
    }
}
