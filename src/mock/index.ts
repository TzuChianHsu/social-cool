import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import postModule from './posts'

export function setupProdMockServer() {
    createProdMockServer([...postModule])
}

