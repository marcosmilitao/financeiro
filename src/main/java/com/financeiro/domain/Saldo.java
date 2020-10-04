package com.financeiro.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A Saldo.
 */
@Entity
@Table(name = "saldo")
public class Saldo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "valor", precision = 21, scale = 2, nullable = false)
    private BigDecimal valor;

    @Column(name = "data_atualizacao")
    private Instant dataAtualizacao;

    @Column(name = "usuario")
    private String usuario;

    @OneToMany(mappedBy = "saldo")
    private Set<Movimentacao> movimentacaos = new HashSet<>();

    @PrePersist
    protected void prePersist() {
        Instant nowUtc = Instant.now();
        ZoneId brasilSaoPaulo = ZoneId.of("America/Sao_Paulo");
        ZonedDateTime nowBrasil = ZonedDateTime.ofInstant(nowUtc,brasilSaoPaulo);
        this.dataAtualizacao = nowBrasil.toInstant();
    }

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public Saldo valor(BigDecimal valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public Instant getDataAtualizacao() {
        return dataAtualizacao;
    }

    public Saldo dataAtualizacao(Instant dataAtualizacao) {
        this.dataAtualizacao = dataAtualizacao;
        return this;
    }

    public void setDataAtualizacao(Instant dataAtualizacao) {
        this.dataAtualizacao = dataAtualizacao;
    }

    public String getUsuario() {
        return usuario;
    }

    public Saldo usuario(String usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public Set<Movimentacao> getMovimentacaos() {
        return movimentacaos;
    }

    public Saldo movimentacaos(Set<Movimentacao> movimentacaos) {
        this.movimentacaos = movimentacaos;
        return this;
    }

    public Saldo addMovimentacao(Movimentacao movimentacao) {
        this.movimentacaos.add(movimentacao);
        movimentacao.setSaldo(this);
        return this;
    }

    public Saldo removeMovimentacao(Movimentacao movimentacao) {
        this.movimentacaos.remove(movimentacao);
        movimentacao.setSaldo(null);
        return this;
    }

    public void setMovimentacaos(Set<Movimentacao> movimentacaos) {
        this.movimentacaos = movimentacaos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Saldo)) {
            return false;
        }
        return id != null && id.equals(((Saldo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Saldo{" +
            "id=" + getId() +
            ", valor=" + getValor() +
            ", dataAtualizacao='" + getDataAtualizacao() + "'" +
            ", usuario='" + getUsuario() + "'" +
            "}";
    }
}
