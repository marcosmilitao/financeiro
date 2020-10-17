package com.financeiro.service;

import com.financeiro.domain.Movimentacao;
import com.financeiro.domain.Saldo;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Saldo}.
 */
public interface SaldoService {

    /**
     * Save a saldo.
     *
     * @param saldo the entity to save.
     * @return the persisted entity.
     */
    Saldo save(Saldo saldo);

    /**
     * Get all the saldos.
     *
     * @return the list of entities.
     */
    List<Saldo> findAll();


    /**
     * Get the "id" saldo.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Saldo> findOne(Long id);

    /**
     * Delete the "id" saldo.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    Saldo atualizaSaldo(Movimentacao movimentacao);
}
