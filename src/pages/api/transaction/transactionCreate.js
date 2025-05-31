// src/pages/api/transaction/transactionCreate.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    console.log("REQ.BODY");
    console.log(req.body);
    const dadosFin = req.body.dados;

    console.log(dadosFin);

    // Salvar transação sem relacionamento com usuário
    const newTransaction = await prisma.transaction.create({
      data: {
        data: new Date(dadosFin.dataIncome || dadosFin.dataSpent),
        tipo: dadosFin.tipo,
        categoria: dadosFin.categoriaSelecionadaIncome || dadosFin.categoriaSelecionadaSpent,
        descricao: dadosFin.descricaoIncome || dadosFin.descricaoSpent,
        valor: parseFloat(dadosFin.income || dadosFin.spent),
      },
    });

    return res.status(201).json({
      message: 'Transação registrada com sucesso.',
      transaction: newTransaction,
    });

  } catch (error) {
    console.error("Erro ao criar transação:", error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};
