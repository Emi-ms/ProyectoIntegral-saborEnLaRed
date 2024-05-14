package org.iesbelen.saborenlared.controller.advices;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.iesbelen.saborenlared.domain.Comment;
import org.iesbelen.saborenlared.domain.Rate;
import org.iesbelen.saborenlared.service.RateService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "${cors.origin}")
@RequestMapping("/rates")
@RequiredArgsConstructor
public class RateController {

    @Value("${cors.origin}")
    private String corsOrigin;

    private final RateService rateService;


    @GetMapping({"","/"})
    public List<Rate> all() {
        log.info("Accediendo a todas las puntuaciones");
        return this.rateService.all();
    }
    @PostMapping({"","/"})
    public Rate newRate(@RequestBody Rate rate) {
        return this.rateService.save(rate);
    }

    @GetMapping("/{id}")
    public Rate one(@PathVariable("id") Long id) {
        return this.rateService.one(id);
    }

    @PutMapping("/{id}")
    public Rate replaceRate(@PathVariable("id") Long id, @RequestBody Rate rate) {
        System.out.println(id + " en el controlador "+ rate.toString());

        return this.rateService.replace(id, rate);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteRate(@PathVariable("id") Long id) {
        this.rateService.delete(id);
    }
}
