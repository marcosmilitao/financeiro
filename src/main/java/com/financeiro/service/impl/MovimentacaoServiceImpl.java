package com.financeiro.service.impl;

import com.financeiro.service.MovimentacaoService;
import com.financeiro.domain.Movimentacao;
import com.financeiro.repository.MovimentacaoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Movimentacao}.
 */
@Service
@Transactional
public class MovimentacaoServiceImpl implements MovimentacaoService {

    private final Logger log = LoggerFactory.getLogger(MovimentacaoServiceImpl.class);

    private final MovimentacaoRepository movimentacaoRepository;

    public MovimentacaoServiceImpl(MovimentacaoRepository movimentacaoRepository) {
        this.movimentacaoRepository = movimentacaoRepository;
    }

    @Override
    public Movimentacao save(Movimentacao movimentacao) {
        log.debug("Request to save Movimentacao : {}", movimentacao);
        return movimentacaoRepository.save(movimentacao);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Movimentacao> findAll(Pageable pageable) {
        log.debug("Request to get all Movimentacaos");
        return movimentacaoRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Movimentacao> findOne(Long id) {
        log.debug("Request to get Movimentacao : {}", id);
        return movimentacaoRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Movimentacao : {}", id);
        movimentacaoRepository.deleteById(id);
    }
}
