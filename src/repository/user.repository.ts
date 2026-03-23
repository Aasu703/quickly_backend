import User from "../model/user.model"
import { UserCreationAttributes } from "../model/user.model"

class UserRepository {
    async create(userData: UserCreationAttributes): Promise<User> {
        const user = await User.create(userData);
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await User.findOne({ where: { email } });
        return user;
    }

    async findById(id: number): Promise<User | null> {
        const user = await User.findByPk(id);
        return user;
    }
}

export const userRepository = new UserRepository();

export default userRepository;