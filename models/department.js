import { prisma } from '../prisma/prismaDb/prismaConnection.js'

async function create (Department) {
  const department = await prisma.departamento.upsert({
    where: Department,
    update: {},
    create: Department
  })
  return department
}
export default { create }
