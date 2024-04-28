package org.iesbelen.saborenlared.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.EnableMBeanExport;

@Entity
@Table(name = "comment")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_comment")
    private Long idComment;
    private String commentText;
    private Boolean active;

    @ManyToOne()
    @JoinColumn(name = "id_user", nullable = false, foreignKey = @ForeignKey(name = "FK_COMMENT_USER"))
    private User user;

    @ManyToOne()
    @JoinColumn(name = "id_recipe", nullable = false, foreignKey = @ForeignKey(name = "FK_COMMENT_RECIPE"))
    private Recipe recipe;
}
