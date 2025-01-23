const dotenv = require('dotenv');
const Joi = require('joi');
require('dotenv').config();

dotenv.config();

const envSchema = Joi.object({
  ETH_RPC_URL: Joi.string().uri().required(),
  ETH_PRIVATE_KEY: Joi.string().length(64).required(),

  SUI_RPC_URL: Joi.string().uri().required(),
  SUI_PRIVATE_KEY: Joi.string().required(),
  SUI_PACKAGE_ID: Joi.string().required(),


  NODE_ENV: Joi.string().valid('development', 'production').default('development'),
  PORT: Joi.number().default(3000),
}).unknown(true);

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  console.error(`Environment validation error: ${error.message}`);
  process.exit(1); 
}

module.exports = {
  ethereum: {
    rpcUrl: envVars.ETH_RPC_URL,
    privateKey: envVars.ETH_PRIVATE_KEY,
  },
  sui: {
    rpcUrl: envVars.SUI_RPC_URL,
    privateKey: envVars.SUI_PRIVATE_KEY,
    packageId: envVars.SUI_PACKAGE_ID,
  },
  general: {
    nodeEnv: envVars.NODE_ENV,
    port: envVars.PORT,
  },
};
