import { PrismaClient, Profile } from '@prisma/client';
const prisma = new PrismaClient();
import { RegisterUserDto, UpdateProfileDto, ProfileDto, UserDto} from '@social-platform/shared';

class ProfileModel {

  private toProfile(profile: Profile): ProfileDto {
    return {
      id: profile.id,
      username: profile.username,
      bio: profile.bio,
      gender: profile.gender,
      genderOther: profile.genderOther,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    }
  }
  // Find a user by ID
  async findById(id: string): Promise<ProfileDto | null> {
    const profile = await prisma.profile.findUnique({ where: { id } });
    return profile ? this.toProfile(profile) : null;
  }

  // Find a user by username
  async findByUsername(username: string): Promise<ProfileDto | null> {
    const profile = await prisma.profile.findUnique({ where: { username } });
    return profile ? this.toProfile(profile) : null;
  }

  async findByUserId(userId: string): Promise<ProfileDto[] | null> {
    const profiles = await prisma.profile.findMany({ where: { userId } });
    return profiles.map(this.toProfile);
  }

  // Create a new user
  async create(profileData: RegisterUserDto, user: UserDto): Promise<ProfileDto> {
    const profile = await prisma.profile.create({
      data: {
        username: profileData.username,
        bio: profileData.bio ?? null,
        gender: profileData.gender,
        genderOther: profileData.genderOther ?? null,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return this.toProfile(profile);
  }

  // Update a user
  async update(id: string, profileData: UpdateProfileDto): Promise<ProfileDto | null> {
    const profile = await prisma.profile.update({
      where: { id },
      data: {
        bio: profileData.bio,
        genderOther: profileData.genderOther,
      },
    });
    return profile ? this.toProfile(profile) : null;
  }



  // Search users by username
  async search(query: string, limit: number = 20): Promise<ProfileDto[]> {
    const profiles = await prisma.profile.findMany({
      where: {
        OR: [
          { username: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: limit,
    });
    return profiles.map(this.toProfile);
  }
}

export default new ProfileModel(); 