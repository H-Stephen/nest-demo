import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

enum UserRole {
  ROOT = 'root',
  ADMIN = 'admin',
  GUEST = 'guest',
}

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string; // ID
  
  @Column({ length: 500, unique: true })
  username: string; // 用户名
  
  @Column({ length: 500 })
  password: string; // 用户密码

  @Column({ length: 500 })
  email: string; // 用户邮箱

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GUEST,
  })
  role: UserRole; // 用户权限
}