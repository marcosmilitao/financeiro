package com.financeiro.service;

import com.financeiro.domain.Movimentacao;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Movimentacao}.
 */
public interface MovimentacaoService {

    /**
     * Save a movimentacao.
     *
     * @param movimentacao the entity to save.
     * @return the persisted entity.
     */
    Movimentacao save(Movimentacao movimentacao);

    /**
     * Get all the movimentacaos.
     *
     * @return the list of entities.
     */
    List<Movimentacao> findAll();


    /**
     * Get the "id" movimentacao.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Movimentacao> findOne(Long id);

    /**
     * Delete the "id" movimentacao.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Get all the movimentacaos por id.
     *
     * @return the list of entities.
     */
    List<Movimentacao> findAllbySaldoId(Long id);

}
