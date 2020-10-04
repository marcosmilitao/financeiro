package com.financeiro.service.impl;

import com.financeiro.domain.Saldo;
import com.financeiro.repository.SaldoRepository;
import com.financeiro.security.SecurityUtils;
import com.financeiro.service.ClienteService;
import com.financeiro.domain.Cliente;
import com.financeiro.repository.ClienteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Cliente}.
 */
@Service
@Transactional
public class ClienteServiceImpl implements ClienteService {

    private final Logger log = LoggerFactory.getLogger(ClienteServiceImpl.class);

    private final ClienteRepository clienteRepository;
    private final SaldoRepository saldoRepository;

    public ClienteServiceImpl(ClienteRepository clienteRepository, SaldoRepository saldoRepository) {
        this.clienteRepository = clienteRepository;
        this.saldoRepository = saldoRepository;
    }

    @Override
    public Cliente save(Cliente cliente) {
        log.debug("Request to save Cliente : {}", cliente);
        return clienteRepository.save(cliente);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Cliente> findAll() {
        log.debug("Request to get all Clientes");
        return clienteRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Cliente> findOne(Long id) {
        log.debug("Request to get Cliente : {}", id);
        return clienteRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Cliente : {}", id);
        clienteRepository.deleteById(id);
    }

    @Override
    public Cliente add(Cliente cliente) {
        Saldo saldo = new Saldo();
        Saldo novoSaldo = new Saldo();

        saldo.setValor(BigDecimal.ZERO);
        saldo.setUsuario(SecurityUtils.getCurrentUserLogin().get());
        novoSaldo = saldoRepository.save(saldo);

        cliente.setSaldo(novoSaldo);
        log.debug("Request to save Cliente : {}", cliente);
        return clienteRepository.save(cliente);
    }
}
