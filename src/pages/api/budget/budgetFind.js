// src/pages/api/budget/budgetFind.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const getBudgets = await prisma.budget.findMany(); // Busca todos os orçamentos
    
    //para debug
    /*console.log(getBudgets);*/

    return res.status(200).json({
      message: 'Orçamentos resgatados com sucesso.',
      budgets: getBudgets
    });

  } catch (error) {
    console.error("Erro ao resgatar orçamentos:", error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};
