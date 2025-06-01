import { useState, useEffect } from 'react';

export default function useBudgets() {
    const [budgets, setBudgets] = useState([]);
    const [category, setCategory] = useState('');
    const [plannedAmount, setPlannedAmount] = useState('');


     useEffect(() => {
    async function fetchBudgets() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/budget/budgetFind`, {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            }
        });

        const data = await response.json();

        if (!response.ok) {
          console.error('Erro na resposta:', data);
          return;
        }

        setBudgets(data.budgets);

        //para debug (console navegador)
        console.log(data)
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    }

    fetchBudgets();
    
  }, []);

    async function handleSaveBudget(event) {
        event.preventDefault();
        if (!category || !plannedAmount) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const dadosBudget = {
            plannedAmount,
            category
        };

    try {
        const response = await fetch("/api/budget/budgetCreate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                dados: {...dadosBudget}
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            console.error("Erro no response:", result);
            alert(result.error || "Erro apresentado na resposta da requisição");
            return;
        }

        alert("Orçamento salvo com sucesso!");

       

        // Atualizar a lista se necessário
        // await fetchBudgets();

    } catch (error) {
        console.error("Erro ao salvar orçamento:", error);
        alert("Erro ao salvar orçamento. Verifique o console para mais detalhes.");
    }

     // Limpar os campos após salvar
        setCategory('');
        setPlannedAmount('');
};


    const handleDeleteBudget = async (budgetId) => {
  try {
    const response = await fetch('/api/budget/budgetDelete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: budgetId }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Erro ao deletar orçamento:', result);
      alert(result.error || 'Erro ao deletar orçamento.');
      return;
    }

    alert('Orçamento deletado com sucesso!');

    // Atualiza o estado local, se necessário
    setBudgets((prev) => prev.filter((budget) => budget.id !== budgetId));

  } catch (error) {
    console.error('Erro ao deletar orçamento:', error);
    alert('Erro interno ao tentar deletar o orçamento.');
  }
};


    return {
        budgets,
        category,
        plannedAmount,
        setCategory,
        setPlannedAmount,
        handleSaveBudget,
        handleDeleteBudget,
    };
}
