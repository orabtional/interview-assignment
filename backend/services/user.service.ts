import { UserRepository } from '../repositories/user.repository';

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    createUser(username: string, password: string, email: string, firstName: string, lastName: string) {
        return this.userRepository.createUser(username, password, email, firstName, lastName);
    }

    login(username: string, password: string) {
        return this.userRepository.login(username, password);
    }

    getAllUsers() {
        return this.userRepository.getAllUsers();
    }

    getUserById(id: string) {
        return this.userRepository.getUserById(id);
    }

    updateUser(id: string, username: string, password: string, email: string, firstName: string, lastName: string) {
        return this.userRepository.updateUser(id, username, password, email, firstName, lastName);
    }

    deleteUser(id: string) {
        return this.userRepository.deleteUser(id);
    }
}

export const userService = new UserService();
