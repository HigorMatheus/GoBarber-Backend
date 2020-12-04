import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProvideresController from '../controllers/ProvidersController';
import ProviderDayAvaliabilityController from '../controllers/ProviderDayAvaliabilityController';
import ProviderMonthAvaliabilityController from '../controllers/ProviderMonthAvaliabilityController';

const providersRouter = Router();

const providersController = new ProvideresController();
const providerDayAvaliabilityController = new ProviderDayAvaliabilityController();
const providerMonthAvaliabilityController = new ProviderMonthAvaliabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-avaliability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvaliabilityController.index,
);
providersRouter.get(
  '/:provider_id/day-avaliability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerDayAvaliabilityController.index,
);

export default providersRouter;
