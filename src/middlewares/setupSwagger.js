import fs from 'node:fs';
import path from 'node:path';
import swaggerUi from 'swagger-ui-express';

const pathToSwagger = path.join(process.cwd(), 'docs', 'swagger.json');

export const setupSwagger = () => {
  try {
    const fileContent = fs.readFileSync(pathToSwagger);
    const swaggerDoc = JSON.parse(fileContent.toString());
    return [...swaggerUi.serve, swaggerUi.setup(swaggerDoc)];
  } catch {
    return (req, res) =>
      res.status(500).json({
        status: 500,
        message: 'Internal Sever Error',
        errors: 'Failed to load swagger specs',
      });
  }
};
