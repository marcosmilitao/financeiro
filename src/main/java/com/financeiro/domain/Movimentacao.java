package com.financeiro.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import com.financeiro.domain.enumeration.TipoMovimento;
import com.financeiro.security.SecurityUtils;

/**
 * A Movimentacao.
 */
@Entity
@Table(name = "movimentacao")
public class Movimentacao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "valor", precision = 21, scale = 2, nullable = false)
    private BigDecimal valor;

    @Column(name = "data")
    private Instant data;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_movimento")
    private TipoMovimento tipoMovimento;

    @Column(name = "usuario")
    private String usuario;

    @Column(name = "descricao")
    private String descricao;

    @ManyToOne
    @JsonIgnoreProperties(value = "movimentacaos", allowSetters = true)
    private Saldo saldo;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    @PrePersist
    protected void prePersist() {

        Instant nowUtc = Instant.now();
        ZoneId brasilSaoPaulo = ZoneId.of("America/Sao_Paulo");
        ZonedDateTime nowBrasil = ZonedDateTime.ofInstant(nowUtc,brasilSaoPaulo);
        this.data = nowBrasil.toInstant();

        this.setUsuario(SecurityUtils.getCurrentUserLogin().get());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public Movimentacao valor(BigDecimal valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public Instant getData() {
        return data;
    }

    public Movimentacao data(Instant data) {
        this.data = data;
        return this;
    }

    public void setData(Instant data) {
        this.data = data;
    }

    public TipoMovimento getTipoMovimento() {
        return tipoMovimento;
    }

    public Movimentacao tipoMovimento(TipoMovimento tipoMovimento) {
        this.tipoMovimento = tipoMovimento;
        return this;
    }

    public void setTipoMovimento(TipoMovimento tipoMovimento) {
        this.tipoMovimento = tipoMovimento;
    }

    public String getUsuario() {
        return usuario;
    }

    public Movimentacao usuario(String usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getDescricao() {
        return descricao;
    }

    public Movimentacao descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Saldo getSaldo() {
        return saldo;
    }

    public Movimentacao saldo(Saldo saldo) {
        this.saldo = saldo;
        return this;
    }

    public void setSaldo(Saldo saldo) {
        this.saldo = saldo;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Movimentacao)) {
            return false;
        }
        return id != null && id.equals(((Movimentacao) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Movimentacao{" +
            "id=" + getId() +
            ", valor=" + getValor() +
            ", data='" + getData() + "'" +
            ", tipoMovimento='" + getTipoMovimento() + "'" +
            ", usuario='" + getUsuario() + "'" +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
