import { PrismaClient, User as DbUser } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
import { RegisterUserDto, UserDto } from '@social-platform/shared';

class UserModel {
  // Hash a password
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  // Verify a password
  async verifyPassword(email: string, password: string): Promise<boolean> {
    const dbUser = await prisma.user.findUnique({ where: { email } });
    if (dbUser == null){
      return false;
    }
    return bcrypt.compare(password, dbUser.password);
  }

  // Convert Prisma user to our User interface
  private toUser(user: DbUser): UserDto {
    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  // Find a user by ID
  async findById(id: string): Promise<UserDto | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user ? this.toUser(user) : null;
  }

  // Find a user by email
  async findByEmail(email: string): Promise<UserDto | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user ? this.toUser(user) : null;
  }

  // Create a new user
  async create(userData: RegisterUserDto): Promise<UserDto> {
    const password = await this.hashPassword(userData.password);
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password,
      },
    });
    return this.toUser(user);
  }

  // Search users by username
  async search(query: string, limit: number = 20): Promise<UserDto[]> {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { email: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: limit,
    });
    return users.map(this.toUser);
  }
}

export default new UserModel(); 