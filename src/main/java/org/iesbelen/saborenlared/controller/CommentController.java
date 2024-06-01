package org.iesbelen.saborenlared.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.iesbelen.saborenlared.domain.Comment;
import org.iesbelen.saborenlared.dto.CommentDTO;
import org.iesbelen.saborenlared.service.CommentService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "${cors.origin}")
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {

    @Value("${cors.origin}")
    private String corsOrigin;

    private final CommentService commentService;

    @GetMapping({"", "/"})
    public List<Comment> all() {
        log.info("Accediendo a todas los comentarios");
        return this.commentService.all();
    }

    @GetMapping({"/comments-actives"})
    public ResponseEntity<?> allActive() {
        log.info("Accediendo a todas los comentarios activos");
        return new ResponseEntity<>(commentService.AllActiveComment(), HttpStatus.OK);
    }

    @PostMapping({"", "/"})
    public ResponseEntity<Comment> newComment(@RequestBody Comment comment) {
        Comment savedComment = this.commentService.save(comment);
        return ResponseEntity.ok(savedComment);
    }

    @GetMapping("/{id}")
    public Comment one(@PathVariable("id") Long id) {
        return this.commentService.one(id);
    }

    @PutMapping("/{id}")
    public Comment replaceComment(@PathVariable("id") Long id, @RequestBody Comment comment) {
        return this.commentService.replace(id, comment);
    }

    @PutMapping("/logic-delete/{id}")
    public ResponseEntity<CommentDTO> deactivateComment(@PathVariable Long id) {
        Comment deactivatedComment = commentService.logicDelete(id);
        CommentDTO commentDTO = commentService.getCommentDTO(deactivatedComment.getIdComment());
        return ResponseEntity.ok(commentDTO);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable("id") Long id) {
        this.commentService.delete(id);
    }
}
