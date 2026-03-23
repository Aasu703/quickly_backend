import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/sql";

// Attributes interface — shape of a full User row
export interface UserAttributes {
  id: number;
  email: string;
  password_hash: string;
  full_name: string;
  phone?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

// Optional on create — id, created_at, updated_at are auto-generated
export interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "created_at" | "updated_at"> {}

// The actual Model class
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public password_hash!: string;
  public full_name!: string;
  public phone?: string | null;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "users",   // maps to your exact table name in MySQL
    timestamps: true,     // auto-manages created_at & updated_at
    underscored: true,    // uses snake_case in DB columns
  }
);

export default User;