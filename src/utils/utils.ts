import mongoose from "mongoose";

export async function connectDB(connectionString: string): Promise<void> {
    await mongoose.connect(connectionString);
}

export function assertEnvironment(varName: string) {
    const envVarValue = process.env[varName];
    
    if (!envVarValue) {
      throw new Error(`Environment variable ${varName} is required`);
    }
    
    return envVarValue;
  };