import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import postModule from './posts'

export const mockModules = [...postModule];
export function setupProdMockServer() {
    createProdMockServer(mockModules)
}

