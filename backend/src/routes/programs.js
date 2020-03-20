const express = require('express');

const router = express.Router();
const ProgramsController = require('../controllers/programs/ProgramsController');
const validator = require('../middlewares/joi/joiValidator');
const schemas = require('../service/joi/schemas/schemas');

/* GET program. */
router.get('/', ProgramsController.getAllPrograms);

router.post(
  '/',
  validator.joiObjectValidator(schemas.programSchemas.create, 'programs'),
  ProgramsController.programCreate,
);

router.delete(
  '/:program_id',
  validator.joiIdValidator('program_id'),
  ProgramsController.programDelete,
);

router.get(
  '/:program_id',
  validator.joiIdValidator('program_id'),
  ProgramsController.getProgramById,
);

router.get(
  '/:program_id/details',
  validator.joiIdValidator('program_id'),
  ProgramsController.getProgramContentById,
);

router.put(
  '/:program_id/update',
  validator.joiIdValidator('program_id'),
  validator.joiObjectValidator(schemas.programSchemas.update, 'programs'),
  ProgramsController.programUpdate,
);

module.exports = router;
