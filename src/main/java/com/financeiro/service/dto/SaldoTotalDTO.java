package com.financeiro.service.dto;

import java.math.BigDecimal;

public class SaldoTotalDTO {
    private int quantidadePositivo;
    private BigDecimal totalPositivo;
    private int quantidadeNegativo;
    private BigDecimal totalNegativo;
    private BigDecimal saldoTotal;


    public BigDecimal getSaldoTotal() {
        return saldoTotal;
    }

    public void setSaldoTotal(BigDecimal saldoTotal) {
        this.saldoTotal = saldoTotal;
    }

    public int getQuantidadePositivo() {
        return quantidadePositivo;
    }

    public void setQuantidadePositivo(int quantidadePositivo) {
        this.quantidadePositivo = quantidadePositivo;
    }

    public BigDecimal getTotalPositivo() {
        return totalPositivo;
    }

    public void setTotalPositivo(BigDecimal totalPositivo) {
        this.totalPositivo = totalPositivo;
    }

    public int getQuantidadeNegativo() {
        return quantidadeNegativo;
    }

    public void setQuantidadeNegativo(int quantidadeNegativo) {
        this.quantidadeNegativo = quantidadeNegativo;
    }

    public BigDecimal getTotalNegativo() {
        return totalNegativo;
    }

    public void setTotalNegativo(BigDecimal totalNegativo) {
        this.totalNegativo = totalNegativo;
    }


}
