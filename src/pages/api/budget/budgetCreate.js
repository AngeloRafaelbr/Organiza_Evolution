import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    //para debug
    console.log("REQ.BODY:");
    console.log(req.body);

    const dadosBudget = req.body.dados;

    console.log(dadosBudget)

    // Validação simples
    if (!dadosBudget.category || !dadosBudget.plannedAmount) {
      return res.status(400).json({ error: 'Campos 22obrigatórios não preenchidos.' });
    }

    // Criação do orçamento no banco de dados SEM relacionamento com usuario
    const newBudget = await prisma.budget.create({
      data: {
        categoria: dadosBudget.category,
        valorPlanejado: parseFloat(dadosBudget.plannedAmount),
      },
    });

    return res.status(201).json({
      message: 'Orçamento registrado com sucesso.',
      budget: newBudget,
    });

  } catch (error) {
    console.error("Erro ao criar orçamento:", error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}
