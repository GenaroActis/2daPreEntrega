import { Router } from "express";
import {
    getCartController,
    createCartController,
    addProductToCartController,
    deleteProductToCartController,
    updateQuantityOfProductController,
    deleteAllProductsToCartController
} from '../controllers/cartController.js';

const router = Router();

router.get('/:id', getCartController);
router.post('/', createCartController);
router.put('/:cartId/:prodId', addProductToCartController);
router.put('/:cartId/quantity/:prodId', updateQuantityOfProductController);
router.delete('/:cartId', deleteAllProductsToCartController);
router.delete('/:cartId/:prodId', deleteProductToCartController);

export default router