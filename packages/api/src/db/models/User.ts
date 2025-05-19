import { PrismaClient, User as DbUser } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
import { CreateUserDto, UpdateUserDto, UserDto } from '@social-platform/shared';

class UserModel {
  // Hash a password
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  // Verify a password
  async verifyPassword(username: string, password: string): Promise<boolean> {
    const dbUser = await prisma.user.findUnique({ where: { username } });
    if (dbUser == null){
      return false;
    }
    return bcrypt.compare(password, dbUser.password);
  }

  // Convert Prisma user to our User interface
  private toUser(user: DbUser): UserDto {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      gender: user.gender,
      genderOther: user.genderOther,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  // Find a user by ID
  async findById(id: string): Promise<UserDto | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user ? this.toUser(user) : null;
  }

  // Find a user by username
  async findByUsername(username: string): Promise<UserDto | null> {
    const user = await prisma.user.findUnique({ where: { username } });
    return user ? this.toUser(user) : null;
  }

  // Find a user by email
  async findByEmail(email: string): Promise<UserDto | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user ? this.toUser(user) : null;
  }

  // Create a new user
  async create(userData: CreateUserDto): Promise<UserDto> {
    const password = await this.hashPassword(userData.password);
    const user = await prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password,
        bio: userData.bio ?? null,
        gender: userData.gender,
        genderOther: userData.genderOther ?? null,
      },
    });
    return this.toUser(user);
  }

  // Update a user
  async update(id: string, userData: UpdateUserDto): Promise<UserDto | null> {
    const user = await prisma.user.update({
      where: { id },
      data: {
        bio: userData.bio,
        genderOther: userData.genderOther,
      },
    });
    return user ? this.toUser(user) : null;
  }



  // Search users by username
  async search(query: string, limit: number = 20): Promise<UserDto[]> {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: limit,
    });
    return users.map(this.toUser);
  }
}

export default new UserModel(); 