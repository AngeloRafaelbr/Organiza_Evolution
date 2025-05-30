// src/pages/api/transaction/transactionCreate.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    console.log("REQ.BODY")
    console.log(req.body)
    const dadosFin = req.body.dados;

    console.log(dadosFin)

    const existingUser = await prisma.user.findUnique({ where: { email: req.body.email } });

    if (!existingUser) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Salvar todas as transações recebidas
    const createdTransactions = [];

    
      const newTransaction = await prisma.transaction.create({
      data: {
        data: new Date(dadosFin.dataIncome || dadosFin.dataSpent),
        tipo: dadosFin.tipo,
        categoria: dadosFin.categoriaSelecionadaIncome || dadosFin.categoriaSelecionadaSpent,
        descricao: dadosFin.descricaoIncome || dadosFin.descricaoSpent,
        valor: parseFloat(dadosFin.income || dadosFin.spent),
        user: {
          connect: {
            id: existingUser.id,
          },
        },
      },
    });

      createdTransactions.push(newTransaction);
    

    return res.status(201).json({
      message: 'Transações registradas com sucesso.',
      transactions: createdTransactions,
    });

  } catch (error) {
    console.error("Erro ao criar transações:", error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};
