// src/pages/api/transaction/transactionFind.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const getTransaction = await prisma.transaction.findMany(); // Busca todas as transações
    console.log(getTransaction);

    return res.status(200).json({
      message: 'Transações resgatadas com sucesso.',
      transactions: getTransaction
    });

  } catch (error) {
    console.error("Erro ao resgatar transações:", error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};
