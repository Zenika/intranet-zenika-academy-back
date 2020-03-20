const express = require('express');

const router = express.Router();
const PromotionsController = require('../controllers/promotions/PromotionsController');
const validator = require('../middlewares/joi/joiValidator');

/* GET promotion. */
router.get('/', PromotionsController.getAllPromotion);

router.post('/', PromotionsController.promotionCreate);

router.get(
  '/:promotion_id',
  validator.joiIdValidator('promotion_id'),
  PromotionsController.getPromotionById,
);

router.get(
  '/details/:promotion_id',
  validator.joiIdValidator('promotion_id'),
  PromotionsController.getPromotionDetailsById,
);

router.put(
  '/:promotion_id/update',
  validator.joiIdValidator('promotion_id'),
  PromotionsController.promotionUpdate,
);

router.delete(
  '/:promotion_id',
  validator.joiIdValidator('promotion_id'),
  PromotionsController.promotionDelete,
);

module.exports = router;
