import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import style from "./BudgetChart.module.css";
import useIncomeHome from '@/hooks/useIncomeHome';

export default function BudgetChart() {
    const [budgets, setBudgets] = useState([]);
    const [widthWindow, setWidthWindow] = useState(0);
    const { dadosFin } = useIncomeHome();

    useEffect(() => {
        setWidthWindow(window.innerWidth);

        // Buscar orçamentos diretamente da API
        const fetchBudgets = async () => {
            try {
                const res = await fetch("/api/budget/budgetFind");
                const data = await res.json();
                setBudgets(data.budgets); // Ajuste aqui conforme estrutura de resposta
            } catch (error) {
                console.error("Erro ao buscar orçamentos:", error);
            }
        };

        fetchBudgets();
    }, []);

    const mergedData = budgets.map(budget => {
        const matchingItems = dadosFin.filter(
            item => item.tipo === 1 && item.categoria === budget.categoria
        );

        const totalSpentAmount = matchingItems.reduce((acc, item) => acc + Number(item.valor), 0);

        return {
            category: budget.categoria,
            plannedAmount: budget.valorPlanejado,
            spentAmount: totalSpentAmount,
        };
    });

    const widthGraph = (width) => (width <= 600 ? 250 : 500);

    return (
        <div>
            <BarChart width={widthGraph(widthWindow)} height={300} data={mergedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="plannedAmount" fill="#2196F3" name="Planejado" />
                <Bar dataKey="spentAmount" fill="#ef4444" name="Gastos" />
            </BarChart>
        </div>
    );
}
