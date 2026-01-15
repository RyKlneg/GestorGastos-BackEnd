import { DataSource } from 'typeorm';
import { Expense } from '../../expenses/entities/expense.entity';

export async function seedExpenses(dataSource: DataSource): Promise<void> {
  const expenseRepository = dataSource.getRepository(Expense);

  const expenses = [
    {
      description: 'Compra de alimentos en el supermercado',
      amount: 125.50,
      date: new Date('2024-01-15'),
      category: 'Alimentos',
    },
    {
      description: 'Pago de servicios de internet',
      amount: 45.00,
      date: new Date('2024-01-16'),
      category: 'Servicios',
    },
    {
      description: 'Gasolina para el automóvil',
      amount: 85.75,
      date: new Date('2024-01-17'),
      category: 'Transporte',
    },
    {
      description: 'Cena en restaurante',
      amount: 65.00,
      date: new Date('2024-01-18'),
      category: 'Alimentos',
    },
    {
      description: 'Factura de electricidad',
      amount: 120.30,
      date: new Date('2024-01-19'),
      category: 'Servicios',
    },
    {
      description: 'Compra de medicamentos',
      amount: 35.50,
      date: new Date('2024-01-20'),
      category: 'Salud',
    },
    {
      description: 'Boleto de autobús',
      amount: 2.50,
      date: new Date('2024-01-21'),
      category: 'Transporte',
    },
    {
      description: 'Gimnasio mensual',
      amount: 50.00,
      date: new Date('2024-01-22'),
      category: 'Salud',
    },
    {
      description: 'Libros para estudio',
      amount: 45.25,
      date: new Date('2024-01-23'),
      category: 'Educación',
    },
    {
      description: 'Netflix suscripción mensual',
      amount: 15.99,
      date: new Date('2024-01-24'),
      category: 'Entretenimiento',
    },
    {
      description: 'Reparación de laptop',
      amount: 180.00,
      date: new Date('2024-01-25'),
      category: 'Tecnología',
    },
    {
      description: 'Ropa y accesorios',
      amount: 95.00,
      date: new Date('2024-01-26'),
      category: 'Ropa',
    },
  ];

  for (const expenseData of expenses) {
    const expense = expenseRepository.create(expenseData);
    await expenseRepository.save(expense);
  }

  console.log(`Seeded ${expenses.length} expenses`);
}

