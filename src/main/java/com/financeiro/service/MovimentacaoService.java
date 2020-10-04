package com.financeiro.service;

import com.financeiro.domain.Movimentacao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Movimentacao> findAll(Pageable pageable);


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
}
