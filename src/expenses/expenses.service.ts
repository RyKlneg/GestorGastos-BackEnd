import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { QueryExpenseDto } from './dto/query-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expensesRepository: Repository<Expense>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    try {
      const expense = this.expensesRepository.create(createExpenseDto);
      return await this.expensesRepository.save(expense);
    } catch (error) {
      throw new BadRequestException('Failed to create expense');
    }
  }

  async findAll(queryDto: QueryExpenseDto): Promise<{
    data: Expense[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10, query, category } = queryDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.expensesRepository.createQueryBuilder('expense');

    if (query) {
      queryBuilder.where('expense.description ILIKE :query', {
        query: `%${query}%`,
      });
    }

    if (category) {
      if (query) {
        queryBuilder.andWhere('expense.category = :category', { category });
      } else {
        queryBuilder.where('expense.category = :category', { category });
      }
    }

    const [data, total] = await queryBuilder
      .orderBy('expense.date', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Expense> {
    const expense = await this.expensesRepository.findOne({ where: { id } });
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    return expense;
  }

  async update(
    id: number,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    const expense = await this.findOne(id);
    Object.assign(expense, updateExpenseDto);
    try {
      return await this.expensesRepository.save(expense);
    } catch (error) {
      throw new BadRequestException('Failed to update expense');
    }
  }

  async remove(id: number): Promise<void> {
    const expense = await this.findOne(id);
    await this.expensesRepository.remove(expense);
  }

  async search(query: string): Promise<Expense[]> {
    if (!query || query.trim().length === 0) {
      return [];
    }
    return await this.expensesRepository.find({
      where: {
        description: ILike(`%${query}%`),
      },
      order: {
        date: 'DESC',
      },
      take: 50,
    });
  }
}

