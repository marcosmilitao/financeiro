package com.financeiro.service.impl;

import com.financeiro.domain.Saldo;
import com.financeiro.repository.SaldoRepository;
import com.financeiro.security.SecurityUtils;
import com.financeiro.service.ClienteService;
import com.financeiro.domain.Cliente;
import com.financeiro.repository.ClienteRepository;
import com.financeiro.service.dto.SaldoTotalDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.stream.Collectors;

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

        if(cliente.getLimite() == null){
            cliente.setLimite(BigDecimal.ZERO);
        }

        saldo.setValor(BigDecimal.ZERO);
        saldo.setUsuario(SecurityUtils.getCurrentUserLogin().get());
        novoSaldo = saldoRepository.save(saldo);

        cliente.setSaldo(novoSaldo);
        log.debug("Request to save Cliente : {}", cliente);
        return clienteRepository.save(cliente);
    }

    @Override
    public List<Cliente> findAllOrderByNome() {
        return clienteRepository.findAllOrderByNome();
    }

    @Override
    public List<Cliente> FindAllByFiltro(String filtro) {
        List<Cliente> result = new ArrayList<>();
        if (filtro != null){
            switch (filtro){
                case "nome":
                    result = clienteRepository.findAllOrderByNome();
                    break;
                case "telefone":
                    result = clienteRepository.findAllOrderByTelefone();
                    break;
                case "saldoMaior":
                    result = clienteRepository.findAllOrderByMaiorSaldo();
                    break;
                case "saldoMenor":
                    result = clienteRepository.findAllOrderByMenorSaldo();
                    break;
                default:
                    result = clienteRepository.findAllOrderByNome();
                    break;
            }
        }
        return result;
    }

    @Override
    public SaldoTotalDTO calculoSaldo() {

        List<Cliente> cliente = clienteRepository.findAllOrderByMaiorSaldo();
        List<Cliente> clientesNegativos;
        List<Cliente> clientesPositivos;
        SaldoTotalDTO saldoTotalDTO = new SaldoTotalDTO();

        BigDecimal totalPositivo;
        BigDecimal totalNegativo;
        BigDecimal saldoTotal;

        clientesNegativos = cliente.stream()
           .filter(c -> c.getSaldo().getValor().compareTo(BigDecimal.ZERO) < 0)
           .collect(Collectors.toList());

        clientesPositivos = cliente.stream()
            .filter(c -> c.getSaldo().getValor().compareTo(BigDecimal.ZERO) > 0)
            .collect(Collectors.toList());

        totalNegativo = clientesNegativos.stream()
            .map(x -> x.getSaldo().getValor())
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        totalPositivo= clientesPositivos.stream()
            .map(x -> x.getSaldo().getValor())
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        saldoTotal = totalNegativo.add(totalPositivo);

        saldoTotalDTO.setQuantidadeNegativo(clientesNegativos.size());
        saldoTotalDTO.setQuantidadePositivo(clientesPositivos.size());
        saldoTotalDTO.setTotalNegativo(totalNegativo);
        saldoTotalDTO.setTotalPositivo(totalPositivo);
        saldoTotalDTO.setSaldoTotal(saldoTotal);

        return saldoTotalDTO;
    }

}
