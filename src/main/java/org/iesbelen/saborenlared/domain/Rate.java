package org.iesbelen.saborenlared.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "rate")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Rate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rate")
    private Long idRate;
    private Double rateValue;

    @ManyToOne()
    @JoinColumn(name = "id_user", nullable = false, foreignKey = @ForeignKey(name = "FK_RATE_USER"))
    private User user;

    @ManyToOne()
    @JoinColumn(name = "id_recipe", nullable = false, foreignKey = @ForeignKey(name = "FK_RATE_RECIPE"))
    private Recipe recipe;
}
